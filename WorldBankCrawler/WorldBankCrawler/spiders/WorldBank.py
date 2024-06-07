from bs4 import BeautifulSoup
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from WorldBankCrawler.items import WorldbankcrawlerItem
import nltk
from nltk.corpus import words, stopwords
from nltk.stem import PorterStemmer

nltk.download('words')
nltk.download('stopwords')
nltk.download('punkt')
english_words = set(words.words())
stop_words = set(stopwords.words('english'))
stemmer = PorterStemmer()

class WorldbankSpider(CrawlSpider):
    name = "WorldBank"
    allowed_domains = ["data.worldbank.org"]
    start_urls = ["https://data.worldbank.org"]

    rules = (
        Rule(LinkExtractor(allow=()), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        item = WorldbankcrawlerItem()
        item['title'] = response.css('title::text').extract_first()
        item['description'] = response.xpath("/html/head/meta[@name='description']/@content").extract_first()
        item['destination_url'] = response.url
        item['source_url'] = response.meta.get('source_url', 'N/A')
        
        # Extract the entire body content of the page
        html_content = response.css('body').extract_first()  # or response.xpath('//body').extract_first()
        plain_text = self.convert_html_to_text(html_content)
        filtered_text = self.filter_non_english_and_stop_words(plain_text)
        stemmed_text = self.stem_words(filtered_text)
        transformed_text = self.apply_transformation_rules(stemmed_text)
        item['content'] = transformed_text

        yield item

        # Follow links and store the current URL as the source URL
        links = LinkExtractor(allow=()).extract_links(response)
        for link in links:
            yield scrapy.Request(
                url=link.url,
                callback=self.parse_item,
                meta={'source_url': response.url}  # Store the current URL in meta attribute
            )
    
    def convert_html_to_text(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text(separator=' ', strip=True)
        return text

    def filter_non_english_and_stop_words(self, text):
        words = text.split()
        filtered_words = [word for word in words if word.lower() in english_words and word.lower() not in stop_words]
        return ' '.join(filtered_words)

    def stem_words(self, text):
        tokens = nltk.word_tokenize(text)
        stemmed_words = [stemmer.stem(token) for token in tokens]
        return ' '.join(stemmed_words)

    def apply_transformation_rules(self, text):
        tokens = text.split()
        transformed_tokens = []
        for token in tokens:
            if token.endswith('sses'):
                token = token[:-4] + 'ss' # Apply Rule 2.1
            elif token.endswith('ed') and any(vowel in token[:-2] for vowel in 'aeiou'):
                token = token[:-2]  # Apply Rule 2.2
            elif token.endswith('y') and any(vowel in token[:-1] for vowel in 'aeiou'):
                token = token[:-1] + 'I'  # Apply Rule 2.3
            transformed_tokens.append(token)
        return ' '.join(transformed_tokens)

