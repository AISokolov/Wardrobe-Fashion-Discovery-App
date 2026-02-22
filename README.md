# The Social Network for Fashion  
## Project Charter – Wardrobe

**Viktor Taseski** (89231157)  
**Mario Krajoski** (89231110)  
**Aleksandr Sokolov** (89231170)

---

## 1. Project Description

**Wardrobe** is a mobile-first app for discovering fashion products from different brands in one place.  
It uses a TikTok-style experience, where users browse a personalized feed of swipeable fashion items (clothes, shoes, bags, accessories).

The goal is to make fashion discovery faster and more engaging than browsing multiple webshops manually.

The long-term vision is to build a **social network for fashion**, where users can interact, share products, and follow trends. The platform is intended to be monetized through affiliate marketing.

For the MVP, the focus is on:
- Discovery
- Personalization
- Saving favorites
- Sharing products

**Core flow:**
- Swipe feed  
- Product details  
- Save favorites  
- Open original product page on brand website  

In the initial development phase, the app will use **static mock data stored locally in JSON files**.  
No live data integration or external ingestion will be implemented at this stage.

---

## 2. Project Objectives

### A) User Functionalities

- Registration / login (email + password for MVP)
- Onboarding preferences  
  - Categories  
  - Style  
  - Price range  
  - Optional favorite brands
- Feed:
  - Product cards
  - Like, save, share products
- Swipe feed:
  - Up = next  
  - Down = back  
  - Left = chat/profile
- Product card details:
  - Image
  - Brand
  - Item name
  - Price
  - Category
- Product detail page with more information and external link
- Wishlist / saved items screen
- Search bar:
  - Category
  - Brand
  - Price range

### B) Admin / Back-Office (Basic)

- Product import/update from approved data source (CSV / API / feed / permitted method)
- Basic admin dashboard:
  - Product count
  - Categories
  - Brands
  - Import status
- Manual refresh/import trigger (if possible)
- Basic usage analytics:
  - Users
  - Swipes
  - Likes
  - Top categories / brands

> **Note:**  
> The admin dashboard is optional for the MVP since mock data will be used.  
> It serves as a prototype to demonstrate how Wardrobe works.

### C) Non-Functional Requirements

- Mobile-first responsive UI
- Smooth and fast feed loading
- Secure authentication and password storage
- Clean code and documentation for handover
- Basic error handling and logging

---

## 3. Delivery Plan and Deadlines (Phased Approach)

### Phase 1 – Planning & Design  
**1–14 March 2026**

**Deliverables:**
- Technical proposal (stack, architecture, data ingestion method, compliance note)
- Wireframes / clickable mockups
- Database schema draft
- Milestone plan

### Phase 2 – Core MVP Development  
**15 March – 11 April 2026**

**Deliverables:**
- Authentication
- Onboarding & preferences
- Swipe feed UI
- Product detail page
- Wishlist
- Backend API + database integration

### Phase 3 – Data Pipeline, Personalization & Admin Tools  
**12–30 April 2026**

**Deliverables:**
- Product import/update pipeline
- Basic recommendation / personalization logic (rule-based acceptable)
- Minimal admin dashboard
- Basic analytics counters

### Phase 4 – Testing, Deployment & Handover  
**1–31 May 2026**

**Deliverables:**
- Bug fixes and QA testing
- Staging deployment / demo-ready version
- Source code handover
- Setup and deployment documentation

---

## 4. Available Resources (Cash and In-Kind)

**Total budget:** 10,000 EUR

**Allocation:**
- Development (frontend + backend): 5,000 EUR
- Hosting / tools / domains / testing: 1,000 EUR
- Contingency: 1,500 EUR

**In-kind / Other Assets:**
- Team effort: ~540 total hours (3 people × 180 hours)
- Software licenses provided by the university

> If the budget is limited, priority should be given to core features only.

---

## 5. Key Personnel

**Project Team (Students):**
- **Aleeksandr Sokolov** – Project management, coordination, deployment, production, integration
- **Viktor Taseski** – Product vision, scraping/ingestion pipeline, data schema
- **Mario Krajoski** – Frontend UI/UX, swipe interaction, client-side state

---

## 6. Other Possible Partners

The project may collaborate with:
- Professors and assistants
- Big brands (Zara, Bershka, Gymshark, Lululemon, etc.)
- Other UPR students for testing
- Tools, instruments, and materials needed for development

---

## 7. Date of Order

**Date of project approval / order:** ___________________

---

## 8. Signatures

**Course Instructor / University Representative:**

- Viktor Taseski  
- Mario Krajoski  
- Aleksandr Sokolov  

**Date:** ___________________
