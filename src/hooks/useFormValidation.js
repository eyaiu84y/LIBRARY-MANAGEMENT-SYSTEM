import { useState, useCallback } from 'react';

const useFormValidation = (initialState, validationRules) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = useCallback((name, value) => {
        const rule = validationRules[name];
        if (!rule) return "";

        if (rule.required && !value) {
            return rule.message || "This field is required";
        }

        if (rule.pattern && !rule.pattern.test(value)) {
            return rule.message || "Invalid format";
        }

        if (rule.minLength && value.length < rule.minLength) {
            return rule.message || `Minimum ${rule.minLength} characters required`;
        }

        if (rule.custom && !rule.custom(value, values)) {
            return rule.message || "Invalid value";
        }

        return "";
    }, [validationRules, values]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }, [validateField]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        Object.keys(initialState).forEach(key => {
            const error = validateField(key, values[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [initialState, values, validateField]);

    const handleSubmit = useCallback(async (onSubmit) => {
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                await onSubmit(values);
            } catch (error) {
                console.error("Form submission error:", error);
            }
        }

        setIsSubmitting(false);
    }, [validateForm, values]);

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues
    };
};

export default useFormValidation;
