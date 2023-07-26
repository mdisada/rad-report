import openai, config
from pdfquery import PDFQuery



pdf = PDFQuery('')
pdf.load()
text_elements = pdf.pq('LTTextLineHorizontal')
text_list = [t.text for t in text_elements]


openai.api_key = config.OPEN_API_KEY

text = ""

for line in text_list:
    if line == '':
        pass
    else:
        text = text + line + '\n'
print(text)


messages = []
system_msg = input("What type of chatbot would you like to create?\n")
messages.append({"role": "user", "content": system_msg})

print("Your new assistant is ready!")

while input != "quit()":
    message = "Create an abstract for a Radiology journal using the following research paper: " + text
    messages.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    reply = response["choices"][0]["messages"]["content"]
    messages.append({"role":"assistant","content": reply})
    print("\n" + reply + "\n")

def process_message(input_message):
    
    output_message = ""
    
    return output_message