"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Mail, 
  Lock, 
  Loader2 
} from "lucide-react";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    // Clear API error when user makes changes
    if (apiError) setApiError("");
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", className: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const classNames = ["", "weak", "fair", "good", "strong", "veryStrong"];
    
    return {
      strength,
      label: labels[strength],
      className: classNames[strength]
    };
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError("");
    
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <CheckCircle2 className={styles.logoIcon} />
          </div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join us to organize your tasks efficiently</p>
        </div>

        {/* Form Card */}
        <div className={styles.card}>
          {/* API Error */}
          {apiError && (
            <div className={`${styles.errorBanner} ${styles.show}`}>
              <AlertCircle className={styles.errorIcon} />
              <p className={styles.errorText}>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username Field */}
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className={`${styles.input} ${errors.username ? styles.error : ""}`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <div className={`${styles.fieldError} ${styles.show}`}>
                  <AlertCircle className={styles.fieldErrorIcon} />
                  <span>{errors.username}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`${styles.input} ${errors.email ? styles.error : ""}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <div className={`${styles.fieldError} ${styles.show}`}>
                  <AlertCircle className={styles.fieldErrorIcon} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`${styles.input} ${styles.inputPassword} ${errors.password ? styles.error : ""}`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <EyeOff className={styles.passwordToggleIcon} />
                  ) : (
                    <Eye className={styles.passwordToggleIcon} />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthHeader}>
                    <span className={styles.strengthLabel}>Password strength</span>
                    <span className={`${styles.strengthValue} ${styles[`strength${passwordStrength.className.charAt(0).toUpperCase() + passwordStrength.className.slice(1)}`] || ""}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className={styles.strengthBar}>
                    <div
                      className={`${styles.strengthFill} ${styles[passwordStrength.className] || ""}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <div className={`${styles.fieldError} ${styles.show}`}>
                  <AlertCircle className={styles.fieldErrorIcon} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
            >
              {isLoading ? (
                <>
                  <Loader2 className={styles.spinner} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className={styles.footerLink}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className={styles.securityNote}>
          <p className={styles.securityText}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}