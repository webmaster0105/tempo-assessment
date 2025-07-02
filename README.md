# 📝 Sticky Notes App

A simple sticky notes web application built with **React** and **TypeScript**. Users can create, move, resize, and edit notes right in the browser. Notes persist between sessions via `localStorage`.

---

## 📁 Folder Structure

```
src/
├── components/
│   └── StickyNote.tsx   # Sticky note component with drag and resize
├── types/
│   └── note.ts          # Shared Note interface
├── utils/
│   └── storage.ts       # LocalStorage utilities
├── App.tsx          # Main app container
├── index.tsx            # Entry point
└── index.css            # Basic styling
```

---

## 🚀 Features

- ✅ Create a new sticky note
- ✅ Drag to move a note
- ✅ Resize note with a bottom-right handle
- ✅ Edit note content via `textarea`
- ✅ Bring note to front on click (z-index)
- ✅ Persist notes in `localStorage`

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run start

# Open in browser
http://localhost:3000
```

---

## 💡 Ideas for Improvement

- 🗑 Drag note to trash area to delete
- 🎨 Choose custom colors for notes
- 🌐 Save notes to mocked REST API
- 📦 Export/Import notes as JSON
- 📱 Responsive support (currently desktop-only)

---

## 🧪 Tech Stack
- React
- TypeScript
- HTML/CSS
- LocalStorage (Browser API)

---

## 📸 Screenshot
![image](https://github.com/user-attachments/assets/c7767786-0526-4da5-bf71-59651b38943a)

---

## 📄 License
This project is provided for technical assessment or personal learning purposes.
