import os
import shutil
import json

# Function to check if 'status': 503 is in the meta file
def has_status_503(meta_file_path):
    try:
        with open(meta_file_path, 'r') as file:
            content = file.read()
            # Replace single quotes with double quotes for valid JSON
            content = content.replace("'", '"')
            data = json.loads(content)
            if 'status' in data and data['status'] == 503:
                return True
            if 'status' in data and data['status'] == 504:
                return True
            if 'status' in data and data['status'] == 502:
                return True
    except json.JSONDecodeError:
        pass
    return False

# Function to find and delete directories with meta files containing 'status': 503
def find_and_delete_directories_with_status_503(base_path):
    count = 0
    for root, dirs, files in os.walk(base_path):
        if 'meta' in files:
            meta_file_path = os.path.join(root, 'meta')
            if has_status_503(meta_file_path):
               #shutil.rmtree(root) 
               pass
# Specify the base directory
base_directory = r'C:\Users\TanYi\OneDrive - Singapore Institute Of Technology\Uni Stuff\Tri 3.3\Peter Mod\Group-Assignment-IR\WorldBankCrawler\.scrapy\httpcache\WorldBank'

# Run the function
find_and_delete_directories_with_status_503(base_directory)
