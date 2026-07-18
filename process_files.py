import re

def extract_and_replace():
    with open('/home/ubuntu/upload/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract CSS
    css_blocks = re.findall(r'<style>(.*?)</style>', content, re.DOTALL)
    all_css = "\n".join(css_blocks)
    
    with open('/home/ubuntu/upload/style.css', 'w', encoding='utf-8') as f:
        f.write(all_css.strip())

    # Extract JS
    # We need to be careful with <script src="..."> tags, we only want internal scripts
    js_blocks = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
    all_js = "\n".join(js_blocks)
    
    with open('/home/ubuntu/upload/script.js', 'w', encoding='utf-8') as f:
        f.write(all_js.strip())

    # Replace CSS blocks with a single link tag in <head>
    # First, remove all <style> blocks
    new_content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
    
    # Insert link tag before </head>
    new_content = new_content.replace('</head>', '    <link rel="stylesheet" href="style.css">\n</head>')

    # Replace JS blocks
    # Remove all internal <script> blocks
    new_content = re.sub(r'<script>.*?</script>', '', new_content, flags=re.DOTALL)
    
    # Insert script tag before </body>
    new_content = new_content.replace('</body>', '    <script src="script.js" defer></script>\n</body>')

    with open('/home/ubuntu/upload/index_new.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == "__main__":
    extract_and_replace()
