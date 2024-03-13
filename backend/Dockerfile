FROM python:3.12-alpine

WORKDIR /app

EXPOSE 5050

COPY requirements.txt ./requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY main.py .env.local ./

CMD ["python", "main.py"]