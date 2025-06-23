# Backend Service

## Local Dev

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. `npm run start`

## Docker

docker build -t todo-backend .
docker run -e NODE_ENV=development -e MONGO_URI="mongodb://localhost:27017/todos-dev" -p 8000:8000 todo-backend

## Kubernetes Deployment

- Build and push image to ACR
- `kubectl apply -f k8s/`
