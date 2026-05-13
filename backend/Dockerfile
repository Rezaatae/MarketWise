FROM python:3.12-slim

WORKDIR /app

# Install system deps
RUN pip install poetry

# Copy dependency files first (for caching)
COPY pyproject.toml poetry.lock* ./

# Disable virtualenv inside container
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

# Copy app
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]