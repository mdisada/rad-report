import openai, config

from forex_python.converter import CurrencyRates



openai.api_key = config.OPEN_API_KEY

model = 'gpt-3.5-turbo'


def process_message(input_data):
    system_message = """
    
    You are an AI Radiology assistant tasked to help in creating reports. 
    Given the following findings in a radiology report, give your primary diagnosis, other differential diagnosis, and recommendations.
    Make it brief

    """

    
    messages = [{"role": "user", "content": system_message + input_data },
                {"role": "user", "content": input_data },
                ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.2,
        max_tokens=1000,
        frequency_penalty = 0.0
    )
    
    output_message = response["choices"][0]["message"]["content"]
    input_tokens = response["usage"]["prompt_tokens"]
    output_tokens = response["usage"]["completion_tokens"]
    total_tokens = response["usage"]["total_tokens"]

    cost = tokens_to_php(input_tokens, output_tokens, model)

    print("input_data: ", input_data)


    print(output_message)
    
    
    print(f"""
          Input tokens: {input_tokens}
          Output tokens: {output_tokens}
          Total tokens: {total_tokens}
          Cost: {cost}
          """)
    
    return output_message

def tokens_to_php(input_tokens, output_tokens, model):
    
    if model == "gpt-3.5-turbo":
        in_price = 0.00015
        out_price = 0.002
    
    input_usd = in_price * input_tokens/1000
    output_usd = out_price * output_tokens/1000
    total_usd = input_usd + output_usd 
    
    exchange_rate = 54.56
    
    total_php = total_usd * exchange_rate
    
    return "Total cost: ₱" + str(total_php)

    