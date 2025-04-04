# Product Requirements Document (PRD)

## Project Title: rosemarymemorial.org
**Project Type**: Memorial Website  
**Honoree**: Rosemary Jenkins  
**Built By**: [User] using [Astro Framework]  
**Content Format**: Markdown  
**Hosting**: Public site deployed to Cloudflare pages

---

## 1. Purpose
Create a heartfelt, public online memorial for Rosemary Jenkins. The site will celebrate her life through a personal tribute, highlight her legacy in education, family, and adventure, and display a small photo gallery. Visitors can submit their own memories which will be reviewed and published by the site administrator.

---

## 2. Core Features

### 2.1 Home Page
- Hero image of Rosemary
- Tribute/obituary content in third-person
- Navigation to key theme pages: Education, Family, Adventure
- No music
- Visual theme: Classic style, serif fonts, soft tones, rose motif

### 2.2 About Page
- Full biographical content from user-supplied text
- Downloadable PDF of obituary with photo (to be provided by user)
- Timeline/milestones (optional future enhancement)

### 2.3 Theme Pages
Each theme page includes photos (5–10 total across site), captions, and written stories or reflections.

#### Education
- 32+ year elementary teaching career
- Schools: Northwest Elementary (Hudson, FL - 20 years), Cypress Elementary (New Port Richey, FL - 8 years)
- Grades taught: 2nd, 4th, 5th
- Known for creative classroom decorations and student love

#### Family
- Focus on her three sons and eight grandchildren
- Values passed down: hard work, integrity, caring for others, leading by example
- Includes names and personal anecdotes

#### Adventure
- College travels to Colorado
- Trips to visit siblings in Iowa, Connecticut, and Arizona
- Enjoyed arts & crafts in younger years
- Beloved for her classroom art and creativity

### 2.4 Photo Gallery
- 5 to 10 curated photos
- All displayed together (no grouping by theme)
- Captions optional, lightbox view enabled
- No sensitive photos to be protected

### 2.5 Guestbook / Share a Memory
- Public submission form for stories or memories
- Optional photo upload field
- Submissions **must be reviewed** by admin before appearing on site
- Backend via Netlify Forms, Formspree, or similar

---

## 3. Non-Functional Requirements
- Mobile-responsive design
- Accessible (WCAG AA)
- No background music
- Lightweight, static delivery via Astro
- Site is publicly accessible (no password protection)
- Markdown-based content for easy maintenance

---

## 4. Content Structure (Markdown)
```
/src
  /pages
    index.md
    about.md
    education.md
    family.md
    adventure.md
    guestbook.md
    gallery.md
  /photos
    [photo-assets with alt text in markdown frontmatter]
  /data
    guestbook-submissions.json
/public
  rosemary-obituary.pdf
```

---

## 5. Future Enhancements (Optional)
- Interactive timeline
- Memorial scrapbook export
- RSVP or anniversary reminders

---

## 6. Milestones
| Milestone | Description | Status |
|----------|-------------|--------|
| ✅ Requirements Finalized | Define and approve PRD | Complete |
| 🔧 Initial Build | Set up Astro project structure | Pending |
| 🖼️ Content Integration | Add bio, photo assets, and themed pages | Pending |
| 🔐 Form Handling | Set up guestbook with moderation | Pending |
| 🚀 Deployment | Go live via Netlify | Pending |

---

## 7. Notes
- Primary floral theme: **Roses** (Rosemary's favorite flower)
- Site style: **Classic**, elegant, serif-based
- All written content to be stored and rendered using Markdown
- User will manually moderate public submissions

---

## 8. Owner & Contact
- **Site Owner**: [User]
- **Developer/Builder**: [User]
- **Support Needed**: Markdown scaffolding, optional deployment assistance

---

> Rosemary Jenkins will be forever remembered for her kind heart, unwavering dedication to education, and boundless love for her family.
