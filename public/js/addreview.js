// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM loaded! 🚀');

  // Check for query string and set flag, "updating", to false initially
  const url = window.location.search;
  let reviewId;
  let updating = false;

  // Get a specific review
  const getReviewData = (id) => {
    fetch(`/api/reviews/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(`Success in grabbing review ${id}`, data);

          // Populate the form with the existing post
          titleInput.value = data.title;
          reviewInput.value = data.review;
          ratingInput.value = data.rating;
          authorInput.value = data.author;
          reviewSourceSelect.value = data.source;

          updating = true;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Extract the review ID from the URL
  if (url.indexOf('?review_id=') !== -1) {
    reviewId = url.split('=')[1];
    getReviewData(reviewId);
  }

  // Get elements from the page
  const reviewInput = document.getElementById('review');
  const titleInput = document.getElementById('title');
  const ratingInput = document.getElementById('rating');
  const authorInput = document.getElementById('author');
  const addreviewForm = document.getElementById('addreview');
  const reviewSourceSelect = document.getElementById('source');

  // Set default value for the source
  reviewSourceSelect.value = 'Streaming';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!titleInput.value || !reviewInput.value || !authorInput.value || !ratingInput.value) {
      alert('Your review is missing some content');
    }

  // Set alerts where rating values are outside the fixed range
    
    if (ratingInput.value > 5) {
      alert('Your rating has to be between 1 and 5');
    }
    if (ratingInput.value < 1) {
      alert('Your rating has to be between 1 and 5');
    }
    // Create a newPost object to send off to the backend
    const newReview = {
      title: titleInput.value.trim(),
      review: reviewInput.value.trim(),
      rating: ratingInput.value.trim(),
      author: authorInput.value.trim(),
      source: reviewSourceSelect.value,
    };
    console.log('handleFormSubmit -> newReview', newReview);

    // Check if the user is updating or creating and perform said function
    if (updating) {
      newReview.id = reviewId;
      updateReview(newReview);
    } else {
      submitReview(newReview);
    }
  };

  // Event listener for when the review is submitted
  addreviewForm.addEventListener('submit', handleFormSubmit);

  // Event handler for when a user submits a post
  const submitReview = (review) => {
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success in submitting review:', data);
        window.location.href = '/showreview';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Update a review and bring user to /showreview
  const updateReview = (review) => {
    fetch('/api/reviews', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
      .then(() => {
        console.log('Attempting update to review');
        window.location.href = '/showreview';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
});
