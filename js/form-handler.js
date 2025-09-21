// Form handling and validation for portfolio website
// Author: Melchizedek Joshua Lozano

class FormHandler {
    constructor() {
        this.forms = new Map();
        this.validators = new Map();
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupRealTimeValidation();
        this.setupFileUpload();
    }

    // Setup form validation
    setupFormValidation() {
        // Contact form validation
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            this.forms.set('contact', contactForm);
            this.setupContactFormValidation();
        }

        // Newsletter form validation (if exists)
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            this.forms.set('newsletter', newsletterForm);
            this.setupNewsletterFormValidation();
        }
    }

    // Contact form validation setup
    setupContactFormValidation() {
        const contactForm = this.forms.get('contact');
        const fields = {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Name must be 2-50 characters and contain only letters and spaces'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            subject: {
                required: true,
                minLength: 5,
                maxLength: 100,
                message: 'Subject must be 5-100 characters long'
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                message: 'Message must be 10-1000 characters long'
            }
        };

        this.validators.set('contact', fields);
    }

    // Newsletter form validation setup
    setupNewsletterFormValidation() {
        const newsletterForm = this.forms.get('newsletter');
        const fields = {
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            }
        };

        this.validators.set('newsletter', fields);
    }

    // Setup form submission handlers
    setupFormSubmission() {
        this.forms.forEach((form, formName) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(formName, form);
            });
        });
    }

    // Handle form submission
    async handleFormSubmission(formName, form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        const validation = this.validateForm(formName, data);

        if (!validation.isValid) {
            this.showValidationErrors(form, validation.errors);
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        this.setLoadingState(submitButton, true);

        try {
            if (formName === 'contact') {
                // Send email using mailto as a fallback (client-side only)
                const subject = encodeURIComponent(data.subject);
                const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`);
                window.location.href = `mailto:melchizedek.lozano@gmail.com?subject=${subject}&body=${body}`;
                this.showSuccessMessage(form, "Your email client should open. If not, please email me directly.");
                form.reset();
                this.clearValidationErrors(form);
                return;
            }
            // Simulate API call (replace with actual endpoint)
            const response = await this.submitForm(formName, data);

            if (response.success) {
                this.showSuccessMessage(form, response.message);
                form.reset();
                this.clearValidationErrors(form);
            } else {
                this.showErrorMessage(form, response.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage(form, 'An error occurred. Please try again.');
        } finally {
            this.setLoadingState(submitButton, false, originalText);
        }
    }

    // Validate form data
    validateForm(formName, data) {
        const validator = this.validators.get(formName);
        const errors = {};

        if (!validator) {
            return { isValid: true, errors: {} };
        }

        Object.keys(validator).forEach(fieldName => {
            const fieldConfig = validator[fieldName];
            const value = data[fieldName]?.trim() || '';

            // Required field check
            if (fieldConfig.required && !value) {
                errors[fieldName] = `${this.getFieldLabel(fieldName)} is required`;
                return;
            }

            // Skip other validations if field is empty and not required
            if (!value && !fieldConfig.required) {
                return;
            }

            // Minimum length check
            if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
                errors[fieldName] = fieldConfig.message || `${this.getFieldLabel(fieldName)} must be at least ${fieldConfig.minLength} characters`;
                return;
            }

            // Maximum length check
            if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
                errors[fieldName] = fieldConfig.message || `${this.getFieldLabel(fieldName)} must be no more than ${fieldConfig.maxLength} characters`;
                return;
            }

            // Pattern check
            if (fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
                errors[fieldName] = fieldConfig.message || `${this.getFieldLabel(fieldName)} format is invalid`;
                return;
            }
        });

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    // Get field label for error messages
    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    // Show validation errors
    showValidationErrors(form, errors) {
        this.clearValidationErrors(form);

        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldError(field, errors[fieldName]);
            }
        });
    }

    // Show field error
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;

        // Insert error message after field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    // Clear validation errors
    clearValidationErrors(form) {
        const errorFields = form.querySelectorAll('.error');
        const errorMessages = form.querySelectorAll('.field-error');

        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(message => message.remove());
    }

    // Set loading state for submit button
    setLoadingState(button, isLoading, originalText = 'Submit') {
        if (isLoading) {
            button.disabled = true;
            button.textContent = 'Sending...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.textContent = originalText;
            button.style.opacity = '1';
        }
    }

    // Submit form data (simulate API call)
    async submitForm(formName, data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate different responses based on form type
        switch (formName) {
            case 'contact':
                return this.simulateContactFormSubmission(data);
            case 'newsletter':
                return this.simulateNewsletterFormSubmission(data);
            default:
                return { success: true, message: 'Form submitted successfully!' };
        }
    }

    // Simulate contact form submission
    simulateContactFormSubmission(data) {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
            return {
                success: true,
                message: 'Thank you for your message! I\'ll get back to you soon.'
            };
        } else {
            return {
                success: false,
                message: 'Failed to send message. Please try again later.'
            };
        }
    }

    // Simulate newsletter form submission
    simulateNewsletterFormSubmission(data) {
        return {
            success: true,
            message: 'Successfully subscribed to newsletter!'
        };
    }

    // Show success message
    showSuccessMessage(form, message) {
        this.showNotification(message, 'success');
        
        // Add success animation to form
        form.classList.add('form-success');
        setTimeout(() => {
            form.classList.remove('form-success');
        }, 3000);
    }

    // Show error message
    showErrorMessage(form, message) {
        this.showNotification(message, 'error');
        
        // Add error animation to form
        form.classList.add('form-error');
        setTimeout(() => {
            form.classList.remove('form-error');
        }, 3000);
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${this.getNotificationIcon(type)}
                </div>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    // Get notification color
    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    // Setup real-time validation
    setupRealTimeValidation() {
        this.forms.forEach((form, formName) => {
            const fields = form.querySelectorAll('input, textarea, select');
            
            fields.forEach(field => {
                // Validate on blur
                field.addEventListener('blur', () => {
                    this.validateField(formName, field);
                });

                // Clear errors on focus
                field.addEventListener('focus', () => {
                    this.clearFieldError(field);
                });

                // Validate on input (with debounce)
                field.addEventListener('input', this.debounce(() => {
                    this.validateField(formName, field);
                }, 500));
            });
        });
    }

    // Validate individual field
    validateField(formName, field) {
        const validator = this.validators.get(formName);
        if (!validator) return;

        const fieldName = field.name;
        const fieldConfig = validator[fieldName];
        if (!fieldConfig) return;

        const value = field.value.trim();
        let error = null;

        // Required field check
        if (fieldConfig.required && !value) {
            error = `${this.getFieldLabel(fieldName)} is required`;
        }
        // Minimum length check
        else if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
            error = fieldConfig.message || `${this.getFieldLabel(fieldName)} must be at least ${fieldConfig.minLength} characters`;
        }
        // Maximum length check
        else if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            error = fieldConfig.message || `${this.getFieldLabel(fieldName)} must be no more than ${fieldConfig.maxLength} characters`;
        }
        // Pattern check
        else if (fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
            error = fieldConfig.message || `${this.getFieldLabel(fieldName)} format is invalid`;
        }

        if (error) {
            this.showFieldError(field, error);
        } else {
            this.clearFieldError(field);
        }
    }

    // Clear field error
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Setup file upload (if needed)
    setupFileUpload() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFileUpload(e.target);
            });
        });
    }

    // Handle file upload
    handleFileUpload(input) {
        const files = input.files;
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

        Array.from(files).forEach(file => {
            // Check file size
            if (file.size > maxSize) {
                this.showNotification('File size must be less than 5MB', 'error');
                input.value = '';
                return;
            }

            // Check file type
            if (!allowedTypes.includes(file.type)) {
                this.showNotification('Only JPEG, PNG, GIF, and PDF files are allowed', 'error');
                input.value = '';
                return;
            }

            // Show file preview (for images)
            if (file.type.startsWith('image/')) {
                this.showImagePreview(file, input);
            }
        });
    }

    // Show image preview
    showImagePreview(file, input) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'file-preview';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="max-width: 100px; max-height: 100px; border-radius: 4px;">
                <button type="button" class="remove-file" aria-label="Remove file">&times;</button>
            `;

            preview.style.cssText = `
                position: relative;
                display: inline-block;
                margin-top: 0.5rem;
            `;

            const removeBtn = preview.querySelector('.remove-file');
            removeBtn.addEventListener('click', () => {
                input.value = '';
                preview.remove();
            });

            input.parentNode.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }

    // Debounce utility
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Cleanup method
    destroy() {
        this.forms.clear();
        this.validators.clear();
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.formHandler = new FormHandler();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormHandler;
}

