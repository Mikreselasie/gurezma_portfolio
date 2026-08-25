import { VoxideClient, VoxideWidget } from "@voxide/react";

const ai = new VoxideClient({ publicKey: "vox_pub_7c9abe9d2113772139351f6c907e0bd28cebf87d74b3d924" });

ai.register({
  scrollToSection: {
    description: "Scroll the page to a specific section (e.g. work, about, services, contact).",
    params: {
      sectionId: { 
        type: "string", 
        required: true, 
        description: "The ID of the section to scroll to. Valid options: 'hero', 'about', 'work', 'process', 'testimonials', 'services', 'contact'." 
      }
    },
    handler: async ({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80; // 80px offset for navbar
        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.pushState(null, '', '#' + sectionId);
        return { status: "ok", message: `Scrolled to ${sectionId}` };
      }
      return { status: "error", message: `Section ${sectionId} not found.` };
    }
  },
  filterPortfolio: {
    description: "Filter the portfolio projects by category.",
    params: {
      category: { 
        type: "string", 
        required: true, 
        description: "Category to filter by. Options: 'all', 'video', 'motion', 'design'." 
      }
    },
    handler: async ({ category }) => {
      const validCategories = ['all', 'video', 'motion', 'design'];
      if (!validCategories.includes(category.toLowerCase())) {
        return { status: "error", message: `Invalid category: ${category}` };
      }
      
      const el = document.getElementById("work");
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      
      window.dispatchEvent(new CustomEvent('voxide:filter-portfolio', { detail: { category: category.toLowerCase() } }));
      return { status: "ok", message: `Filtered portfolio by ${category}` };
    }
  },
  submitContactRequest: {
    description: "Submit a project inquiry to the studio on behalf of the user.",
    params: {
      name: { type: "string", required: true, description: "User's full name" },
      email: { type: "string", required: true, description: "User's email address" },
      projectType: { type: "string", required: true, description: "Type of project (e.g., Video Editing, Motion Graphics, Graphic Design, Full Brand Package, Other)" },
      message: { type: "string", required: true, description: "Details about the project, timeline, and budget" }
    },
    handler: async ({ name, email, projectType, message }) => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from_name: name,
            from_email: email,
            project_type: projectType,
            message: message
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Server error');
        return { status: "success", message: "Contact request submitted successfully." };
      } catch (err) {
        return { status: "error", message: err.message };
      }
    }
  },
  openSocialLink: {
    description: "Open one of the studio's social media profiles in a new tab.",
    params: {
      platform: { type: "string", required: true, description: "Platform name (Instagram, YouTube, Behance, Vimeo, LinkedIn, Twitter)" }
    },
    handler: async ({ platform }) => {
      const urls = {
        instagram: 'https://www.instagram.com/gurezma_studios/',
        youtube: 'https://www.youtube.com/@GurezmaStudio',
        behance: 'https://www.behance.net/gurezmastudios',
        vimeo: 'https://vimeo.com/gurezmastudios',
        linkedin: 'https://www.linkedin.com/company/gurezma-studios',
        twitter: 'https://x.com/gurezma'
      };
      const url = urls[platform.toLowerCase()];
      if (url) {
        window.open(url, '_blank');
        return { status: "ok", message: `Opened ${platform}` };
      }
      return { status: "error", message: `Unknown platform: ${platform}` };
    }
  }
});

ai.bindState(() => ({ 
  currentUrl: typeof window !== "undefined" ? window.location.href : "/",
  activeHash: typeof window !== "undefined" ? window.location.hash : ""
}));

export function Assistant() {
  return <VoxideWidget client={ai} accentColor="#FF7A2A" title="Ask us" />;
}
