# MarketWise
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?logo=docker)
![Pytest](https://img.shields.io/badge/Tests-Pytest-0A9EDC?logo=pytest)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)

A full-stack fintech analytics platform that ingests historical price data via CSV and public market data, calculates financial metrics through a Python data pipeline, and consolidates insights through interactive dashboards.

## Live Demo
Frontend: https://market-wise-pi.vercel.app/  
Backend API: https://marketwise-09gu.onrender.com/docs

## Demo Notes

The live market data integration uses the free tier of the Alpha Vantage API, which is subject to request rate limits.

If live market data is temporarily unavailable, sample CSV datasets are provided in the repository (in the sample-data folder) and can be uploaded through the CSV ingestion workflow to explore the analytics pipeline and dashboard functionality.

## Preview
[YouTube video link goes here]

## Features
- CSV file data ingestion.
- Public Market data API integration.
- Interactive price chart grid displaying Stock closing prices, Moving Averages and Buy/Sell signals calculated based on user inputs.
- Market performance metrics (i.e. Returns, Volatility, Sharpe Ratio, Drawdown) calculated based on user inputs.

## Architecture
MarketWise uses a decoupled frontend/backend architecture:

- React + Vite frontend hosted on Vercel
- FastAPI backend hosted on Render
- Python analytics pipeline for financial metrics
- Adapter pattern for standardising CSV and API data sources
- Dockerised backend with GitHub Actions CI/CD

## Tech Stack
### Frontend
- React
- Vite
- TypeScript
- Chart.js / Recharts

### Backend
- Python
- FastAPI
- Pandas
- NumPy
- Pytest
- Ruff

### DevOps
- Docker
- GitHub Actions
- Vercel
- Render

## Data Pipeline

MarketWise supports two ingestion paths:

### CSV Upload
User-provided OHLCV datasets are uploaded through the frontend and processed through the analytics pipeline.

### Alpha Vantage Integration
Live market data is fetched through the Alpha Vantage API and normalised through a shared adapter layer.

Both ingestion paths feed into a unified analytics service that computes:
- Returns
- Volatility
- Sharpe Ratio
- Drawdown
- Moving averages
- Buy/sell signals

## CI/CD
GitHub Actions automatically runs:

- Python linting with Ruff
- Backend tests with Pytest
- Building Frontend React App
- Building Docker image

Deployments are handled through:
- Vercel (frontend)
- Render (backend)

## Engineering Challenges
- Normalising raw incoming data from difference sources into a unified internal schema.
- Structuring response data in a scaleable way in the frontend for each use case and component.
- Implementing multipart/form-data CSV ingestion with typed validation.

## Future Improvements
- Import data in real time.
- Implement Redis caching for API responses
- Add portfolio backtesting functionality