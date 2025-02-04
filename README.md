# **Mammothzy: Next.js Form-Based Application**

This project is a submission for the ReactJS Intern assignment at **The Internet Folks (TIF)**. It is a multi-page form-based application built using **Next.js** and **TypeScript**, designed to simulate the creation of a new "Activity" entry for Mammothzy, a SaaS platform for team bonding activities.



## **🚀 Live Demo**  
[View the Application Here](https://mammothzy-htomar6397s-projects.vercel.app/)  



## **📋 Features**
- **Multi-Page Form with Tabs:**  
  Users can navigate between "Activity Details" and "Location Details" tabs.
- **Form State Persistence:**  
  Form data is retained when switching between tabs.
- **Form Validation:**  
  Users must complete all required fields with error messages displayed for invalid entries.
- **Pixel-Perfect Design:**  
  UI design closely matches the provided Figma reference.
- **Submission and Reset:**  
  Successful submission logs form data, displays a success modal, and resets the form.



## **🛠️ Tech Stack**
- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form
- **Deployment:** Vercel



## **📁 Project Structure**
```plaintext
mammothzy/
├── src/
│   ├── app/             # Next.js app directory
│   │   └── page.tsx     # Entry point for the application
│   ├── components/      # Reusable UI components
│   │   ├── Tabs.tsx     # Tab navigation component
│   │   ├── ActivityForm.tsx # Activity Details form
│   │   └── LocationForm.tsx # Location Details form
│   ├── styles/          # Global styles
│   │   └── globals.css  # Global CSS styles
│   └── utils/           # Utility functions
│       └── validation.ts # Form validation logic
...
```



## **📦 Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mammothzy.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mammothzy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


## **🚀 Deployment**
The project is deployed on **Vercel** for public access.

### **Steps to Deploy:**
1. Connect the GitHub repository to Vercel.
2. Configure the project settings.
3. Deploy the application with:
   ```bash
   vercel deploy
   ```



## **📝 Usage Instructions**
1. Navigate between form tabs to fill in the required information.
2. Ensure that all fields are valid before proceeding to the next step.
3. Submit the form to view the success modal.
4. Reset the form state for a fresh start.



## **🤔 Key Design Decisions**
- **State Management:** Use of React's state and context for form data persistence.
- **Validation:** React Hook Form for efficient validation handling.
- **Styling:** Tailwind CSS for responsive and pixel-perfect design.


## **📜 License**
This project is licensed under the MIT License.

