# FastAPI cource practice app "Photo Album"

## Backend: FastAPI

### Create virtual environment

python -m venv myvenv

### Activate virtual environment

- Windows: myvenv\Scripts\activate
- Linux: source myvenv/bin/activate

### Install libs & packeges

- python -m pip install --upgrade pip
- pip install -r requirements.txt

### Start app

- cd ./backend/
- activate venv
- uvicorn main:app --reload

### Docs are on the link

- http://localhost:8000/docs
- http://localhost:8000/redoc

### Put in JWT secret in .env

JWT_SECRET=your-secret

---

## Frontend: React

### Install libs & packeges

- npm create vite@latest
  then
- choose `frontend` folder
- choose React
- choose TypeScript
- npm install

### Start web client

- npm run dev

### Build web client

- npm run build

### The Web client is located at:

- http://localhost:5173/
