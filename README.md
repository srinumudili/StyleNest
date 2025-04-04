StyleNest - E-commerce Platform 🛍️ 

Live Demo: [StyleNest on Vercel](https://style-nest-ey8w.vercel.app/)

📌 Overview

StyleNest is a modern MERN stack e-commerce platform offering a seamless shopping experience with product listings, cart management, user authentication, admin management, and secure payment integration.

## 🚀 Tech Stack  
- **Frontend:** React.js, Redux Toolkit, Tailwind CSS, React Router  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT (JSON Web Token)  
- **Payments:** PayPal API  
- **Deployment:** Vercel (Frontend & Backend)  


## 🔥 Features  
- ✅ User authentication (JWT)  
- ✅ Product catalog with filtering  
- ✅ Shopping cart & checkout flow  
- ✅ Order management  
- ✅ PayPal payment integration  
- ✅ Admin dashboard for order & product management  
- ✅ Responsive UI with Tailwind CSS  
- ⏳ Wishlist & reviews (Upcoming)  


## 🌍 Live Deployment  
- **Frontend:** Hosted on **Vercel** → [StyleNest](https://style-nest-ey8w.vercel.app/)  
- **Backend:** Hosted on **Vercel Serverless Functions** → [API Server](https://style-nest-two.vercel.app/)  


## 📦 Installation (Local Development)  
### 1️⃣ Clone the repository:  
```sh
$ git clone https://github.com/srinumudili/StyleNest.git
$ cd stylenest
```
### 2️⃣ Install dependencies:
🔹 Install frontend dependencies
```sh
cd frontend
npm install
```
🔹 Install backend dependencies
```sh
cd backend
npm install
```
3️⃣ Set up environment variables:
Create a .env file inside the backend folder and add the following:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```
🚨 Important: Never share your .env file or commit it to GitHub.

4️⃣ Run the app locally:
🔹 Start frontend
```sh
cd frontend
npm run dev
```
🔹 Start backend
```sh
cd backend
npm run server
```
5️⃣ Access the app:

Open http://localhost:5173 in your browser.

---


## 🚀 Deployment to Vercel  

### **1. Deploy Frontend**  
1. Push your frontend code to GitHub  
2. Go to [Vercel Dashboard](https://vercel.com/) and import the repository  
3. Configure environment variables in Vercel settings  
4. Click **Deploy**  

### **2. Deploy Backend**  
1. Push your backend code to GitHub  
2. Go to Vercel and create a new project for the backend  
3. Set environment variables:  
   - `MONGO_URI`  
   - `JWT_SECRET`  
   - `PAYPAL_CLIENT_ID`  
   - `CLOUDINARY_CLOUD_NAME`  
   - `CLOUDINARY_API_KEY`  
   - `CLOUDINARY_API_SECRET`  
4. Click **Deploy**  

---

## 🛤️ Roadmap  

- ✅ Product listing & cart system  
- ✅ User authentication & order management  
- ✅ PayPal payment integration  
- ✅ **Admin dashboard for managing orders & products**  
- ⏳ Wishlist & reviews (Upcoming)  

---

## 💡 Contributing  

1. **Fork** the repo  
2. **Create a new branch** (`feature-xyz`)  
3. **Commit changes & push**  
4. **Open a Pull Request (PR)**  

---

