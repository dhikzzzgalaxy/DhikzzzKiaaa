import re

with open('/home/ubuntu/upload/index.html', 'r') as f:
    content = f.read()

# Extract MOCK_APPS
mock_apps_match = re.search(r'const MOCK_APPS = \[(.*?)\];', content, re.DOTALL)
if mock_apps_match:
    mock_apps = mock_apps_match.group(0)
    with open('/home/ubuntu/project/js/data.js', 'w') as f:
        f.write('// Data Apps\n' + mock_apps + '\n\n')

# Extract MATERIAL_CATEGORIES
categories_match = re.search(r'const MATERIAL_CATEGORIES = \[(.*?)\];', content, re.DOTALL)
if categories_match:
    categories = categories_match.group(0)
    with open('/home/ubuntu/project/js/data.js', 'a') as f:
        f.write('// Data Categories\n' + categories + '\n')

# Extract CSS
css_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if css_match:
    css = css_match.group(1)
    with open('/home/ubuntu/project/css/style.css', 'w') as f:
        f.write(css.strip())

# Extract React Script
script_match = re.search(r'<script type="text/babel">(.*?)</script>', content, re.DOTALL)
if script_match:
    script = script_match.group(1)
    # Remove the data parts from script
    script = re.sub(r'const MOCK_APPS = \[.*?\];', '', script, flags=re.DOTALL)
    script = re.sub(r'const MATERIAL_CATEGORIES = \[.*?\];', '', script, flags=re.DOTALL)
    script = re.sub(r'const CATEGORIES = \[.*?\];', '', script, flags=re.DOTALL)
    
    with open('/home/ubuntu/project/js/app.js', 'w') as f:
        f.write(script.strip())
