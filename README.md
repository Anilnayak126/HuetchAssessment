# HuTech E-Commerce Platform(Assessment)

## Project Overview
Full-stack e-commerce web application built with Django REST Framework (backend) and React.js (frontend), database SQLlite3.

## Prerequisites
- Python 3.9+
- Node.js 14+
- pip
- npm/yarn

## Repository Cloning
```bash
git clone https://github.com/Anilnayak126/HuetchAssessment.git
cd HuetchAssessment
```

## Backend Setup (Django)
1. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

2. Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

3. Database Migrations
```bash
cd core
python manage.py makemigrations
python manage.py migrate
```

4. Create Superuser
```bash
python manage.py createsuperuser
```

5. Run Backend Server
```bash
python manage.py runserver
```

## Frontend Setup (React)
1. Install dependencies
```bash
cd frontend
cd hutechEcom
npm install
```

2. Run Development Server
```bash
npm start
```

## Environment Configuration
- Create `.env` files in both backend and frontend
- Add necessary environment variables

## Features
- User Authentication
- Product Browsing
- Cart Management
- Product Add/Remove
- User Registration/Login

## Technologies Used
- Backend: Django, Django REST Framework
- Frontend: React.js
- Database: SQLite3
- State Management: React Hooks
- Routing: React Router

## Deployment Notes
- Configure CORS settings
- Set DEBUG to False in production
- Use production-grade database

## Contributing
1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push to Branch
5. Create Pull Request
