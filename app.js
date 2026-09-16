/**
 * Neumorphic Login & Signup Logic
 * 3D Card Flip to Left, Dynamic Looping Blue Light Focus,
 * Validation, Password Toggles, and Unified Palette Switching.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cardFlipper = document.getElementById('cardFlipper');
  const toSignupBtn = document.getElementById('toSignupBtn');
  const toLoginBtn = document.getElementById('toLoginBtn');
  
  // Forms
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  // Buttons
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const forgotPassBtn = document.getElementById('forgotPassBtn');
  
  // Feedback Messages
  const loginFeedback = document.getElementById('loginFeedbackMessage');
  const signupFeedback = document.getElementById('signupFeedbackMessage');
  
  // Modal & Toast
  const successModal = document.getElementById('successModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const toast = document.getElementById('toast');

  // Input Boxes
  const allInputs = document.querySelectorAll('.neumorphic-input-box input');
  const allInputBoxes = document.querySelectorAll('.neumorphic-input-box');

  // =========================================================================
  // 1. Toast Notification Helper
  // =========================================================================
  function showToast(message, duration = 3200) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // =========================================================================
  // 2. 3D Card Flip Controls (Flip Left & Back)
  // =========================================================================
  function flipToSignup() {
    clearErrors();
    cardFlipper.classList.add('flipped');
    setTimeout(() => {
      const firstInput = document.getElementById('signupName');
      if (firstInput) firstInput.focus();
    }, 400);
  }

  function flipToLogin() {
    clearErrors();
    cardFlipper.classList.remove('flipped');
    setTimeout(() => {
      const firstInput = document.getElementById('loginUsername');
      if (firstInput) firstInput.focus();
    }, 400);
  }

  if (toSignupBtn) {
    toSignupBtn.addEventListener('click', flipToSignup);
  }

  if (toLoginBtn) {
    toLoginBtn.addEventListener('click', flipToLogin);
  }

  // =========================================================================
  // 3. Thin Blue Light Focus & Selection Loop
  // =========================================================================
  allInputs.forEach(input => {
    const parentBox = input.closest('.neumorphic-input-box');

    input.addEventListener('focus', () => {
      if (parentBox) {
        parentBox.classList.add('is-focused');
        parentBox.classList.remove('error');
      }
      clearFeedback();
    });

    input.addEventListener('blur', () => {
      if (parentBox) {
        parentBox.classList.remove('is-focused');
      }
    });

    // Clear error on user typing
    input.addEventListener('input', () => {
      if (parentBox) {
        parentBox.classList.remove('error');
      }
      clearFeedback();
    });
  });

  // Clicking anywhere inside the neumorphic-input-box focuses the input
  allInputBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
      // Don't hijack clicks on buttons inside the box (e.g. eye toggle)
      if (e.target.closest('button')) return;
      const input = box.querySelector('input');
      if (input) input.focus();
    });
  });

  // =========================================================================
  // 4. Password Visibility Toggles
  // =========================================================================
  const toggleButtons = document.querySelectorAll('.toggle-password-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const targetInput = document.getElementById(targetId);
      if (!targetInput) return;

      const eyeIcon = btn.querySelector('.eye-icon');
      const eyeOffIcon = btn.querySelector('.eye-off-icon');

      if (targetInput.type === 'password') {
        targetInput.type = 'text';
        if (eyeIcon) eyeIcon.style.display = 'none';
        if (eyeOffIcon) eyeOffIcon.style.display = 'block';
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        targetInput.type = 'password';
        if (eyeIcon) eyeIcon.style.display = 'block';
        if (eyeOffIcon) eyeOffIcon.style.display = 'none';
        btn.setAttribute('aria-label', 'Show password');
      }
      targetInput.focus();
    });
  });

  // =========================================================================
  // 5. Tactile Button Press & Dynamic Ripple Effect
  // =========================================================================
  function setupTactileButton(button) {
    if (!button) return;

    button.addEventListener('pointerdown', (e) => {
      button.classList.add('pressed');

      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      const x = e.clientX ? e.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
      const y = e.clientY ? e.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    window.addEventListener('pointerup', () => {
      if (!button.classList.contains('loading')) {
        button.classList.remove('pressed');
      }
    });
  }

  setupTactileButton(loginBtn);
  setupTactileButton(signupBtn);

  // =========================================================================
  // 6. Validation and Feedback Helpers
  // =========================================================================
  function setFeedback(element, message, type = 'hint') {
    if (!element) return;
    element.className = `feedback-message ${type}`;
    element.textContent = message;
  }

  function clearFeedback() {
    if (loginFeedback) {
      loginFeedback.className = 'feedback-message';
      loginFeedback.textContent = '';
    }
    if (signupFeedback) {
      signupFeedback.className = 'feedback-message';
      signupFeedback.textContent = '';
    }
  }

  function clearErrors() {
    clearFeedback();
    allInputBoxes.forEach(box => box.classList.remove('error'));
    if (loginCard) loginCard.classList.remove('shake-animation');
    if (signupCard) signupCard.classList.remove('shake-animation');
  }

  function triggerShake(cardElement) {
    if (!cardElement) return;
    cardElement.classList.remove('shake-animation');
    void cardElement.offsetWidth; // force reflow
    cardElement.classList.add('shake-animation');
  }

  // =========================================================================
  // 7. Login Submission Flow
  // =========================================================================
  const loginCard = document.getElementById('loginCard');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
  });

  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  function handleLogin() {
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const boxUser = document.getElementById('boxLoginUsername');
    const boxPass = document.getElementById('boxLoginPassword');

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    clearErrors();

    if (!username && !password) {
      if (boxUser) boxUser.classList.add('error');
      if (boxPass) boxPass.classList.add('error');
      setFeedback(loginFeedback, 'Please enter your username and password', 'error');
      triggerShake(loginCard);
      if (usernameInput) usernameInput.focus();
      return;
    }

    if (!username) {
      if (boxUser) boxUser.classList.add('error');
      setFeedback(loginFeedback, 'Username or email is required', 'error');
      triggerShake(loginCard);
      if (usernameInput) usernameInput.focus();
      return;
    }

    if (!password) {
      if (boxPass) boxPass.classList.add('error');
      setFeedback(loginFeedback, 'Password is required', 'error');
      triggerShake(loginCard);
      if (passwordInput) passwordInput.focus();
      return;
    }

    // Button loading state
    loginBtn.classList.add('loading', 'pressed');

    setTimeout(() => {
      loginBtn.classList.remove('loading', 'pressed');
      setFeedback(loginFeedback, 'Credentials accepted! Logging in...', 'success');
      
      // Open Success Modal
      if (modalTitle) modalTitle.textContent = `Welcome, ${username}!`;
      if (modalDesc) modalDesc.textContent = 'You have successfully signed in to your account.';
      openSuccessModal();
    }, 600);
  }

  // =========================================================================
  // 8. Signup Submission Flow
  // =========================================================================
  const signupCard = document.getElementById('signupCard');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSignup();
  });

  if (signupBtn) {
    signupBtn.addEventListener('click', handleSignup);
  }

  function handleSignup() {
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('signupConfirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');

    const boxName = document.getElementById('boxSignupName');
    const boxEmail = document.getElementById('boxSignupEmail');
    const boxPass = document.getElementById('boxSignupPassword');
    const boxConfirm = document.getElementById('boxSignupConfirm');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const pass = passInput ? passInput.value.trim() : '';
    const confirm = confirmInput ? confirmInput.value.trim() : '';

    clearErrors();

    // Required fields check
    if (!name) {
      if (boxName) boxName.classList.add('error');
      setFeedback(signupFeedback, 'Please enter your full name', 'error');
      triggerShake(signupCard);
      if (nameInput) nameInput.focus();
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (boxEmail) boxEmail.classList.add('error');
      setFeedback(signupFeedback, 'Please enter a valid email address', 'error');
      triggerShake(signupCard);
      if (emailInput) emailInput.focus();
      return;
    }

    // Password length validation
    if (pass.length < 6) {
      if (boxPass) boxPass.classList.add('error');
      setFeedback(signupFeedback, 'Password must be at least 6 characters', 'error');
      triggerShake(signupCard);
      if (passInput) passInput.focus();
      return;
    }

    // Password confirmation match
    if (pass !== confirm) {
      if (boxConfirm) boxConfirm.classList.add('error');
      setFeedback(signupFeedback, 'Passwords do not match', 'error');
      triggerShake(signupCard);
      if (confirmInput) confirmInput.focus();
      return;
    }

    // Terms agreement check
    if (agreeTerms && !agreeTerms.checked) {
      setFeedback(signupFeedback, 'Please accept the Terms & Privacy to continue', 'error');
      triggerShake(signupCard);
      return;
    }

    // Button loading state
    signupBtn.classList.add('loading', 'pressed');

    setTimeout(() => {
      signupBtn.classList.remove('loading', 'pressed');
      setFeedback(signupFeedback, 'Account created successfully!', 'success');

      if (modalTitle) modalTitle.textContent = 'Account Created!';
      if (modalDesc) modalDesc.textContent = `Welcome ${name}! Your account has been registered with ${email}.`;
      openSuccessModal();
    }, 700);
  }

  // =========================================================================
  // 9. Forgot Password Action
  // =========================================================================
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener('click', () => {
      const usernameInput = document.getElementById('loginUsername');
      const userVal = usernameInput ? usernameInput.value.trim() : '';
      if (userVal) {
        showToast(`Reset link dispatched to ${userVal}`);
      } else {
        showToast('Password reset link sent to your registered email');
      }
    });
  }

  // =========================================================================
  // 10. Success Modal Controls
  // =========================================================================
  function openSuccessModal() {
    if (!successModal) return;
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
  }

  if (modalDismissBtn) {
    modalDismissBtn.addEventListener('click', () => {
      closeSuccessModal();
      showToast('Welcome aboard!');
    });
  }

  // Dismiss modal on background click
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  // =========================================================================
  // 11. Surface Palette Switcher (Clay, Soft Blue, Dark Clay)
  // =========================================================================
  const paletteBtns = document.querySelectorAll('.palette-btn');
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paletteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.getAttribute('data-theme-set');
      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    });
  });

  // Initial focus on username slot
  setTimeout(() => {
    const loginUsername = document.getElementById('loginUsername');
    if (loginUsername) loginUsername.focus();
  }, 100);
});
