from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import DirectoryLoader, TextLoader
from InstructorEmbedding import INSTRUCTOR
from langchain.embeddings import HuggingFaceInstructEmbeddings
from tqdm import tqdm
from langchain.vectorstores import FAISS

import time, os, pickle, faiss


root_dir = "../faiss/"



loader = DirectoryLoader("../text_test_1/", glob="./*.txt", show_progress=True, loader_cls=TextLoader)
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
                                               chunk_size=1500,
                                               chunk_overlap=300)

texts = text_splitter.split_documents(documents)

def store_embeddings(docs, embeddings, store_name, path):
    if not os.path.exists(path):
        os.makedirs(path)
    start_time = time.time()

    vectorStore = FAISS.from_documents(docs, embeddings)

    with open(f"{path}/faiss_{store_name}.pkl", "wb") as f:
        pickle.dump(vectorStore, f)

    elapsed_time = time.time() - start_time
    print(f"Elapsed time: {elapsed_time} seconds")

instructor_embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-large", model_kwargs={"device": "cpu"})

Embedding_store_path = f"{root_dir}/Embedding_store"

print(len(texts))
store_embeddings(texts,
                 embeddings=instructor_embeddings,
                 store_name='instructEmbeddings_cpu_all_10',
                 path=Embedding_store_path)