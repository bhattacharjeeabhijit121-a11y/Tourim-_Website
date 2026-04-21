const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedbackMessage');
const commentGrid = document.querySelector('.comment-grid');

// Create image modal element
const imageModal = document.createElement('div');
imageModal.className = 'image-modal';
imageModal.innerHTML = '<img src="" alt="Full size image" id="modalImage">';
document.body.appendChild(imageModal);

function openImageModal(imageSrc) {
  const modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  imageModal.classList.add('active');
}

function closeImageModal() {
  imageModal.classList.remove('active');
}

// Close modal when clicking on it
imageModal.addEventListener('click', closeImageModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
  }
});

const packagesData = {
  "Classic City Escape": {
    description: "3 nights / 4 days city tour with guided visits to landmarks, museums, and local dining.",
    features: [
      "Airport transfer included",
      "Hotel stay in premium 4-star",
      "Daily breakfast",
      "Guided city walking tour",
      "Local cultural evening event"
    ],
    price: "$499"
  },
  "Beachside Retreat": {
    description: "5 days of sun, sand, and relaxation with seaside resort lodging and leisure activities.",
    features: [
      "Private beach access",
      "Spa discount voucher",
      "City shuttle service",
      "Sunset dinner cruise",
      "Beach yoga and water sports"
    ],
    price: "$699"
  },
  "Adventure Explorer": {
    description: "7 days of active exploration with hiking, waterfall trekking, and cultural village visits.",
    features: [
      "Expert local guides",
      "All equipment provided",
      "Meals and camping included",
      "Travel insurance support",
      "Cultural village welcome ceremony"
    ],
    price: "$899"
  },
  "Family Adventure": {
    description: "6 days of family-friendly activities, resort stay, and fun excursions for all ages.",
    features: [
      "Theme park or nature day trip",
      "Kid-friendly meals included",
      "Family photo session",
      "Children's entertainment program",
      "Evening family movie night"
    ],
    price: "$749"
  },
  "Luxury Retreat": {
    description: "4 nights of upscale travel with premium hotel, gourmet dining, and exclusive experiences.",
    features: [
      "Private transfer and concierge service",
      "Spa and fine dining included",
      "Luxury suite accommodation",
      "Private city tour",
      "VIP airport lounge access"
    ],
    price: "$1,299"
  },
  "Cultural Heritage Tour": {
    description: "5 days exploring ancient sites, historical monuments, and traditional crafts.",
    features: [
      "Guided archaeological tours",
      "Local artisan workshops",
      "Traditional cuisine tasting",
      "Museum entry fees included",
      "Cultural performance shows"
    ],
    price: "$599"
  },
  "Mountain Hiking Expedition": {
    description: "6 days of scenic mountain trails, wildlife viewing, and alpine adventures.",
    features: [
      "Professional hiking guides",
      "All hiking gear provided",
      "Mountain lodge accommodation",
      "Wildlife spotting excursions",
      "Campfire storytelling nights"
    ],
    price: "$799"
  },
  "Wellness Spa Getaway": {
    description: "4 days of rejuvenation with spa treatments, yoga sessions, and healthy cuisine.",
    features: [
      "Daily spa treatments",
      "Yoga and meditation classes",
      "Organic meals included",
      "Private wellness consultations",
      "Scenic nature walks"
    ],
    price: "$949"
  },
  "Kashmir B2B 4N/5D": {
    description: "4 nights / 5 days Kashmir package with Srinagar hotel, houseboat stay, and local sightseeing.",
    features: [
      "Airport/Railway pickup and drop",
      "3 nights Srinagar hotel + 1 night houseboat",
      "Breakfast and dinner buffet",
      "1 hour shikara ride",
      "AC cab tours with tolls and driver allowance"
    ],
    price: "From ₹7,200"
  },
  "Kashmir B2B 5N/6D": {
    description: "5 nights / 6 days Kashmir package with Srinagar, Pahalgam, and houseboat stay.",
    features: [
      "3 nights Srinagar hotel, 1 night Pahalgam hotel, 1 night houseboat",
      "Private cab for all tours",
      "Welcome drink on arrival",
      "Breakfast and dinner buffet",
      "24/7 customer support"
    ],
    price: "From ₹8,900"
  },
  "Kashmir B2B 5N/6D Ex Jammu": {
    description: "5 nights / 6 days Kashmir package starting from Jammu/Katra with Gulmarg, Sonamarg and Pahalgam.",
    features: [
      "Jammu/Katra airport or railway pickup and drop",
      "3 nights Srinagar hotel, 1 night Pahalgam hotel, 1 night houseboat",
      "AC private cab tours",
      "Breakfast and dinner buffet",
      "24/7 customer support"
    ],
    price: "From ₹9,400"
  },
  "Leh Ladakh 5N/6D": {
    description: "5 nights / 6 days Leh Ladakh package with Nubra, Pangong and Leh sightseeing.",
    features: [
      "3 nights stay in Leh, 1 night in Nubra, 1 night in Pangong",
      "MAPAI basis breakfast and dinner",
      "Non-AC Scorpio/Xylo/Innova/Aria vehicle",
      "Inner line permit included",
      "Toll, parking, road tax, and fuel charges included"
    ],
    price: "From ₹9,999"
  }
};

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function prefillMessage() {
  const packageName = getQueryParam('package');
  if (packageName && packagesData[packageName] && contactForm) {
    const pkg = packagesData[packageName];
    const messageField = contactForm.message;
    if (messageField) {
      const featuresList = pkg.features.map(f => `- ${f}`).join('\n');
      messageField.value = `I am interested in booking the ${packageName} package.\n\nPackage Details:\n${pkg.description}\n\nIncludes:\n${featuresList}\n\nPrice: ${pkg.price}\n\nPlease provide more details and help me with the booking process.`;
      // Ensure scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }
}

function formatCommentTime(date) {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function createCommentCard(name, email, comment, rating, time, imageData = null) {
  const card = document.createElement('article');
  card.className = 'comment-card';
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  let imageHTML = '';
  if (imageData) {
    imageHTML = `<img src="${imageData}" alt="Feedback image from ${name}" class="comment-image" data-fullsize="${imageData}">`;
  }
  card.innerHTML = `
    <div class="comment-meta">
      <div class="comment-rating">${stars}</div>
      <div class="comment-date">${time}</div>
    </div>
    <div class="comment-header">
      <div class="comment-avatar">👤</div>
      <div class="comment-author">
        <h3>${name}</h3>
      </div>
    </div>
    <p>${comment}</p>
    ${imageHTML}
  `;
  
  // Add click event listener to image if it exists
  if (imageData) {
    setTimeout(() => {
      const img = card.querySelector('.comment-image');
      if (img) {
        img.addEventListener('click', (e) => {
          openImageModal(imageData);
        });
      }
    }, 0);
  }
  
  return card;
}

if (feedbackForm) {
  // Image preview functionality
  const imageInput = feedbackForm['image'];
  const imagePreviewDiv = document.getElementById('imagePreview');
  
  if (imageInput && imagePreviewDiv) {
    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviewDiv.innerHTML = `
            <img src="${e.target.result}" alt="Selected image preview">
            <p class="preview-text">Image selected and ready to upload ✓</p>
          `;
          imagePreviewDiv.classList.add('active');
        };
        reader.readAsDataURL(file);
      } else {
        imagePreviewDiv.classList.remove('active');
        imagePreviewDiv.innerHTML = '';
      }
    });
  }

  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = feedbackForm['name'].value.trim();
    const email = feedbackForm['email'].value.trim();
    const ratingValue = feedbackForm['rating'].value;
    const comment = feedbackForm['comment'].value.trim();
    const imageFile = feedbackForm['image'].files[0];
    const ratingSection = document.getElementById('ratingSection');
    const ratingError = document.getElementById('ratingError');

    // Clear previous errors
    if (ratingSection) {
      ratingSection.classList.remove('error');
    }
    if (ratingError) {
      ratingError.classList.remove('show');
    }

    if (!name || !email || !comment || !ratingValue) {
      // Show rating error if rating is not selected
      if (!ratingValue) {
        if (ratingSection) {
          ratingSection.classList.add('error');
        }
        if (ratingError) {
          ratingError.classList.add('show');
        }
      }
      if (feedbackMessage) {
        feedbackMessage.textContent = 'Please complete all fields and select a rating before posting your comment.';
        feedbackMessage.style.color = '#d14343';
      }
      return;
    }

    const rating = parseInt(ratingValue, 10);
    const timestamp = formatCommentTime(new Date());

    // Handle image upload if file is selected
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        if (commentGrid) {
          commentGrid.prepend(createCommentCard(name, email, comment, rating, timestamp, imageData));
        }
        if (feedbackMessage) {
          feedbackMessage.textContent = 'Thank you! Your comment has been posted.';
          feedbackMessage.style.color = '#1e5f7f';
        }
        feedbackForm.reset();
        imagePreviewDiv.classList.remove('active');
        imagePreviewDiv.innerHTML = '';
      };
      reader.readAsDataURL(imageFile);
    } else {
      // Post comment without image
      if (commentGrid) {
        commentGrid.prepend(createCommentCard(name, email, comment, rating, timestamp));
      }
      if (feedbackMessage) {
        feedbackMessage.textContent = 'Thank you! Your comment has been posted.';
        feedbackMessage.style.color = '#1e5f7f';
      }
      feedbackForm.reset();
      imagePreviewDiv.classList.remove('active');
      imagePreviewDiv.innerHTML = '';
    }
  });

  // Clear rating error when user selects a rating
  const ratingInputs = feedbackForm.querySelectorAll('input[name="rating"]');
  ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
      const ratingSection = document.getElementById('ratingSection');
      const ratingError = document.getElementById('ratingError');
      if (ratingSection) {
        ratingSection.classList.remove('error');
      }
      if (ratingError) {
        ratingError.classList.remove('show');
      }
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Please complete all fields before sending.';
      formMessage.style.color = '#d14343';
      return;
    }

    formMessage.textContent = 'Thank you! Your message has been received. We will contact you soon.';
    formMessage.style.color = '#1e5f7f';
    contactForm.reset();
  });
}

function initPage() {
  prefillMessage();
}

document.addEventListener('DOMContentLoaded', initPage);
