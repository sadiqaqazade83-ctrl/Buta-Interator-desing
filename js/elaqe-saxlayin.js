

(function () {
    'use strict';

    
    const WHATSAPP_NUMBER = '994552007920';

    
    const form = document.getElementById('contactForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const serviceHidden = document.getElementById('service');

    const customSelect = document.getElementById('customSelect');
    const selectValue = document.getElementById('selectValue');
    const selectOptions = document.getElementById('selectOptions');
    const serviceError = document.getElementById('service-error');

    const submitBtn = document.getElementById('submitBtn');
    const successOverlay = document.getElementById('successOverlay');
    const yearSpan = document.getElementById('year');

    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    
    function openDropdown() {
        customSelect.classList.add('open');
        customSelect.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        customSelect.classList.remove('open');
        customSelect.setAttribute('aria-expanded', 'false');
    }

    function toggleDropdown() {
        if (customSelect.classList.contains('open')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function selectOption(optionEl) {
        const value = optionEl.getAttribute('data-value');
        serviceHidden.value = value;
        selectValue.textContent = value;
        customSelect.classList.add('has-value');

        
        selectOptions.querySelectorAll('li').forEach(function (li) {
            li.classList.remove('active');
        });
        optionEl.classList.add('active');

        closeDropdown();
        clearFieldError('service', customSelect, serviceError);
    }

    if (customSelect) {
        customSelect.addEventListener('click', function (e) {
            const li = e.target.closest('li[role="option"]');
            if (li) {
                selectOption(li);
                return;
            }
            toggleDropdown();
        });

        customSelect.addEventListener('keydown', function (e) {
            const items = Array.from(selectOptions.querySelectorAll('li'));
            let currentIndex = items.findIndex(function (li) {
                return li.classList.contains('active');
            });

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!customSelect.classList.contains('open')) {
                    openDropdown();
                } else if (currentIndex >= 0) {
                    selectOption(items[currentIndex]);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                openDropdown();
                currentIndex = (currentIndex + 1) % items.length;
                items.forEach(function (li) { li.classList.remove('active'); });
                items[currentIndex].classList.add('active');
                items[currentIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                openDropdown();
                currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
                items.forEach(function (li) { li.classList.remove('active'); });
                items[currentIndex].classList.add('active');
                items[currentIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Escape') {
                closeDropdown();
            }
        });

        
        document.addEventListener('click', function (e) {
            if (!customSelect.contains(e.target)) {
                closeDropdown();
            }
        });
    }

    
    function getFieldWrapper(inputEl) {
        return inputEl.closest('.field');
    }

    function showFieldError(inputName, wrapperEl, errorEl, message) {
        if (wrapperEl) {
            wrapperEl.classList.add('invalid');
        }
        if (errorEl) {
            const span = errorEl.querySelector('span');
            if (span) span.textContent = message;
            errorEl.classList.add('show');
        }
    }

    function clearFieldError(inputName, wrapperEl, errorEl) {
        if (wrapperEl) {
            wrapperEl.classList.remove('invalid');
        }
        if (errorEl) {
            const span = errorEl.querySelector('span');
            if (span) span.textContent = '';
        }
    }

    function validateName(value) {
        return value.trim().length >= 2;
    }

    function validatePhone(value) {
        const trimmed = value.trim();
        
        const digitsOnly = trimmed.replace(/[\s()+-]/g, '');
        return digitsOnly.length >= 7 && /^[0-9]+$/.test(digitsOnly);
    }

    function validateEmail(value) {
        if (!value.trim()) return true; 
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    
    function attachLiveValidation(inputEl, errorId, validatorFn, messages) {
        const wrapper = getFieldWrapper(inputEl);
        const errorEl = document.getElementById(errorId);

        inputEl.addEventListener('input', function () {
            
            if (inputEl.id === 'phone') {
                inputEl.value = inputEl.value.replace(/[^0-9+\-\s()]/g, '');
            }

            if (wrapper.classList.contains('invalid')) {
                const value = inputEl.value;
                const isRequired = inputEl.hasAttribute('required');

                if (isRequired && !value.trim()) {
                    return; 
                }
                if (validatorFn(value)) {
                    clearFieldError(inputEl.name, wrapper, errorEl);
                }
            }
        });

        inputEl.addEventListener('blur', function () {
            const value = inputEl.value;
            const isRequired = inputEl.hasAttribute('required');

            if (isRequired && !value.trim()) {
                showFieldError(inputEl.name, wrapper, errorEl, messages.required);
            } else if (value.trim() && !validatorFn(value)) {
                showFieldError(inputEl.name, wrapper, errorEl, messages.invalid);
            } else {
                clearFieldError(inputEl.name, wrapper, errorEl);
            }
        });
    }

    attachLiveValidation(firstNameInput, 'firstName-error', validateName, {
        required: 'Zəhmət olmasa adınızı daxil edin.',
        invalid: 'Ad ən azı 2 hərfdən ibarət olmalıdır.'
    });

    attachLiveValidation(lastNameInput, 'lastName-error', validateName, {
        required: 'Zəhmət olmasa soyadınızı daxil edin.',
        invalid: 'Soyad ən azı 2 hərfdən ibarət olmalıdır.'
    });

    attachLiveValidation(phoneInput, 'phone-error', validatePhone, {
        required: 'Zəhmət olmasa telefon nömrənizi daxil edin.',
        invalid: 'Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır.'
    });

    attachLiveValidation(emailInput, 'email-error', validateEmail, {
        required: '',
        invalid: 'Zəhmət olmasa düzgün email ünvanı daxil edin.'
    });

    
    function validateAll() {
        let isValid = true;

        const firstNameVal = firstNameInput.value.trim();
        const lastNameVal = lastNameInput.value.trim();
        const phoneVal = phoneInput.value.trim();
        const emailVal = emailInput.value.trim();
        const serviceVal = serviceHidden.value.trim();

        
        if (!validateName(firstNameVal)) {
            showFieldError('firstName', getFieldWrapper(firstNameInput), document.getElementById('firstName-error'),
                firstNameVal ? 'Ad ən azı 2 hərfdən ibarət olmalıdır.' : 'Zəhmət olmasa adınızı daxil edin.');
            isValid = false;
        } else {
            clearFieldError('firstName', getFieldWrapper(firstNameInput), document.getElementById('firstName-error'));
        }

        
        if (!validateName(lastNameVal)) {
            showFieldError('lastName', getFieldWrapper(lastNameInput), document.getElementById('lastName-error'),
                lastNameVal ? 'Soyad ən azı 2 hərfdən ibarət olmalıdır.' : 'Zəhmət olmasa soyadınızı daxil edin.');
            isValid = false;
        } else {
            clearFieldError('lastName', getFieldWrapper(lastNameInput), document.getElementById('lastName-error'));
        }

        
        if (!validatePhone(phoneVal)) {
            showFieldError('phone', getFieldWrapper(phoneInput), document.getElementById('phone-error'),
                phoneVal ? 'Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır.' : 'Zəhmət olmasa telefon nömrənizi daxil edin.');
            isValid = false;
        } else {
            clearFieldError('phone', getFieldWrapper(phoneInput), document.getElementById('phone-error'));
        }

        
        if (!validateEmail(emailVal)) {
            showFieldError('email', getFieldWrapper(emailInput), document.getElementById('email-error'),
                'Zəhmət olmasa düzgün email ünvanı daxil edin.');
            isValid = false;
        } else {
            clearFieldError('email', getFieldWrapper(emailInput), document.getElementById('email-error'));
        }

        
        if (!serviceVal) {
            showFieldError('service', customSelect, serviceError, 'Zəhmət olmasa xidmət növünü seçin.');
            isValid = false;
        } else {
            clearFieldError('service', customSelect, serviceError);
        }

        return isValid;
    }

    function buildWhatsappMessage(data) {
        return (
            'Salam BUTA Interior Design.\n' +
            'Ad:\n' + data.firstName + '\n' +
            'Soyad:\n' + data.lastName + '\n' +
            'Telefon:\n' + data.phone + '\n' +
            'Email:\n' + (data.email || '-') + '\n' +
            'Seçilən xidmət:\n' + data.service + '\n' +
            'Layihə haqqında:\n' + (data.message || '-')
        );
    }

    function showSuccessAndRedirect(waLink) {
        successOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            window.location.href = waLink;

            
            setTimeout(function () {
                successOverlay.classList.remove('active');
                document.body.style.overflow = '';
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Müraciət et';
            }, 1500);
        }, 1600);
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateAll()) {
                
                const firstInvalid = form.querySelector('.invalid, .custom-select.invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const data = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                service: serviceHidden.value.trim(),
                message: messageInput.value.trim()
            };

            submitBtn.classList.add('loading');
            submitBtn.querySelector('.btn-text').textContent = 'Göndərilir...';

            const whatsappMessage = buildWhatsappMessage(data);
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodedMessage;

            showSuccessAndRedirect(waLink);
        });
    }

})();