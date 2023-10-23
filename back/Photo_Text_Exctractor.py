import pytesseract
from PIL import Image
import json

# Path to your Tesseract executable (modify this to match your system)
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'


# Function to extract text from an image using Tesseract OCR
def extract_text_from_image(image_path):
    try:
        # Open the image using PIL (Python Imaging Library)
        with Image.open(image_path) as img:
            # Perform OCR on the image
            text = pytesseract.image_to_string(img)

            # Return the extracted text
            return text.strip()
    except Exception as e:
        return str(e)

# Path to the image containing the bill
image_path = '/home/cuzminsimion/Downloads/bill.jpg'

# Extract text from the image
extracted_text = extract_text_from_image(image_path)

# Create a JSON object to store the extracted text
result = {
    'text': extracted_text
}

# Save the JSON to a file
output_file = 'bill_text.json'
with open(output_file, 'w') as json_file:
    json.dump(result, json_file, indent=4)

print(f"Extracted text saved to {output_file}")
