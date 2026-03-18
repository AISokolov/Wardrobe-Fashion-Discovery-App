# Wardrobe Frontend Prototype

Mobile-first frontend prototype for the Wardrobe concept from `wardrobe-charter.pdf`.

## Included flows

- Explore feed with vertically scrollable fashion posts
- Like, save, and share actions on posts
- Product detail overlay with affiliate shop link
- Closet tab that reflects saved items immediately
- Static Inbox and Profile tabs to match the provided page direction

## Run locally

From the project root:

```bash
cd front-end
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Notes

- All product data is mocked in [`data/products.json`](./data/products.json).
- Save and like state is persisted in `localStorage`.
- The prototype is intentionally frontend-only and uses no backend services.
