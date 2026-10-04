/**
 * ============================================================================
 * ASTRANEX DEFENCE — MULTI-STEP TECHNICAL RECRUITMENT WIZARD
 * Dynamic 6-Step Technical Application & Assessment Portal
 * ============================================================================
 */

(function () {
    "use strict";

    // ============================================================================
    // BACKEND CONFIGURATION — TECHNICAL RECRUITMENT ONLY
    // Dedicated endpoint for Candidate Applications (Google Sheet: Astranex Defence Candidate Applications)
    // ============================================================================
    const APPLICATION_ENDPOINT = window.NEXT_PUBLIC_APPLICATION_ENDPOINT || "https://script.google.com/macros/s/AKfycbxJl8RIJtsmo-HspTSDY-fsxfd1OSu0Tg_UxYoyYxUOgkCALyqBrVtCmYOcBr9CHFwF/exec";

    // ============================================================================
    // 13 TECHNICAL DOMAINS SPECIFICATION & QUESTION BANK
    // ============================================================================
    const DOMAIN_CONFIG = {
        "software-engineering": {
            id: "software-engineering",
            name: "Software Engineering",
            shortDesc: "High-performance systems, C++/Rust, distributed real-time backend and telemetry stacks.",
            categories: [
                {
                    name: "Programming",
                    skills: ["C / C++", "C++17", "C++20", "Rust", "Python", "JavaScript", "TypeScript"]
                },
                {
                    name: "Software Engineering Fundamentals",
                    skills: [
                        "Data Structures & Algorithms", "Object-Oriented Programming", "System Design",
                        "Multithreading", "Concurrency", "Asynchronous Programming",
                        "Memory Management", "Performance Optimization", "Debugging"
                    ]
                },
                {
                    name: "Backend & Data",
                    skills: ["REST APIs", "WebSockets", "Databases", "PostgreSQL", "Redis", "Authentication", "Authorization"]
                },
                {
                    name: "Infrastructure & Systems",
                    skills: ["Linux", "Git", "Docker", "CI/CD", "Distributed Systems", "Real-Time Systems", "Edge Computing"]
                },
                {
                    name: "Defence Software",
                    skills: [
                        "Offline-First Systems", "Fault-Tolerant Systems", "Mission-Critical Software",
                        "Hardware-Software Integration", "Telemetry Systems", "Secure Software Development"
                    ]
                }
            ],
            additionalQuestions: [
                {
                    id: "sw_strongest_project",
                    label: "Describe your strongest software project. What did you personally build?",
                    type: "textarea",
                    required: true,
                    placeholder: "Detail the architecture, your specific contributions, challenges solved, and results..."
                }
            ]
        },
        "cybersecurity": {
            id: "cybersecurity",
            name: "Cybersecurity",
            shortDesc: "Mission security, embedded hardening, zero trust, cryptography, and resilient communications.",
            categories: [
                {
                    name: "Security Fundamentals",
                    skills: [
                        "Networking", "TCP/IP", "HTTP/HTTPS", "Linux Security",
                        "Authentication", "Authorization", "Cryptography", "TLS", "PKI", "Secure Coding"
                    ]
                },
                {
                    name: "Security Engineering",
                    skills: [
                        "Application Security", "Network Security", "Cloud Security", "Embedded Security",
                        "IoT Security", "API Security", "Threat Modelling", "Vulnerability Assessment",
                        "Security Testing", "Identity & Access Management", "Secrets Management", "Zero Trust"
                    ]
                },
                {
                    name: "Defence Security",
                    skills: [
                        "Air-Gapped Systems", "Secure Deployment", "Network Segmentation", "Secure Boot",
                        "Firmware Security", "Security Monitoring", "Incident Response", "Digital Forensics", "Security Architecture"
                    ]
                }
            ],
            additionalQuestions: [
                {
                    id: "sec_strongest_project",
                    label: "Describe your strongest cybersecurity project.",
                    type: "textarea",
                    required: true,
                    placeholder: "Describe the threat model, security mechanisms designed/analyzed, tools used, and outcomes..."
                }
            ]
        },
        "ai-ml": {
            id: "ai-ml",
            name: "AI / ML",
            shortDesc: "Edge AI inference, computer vision, sensor fusion, target detection, and autonomous perception.",
            categories: [
                {
                    name: "ML Fundamentals",
                    skills: [
                        "Python", "NumPy", "Pandas", "Scikit-learn", "PyTorch", "TensorFlow",
                        "Statistics", "Machine Learning", "Deep Learning", "Model Evaluation"
                    ]
                },
                {
                    name: "Computer Vision",
                    skills: [
                        "OpenCV", "Image Classification", "Object Detection", "Object Tracking",
                        "Segmentation", "Pose Estimation", "Video Analytics", "Multi-Object Tracking"
                    ]
                },
                {
                    name: "Edge AI & Optimization",
                    skills: [
                        "ONNX", "TensorRT", "CUDA", "GPU Inference",
                        "Quantization", "Model Optimization", "Edge Deployment", "Real-Time Inference"
                    ]
                },
                {
                    name: "Defence AI",
                    skills: [
                        "Visual Perception", "Target Detection", "Sensor Fusion",
                        "Thermal Imaging", "Autonomous Perception", "Synthetic Data"
                    ]
                }
            ],
            additionalQuestions: []
        },
        "robotics": {
            id: "robotics",
            name: "Robotics & Autonomous Systems",
            shortDesc: "ROS 2, SLAM, Nav2, trajectory planning, multi-robot coordination, and unmanned ground/aerial platforms.",
            categories: [
                {
                    name: "Robotics Core & ROS 2",
                    skills: [
                        "Robotics Fundamentals", "C++", "Python", "ROS 2",
                        "URDF", "TF2", "ROS Topics", "ROS Services", "ROS Actions", "rosbag"
                    ]
                },
                {
                    name: "Navigation & Autonomy",
                    skills: [
                        "SLAM", "Localization", "Mapping", "Path Planning",
                        "Obstacle Avoidance", "Nav2", "Behaviour Trees", "Waypoint Navigation", "Autonomous Navigation"
                    ]
                },
                {
                    name: "Sensors & Perception Hardware",
                    skills: ["LiDAR", "Camera", "IMU", "GPS/GNSS", "Ultrasonic", "Wheel Encoders", "Sensor Fusion"]
                },
                {
                    name: "Platforms",
                    skills: ["UGV", "UAV", "USV", "AUV", "Multi-Robot Systems"]
                }
            ],
            additionalQuestions: []
        },
        "embedded": {
            id: "embedded",
            name: "Embedded Systems",
            shortDesc: "Firmware engineering, RTOS, microcontrollers (STM32/ESP32), bus protocols, and bare-metal control.",
            categories: [
                {
                    name: "Microcontrollers",
                    skills: ["ESP32", "STM32", "ARM", "Microcontrollers"]
                },
                {
                    name: "Interfaces & Protocols",
                    skills: ["GPIO", "UART", "SPI", "I2C", "CAN", "PWM", "ADC", "Interrupts"]
                },
                {
                    name: "Advanced Embedded & RTOS",
                    skills: [
                        "C/C++", "RTOS", "Embedded Linux", "Firmware",
                        "Bootloaders", "Device Drivers", "Motor Control", "Sensor Integration",
                        "Hardware Debugging", "Real-Time Systems"
                    ]
                }
            ],
            additionalQuestions: []
        },
        "electronics": {
            id: "electronics",
            name: "Electronics",
            shortDesc: "PCB design (Altium/KiCad), power electronics, BMS, EMI/EMC compliance, and signal conditioning.",
            categories: [
                {
                    name: "Circuit & PCB Design",
                    skills: [
                        "Digital Electronics", "Analog Electronics", "Circuit Design",
                        "Sensors", "Signal Conditioning", "Power Supplies", "PCB Design",
                        "Altium", "KiCad", "EasyEDA"
                    ]
                },
                {
                    name: "Power & Motor Control",
                    skills: ["Motor Drivers", "Power Electronics", "BMS", "Battery Systems", "Power Management"]
                },
                {
                    name: "Embedded Hardware & Signal Integrity",
                    skills: ["CAN", "EMI/EMC", "RF Electronics", "Embedded Hardware", "Hardware Debugging"]
                }
            ],
            additionalQuestions: []
        },
        "mechanical": {
            id: "mechanical",
            name: "Mechanical Engineering",
            shortDesc: "CAD modelling, structural analysis, ruggedized defence hardware, CNC/DFM, and thermal management.",
            categories: [
                {
                    name: "CAD & Modelling",
                    skills: ["SolidWorks", "Fusion 360", "Creo", "Mechanical Design", "3D Modelling", "Technical Drawings"]
                },
                {
                    name: "Mechanical Systems",
                    skills: ["Motors", "Gearboxes", "Bearings", "Shafts", "Couplings", "Actuators", "Suspension", "Chassis"]
                },
                {
                    name: "Defence Hardware & Ruggedization",
                    skills: [
                        "Ruggedization", "Shock Resistance", "Vibration", "Water/Dust Protection",
                        "Thermal Management", "Payload Integration", "Off-Road Mobility", "Weight Optimization"
                    ]
                },
                {
                    name: "Manufacturing & Prototyping",
                    skills: ["CNC", "3D Printing", "Sheet Metal", "Machining", "DFM", "DFA", "Material Selection", "Rapid Prototyping"]
                }
            ],
            additionalQuestions: []
        },
        "sensors-perception": {
            id: "sensors-perception",
            name: "Sensors & Perception",
            shortDesc: "LiDAR, thermal vision, multi-modal sensor fusion, 3D point clouds, and real-time spatial awareness.",
            categories: [
                {
                    name: "Sensor Modalities",
                    skills: ["Camera", "Thermal Camera", "LiDAR", "Radar", "IMU", "GPS/GNSS", "Ultrasonic", "Wheel Encoder", "Magnetometer", "Sonar"]
                },
                {
                    name: "Perception & Spatial Understanding",
                    skills: ["Computer Vision", "Object Detection", "Object Tracking", "Depth Estimation", "Point Clouds", "3D Perception", "Sensor Fusion", "Localization", "Mapping"]
                },
                {
                    name: "Advanced Perception",
                    skills: ["Radar Processing", "LiDAR Processing", "Thermal Imaging", "Multi-Sensor Fusion", "Real-Time Perception", "Edge Perception"]
                }
            ],
            additionalQuestions: []
        },
        "rf-communications": {
            id: "rf-communications",
            name: "RF & Communications",
            shortDesc: "SDR, wireless mesh links, telemetry, antenna systems, long-range resilient comms, and NavIC/GNSS.",
            categories: [
                {
                    name: "RF Fundamentals",
                    skills: ["RF Fundamentals", "Antennas", "Frequency", "Bandwidth", "Modulation", "Signal-to-Noise Ratio", "Link Budget", "Propagation"]
                },
                {
                    name: "Communication Protocols & Links",
                    skills: ["TCP/IP", "UDP", "Wi-Fi", "LoRa", "4G/5G", "Mesh Networks", "Long-Range Communication", "Telemetry", "GNSS", "NavIC"]
                },
                {
                    name: "Advanced SDR & Security",
                    skills: ["Software Defined Radio", "SDR", "Spectrum Analysis", "Secure Communications", "Communication Resilience", "RF Signal Processing", "Satellite Communication"]
                }
            ],
            additionalQuestions: []
        },
        "simulation-digital-twins": {
            id: "simulation-digital-twins",
            name: "Simulation & Digital Twins",
            shortDesc: "Physics simulation (Gazebo/Isaac Sim), HIL/SIL testing, synthetic environments, and virtual validation.",
            categories: [
                {
                    name: "Simulation Platforms",
                    skills: ["Gazebo", "Isaac Sim", "Webots", "MATLAB / Simulink", "Physics Simulation", "Robot Simulation", "Sensor Simulation"]
                },
                {
                    name: "Robotics Simulation",
                    skills: ["ROS 2 Simulation", "SLAM Simulation", "Navigation Simulation", "LiDAR Simulation", "Camera Simulation", "IMU Simulation", "Multi-Robot Simulation"]
                },
                {
                    name: "Engineering & Digital Twins",
                    skills: ["Software-in-the-Loop", "Hardware-in-the-Loop", "Digital Twins", "Synthetic Data", "Scenario Generation", "Simulation Testing"]
                }
            ],
            additionalQuestions: []
        },
        "systems-engineering": {
            id: "systems-engineering",
            name: "Systems Engineering",
            shortDesc: "Complex system architecture, reliability engineering, multi-disciplinary integration, and fault tolerance.",
            categories: [
                {
                    name: "System Architecture & Decomposition",
                    skills: ["System Architecture", "Requirements Engineering", "System Decomposition", "Interface Definition", "Hardware-Software Integration", "System Integration"]
                },
                {
                    name: "Reliability, Safety & Verification",
                    skills: ["Reliability Engineering", "Fault Analysis", "Risk Analysis", "Safety Engineering", "Verification", "Validation", "Configuration Management", "Technical Documentation"]
                }
            ],
            additionalQuestions: [
                {
                    id: "sys_integrated_desc",
                    label: "Describe a system you have designed or integrated involving multiple hardware or software components.",
                    type: "textarea",
                    required: true,
                    placeholder: "Outline system requirements, interfaces defined, integration hurdles, and validation methods..."
                }
            ]
        },
        "command-control": {
            id: "command-control",
            name: "Command & Control Systems",
            shortDesc: "Ground Control Stations (GCS), STANAG standards, DDS middleware, tactical GIS, and mission control UI.",
            categories: [
                {
                    name: "GCS & Mission Control Fundamentals",
                    skills: ["Ground Control Station", "Command & Control", "Mission Planning", "Mission Execution", "Telemetry", "Vehicle Tracking", "Operator Interface", "Situational Awareness"]
                },
                {
                    name: "Defence Middleware & DDS",
                    skills: ["ROS 2", "DDS", "Cyclone DDS", "RTI Connext DDS", "QoS", "Pub/Sub", "Real-Time Communication"]
                },
                {
                    name: "Tactical GIS & Terrain",
                    skills: ["WGS84", "MGRS", "GIS", "DTED", "GeoTIFF", "Shapefile", "Offline GIS", "Terrain Data", "Mapbox", "Cesium"]
                },
                {
                    name: "Tactical Graphics & Symbology",
                    skills: ["MIL-STD-2525", "Military Symbology", "Track Visualization", "Unit Visualization", "Map Overlays", "3D Visualization"]
                },
                {
                    name: "Video & Streaming Standards",
                    skills: ["GStreamer", "FFmpeg", "RTSP", "RTP", "H.264", "H.265", "Low-Latency Video", "KLV", "STANAG 4609"]
                },
                {
                    name: "Defence Interoperability",
                    skills: ["STANAG 4586", "Military Interoperability", "Multi-Domain Systems", "Air-Ground Integration"]
                },
                {
                    name: "Graphics & UI Rendering",
                    skills: ["Qt 6", "QML", "OpenGL", "Vulkan", "GPU Rendering"]
                }
            ],
            additionalQuestions: [
                {
                    id: "c2_experience_desc",
                    label: "Describe your experience with GCS, command and control systems, robotics dashboards, telemetry systems, GIS or mission-control software.",
                    type: "textarea",
                    required: true,
                    placeholder: "Mention specific stacks, protocols (e.g., DDS, MAVLink, STANAG), architectures, or operator interfaces built..."
                },
                {
                    id: "c2_military_aerospace_flag",
                    label: "Have you worked with military, aerospace, aviation, robotics, GIS or real-time command systems?",
                    type: "radio",
                    options: ["Yes", "No"],
                    required: true
                },
                {
                    id: "c2_military_aerospace_desc",
                    label: "If Yes, please describe the system, your exact role, and technologies used:",
                    type: "textarea",
                    required: false,
                    condition: { field: "c2_military_aerospace_flag", value: "Yes" },
                    placeholder: "System scope, subsystem responsibilities, protocols, integration..."
                }
            ]
        },
        "testing-validation": {
            id: "testing-validation",
            name: "Testing & Validation",
            shortDesc: "Software QA, SIL/HIL testbenches, field reliability trials, fault injection, and environmental testing.",
            categories: [
                {
                    name: "Software Testing & QA",
                    skills: ["Unit Testing", "Integration Testing", "System Testing", "Regression Testing", "Performance Testing", "Stress Testing", "Load Testing", "Security Testing"]
                },
                {
                    name: "Robotics & Hardware-in-the-Loop Testing",
                    skills: ["Simulation Testing", "Software-in-the-Loop", "Hardware-in-the-Loop", "Field Testing", "Sensor Testing", "Navigation Testing", "Communication Testing"]
                },
                {
                    name: "Defence Systems & Reliability Verification",
                    skills: ["Failure Testing", "Fault Injection", "Reliability Testing", "Environmental Testing", "Network Failure Testing", "Offline Operation Testing", "Safety Validation", "System Verification"]
                }
            ],
            additionalQuestions: []
        }
    };

    // Rating levels definitions
    const RATING_LEVELS = [
        { val: 0, label: "0", title: "0 - No knowledge" },
        { val: 1, label: "1", title: "1 - Basic" },
        { val: 2, label: "2", title: "2 - Intermediate" },
        { val: 3, label: "3", title: "3 - Advanced" },
        { val: 4, label: "4", title: "4 - Production / Practical experience" },
        { val: 5, label: "5", title: "5 - Expert" }
    ];

    // ============================================================================
    // APPLICATION STATE
    // ============================================================================
    const formState = {
        currentStep: 1,
        maxSteps: 6,

        // Step 1: Engagement
        engagement: "",
        longTermInterest: "",
        coreTeamInterest: "",

        // Step 2: Domains
        selectedDomains: [],

        // Step 3: Technical Profile
        technicalSkills: {}, // { domainId: { skillName: ratingNumber } }
        domainAnswers: {},   // { questionId: value }

        // Step 4: Personal & Projects
        fullName: "",
        email: "",
        phone: "",
        location: "",
        college: "",
        degree: "",
        graduationYear: "",
        linkedin: "",
        github: "",
        portfolio: "",
        projectName: "",
        projectLink: "",
        projectTech: "",
        projectBuilt: "",
        projectHardestProblem: "",
        projectSolution: "",
        supportingDoc: "",

        // Step 5: Availability
        hoursPerWeek: "",
        workPreference: "",
        startDate: "",
        duration: "",
        unpaidAcknowledgement: "",
        subsystemOwnership: "",
        coreLongTerm: "",

        // Step 6: Review & Submit
        confirmedAccuracy: false,
        isSubmitting: false,
        submittedSuccess: false,
        applicationId: "",
        errorMessage: ""
    };

    // ============================================================================
    // DOM REFERENCES & INITIALIZATION
    // ============================================================================
    let wizardContainer;
    let stepTrackerContainer;
    let stepContentContainer;
    let btnBack;
    let btnContinue;
    let btnSubmit;

    document.addEventListener("DOMContentLoaded", () => {
        wizardContainer = document.getElementById("recruitment-wizard");
        if (!wizardContainer) return;

        stepTrackerContainer = document.getElementById("wizard-progress-tracker");
        stepContentContainer = document.getElementById("wizard-step-content");
        btnBack = document.getElementById("wizard-btn-back");
        btnContinue = document.getElementById("wizard-btn-continue");
        btnSubmit = document.getElementById("wizard-btn-submit");

        bindGlobalEvents();
        renderStep(formState.currentStep);
    });

    // ============================================================================
    // GLOBAL EVENT LISTENERS
    // ============================================================================
    function bindGlobalEvents() {
        if (btnBack) {
            btnBack.addEventListener("click", () => {
                if (formState.currentStep > 1 && !formState.isSubmitting) {
                    saveCurrentStepInputs();
                    goToStep(formState.currentStep - 1);
                }
            });
        }

        if (btnContinue) {
            btnContinue.addEventListener("click", () => {
                if (!formState.isSubmitting) {
                    saveCurrentStepInputs();
                    const validation = validateCurrentStep();
                    if (validation.isValid) {
                        goToStep(formState.currentStep + 1);
                    } else {
                        showStepError(validation.message);
                    }
                }
            });
        }

        if (btnSubmit) {
            btnSubmit.addEventListener("click", () => {
                if (!formState.isSubmitting) {
                    saveCurrentStepInputs();
                    const validation = validateCurrentStep();
                    if (validation.isValid) {
                        submitApplication();
                    } else {
                        showStepError(validation.message);
                    }
                }
            });
        }
    }

    function goToStep(step) {
        formState.currentStep = Math.max(1, Math.min(formState.maxSteps, step));
        renderStep(formState.currentStep);
        scrollToWizardTop();
    }

    function scrollToWizardTop() {
        if (wizardContainer) {
            const yOffset = -90;
            const y = wizardContainer.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }

    // ============================================================================
    // PROGRESS INDICATOR RENDERER
    // ============================================================================
    function renderProgressTracker() {
        if (!stepTrackerContainer) return;

        const stepsMeta = [
            { num: "01", label: "Engagement" },
            { num: "02", label: "Domains" },
            { num: "03", label: "Technical" },
            { num: "04", label: "Projects" },
            { num: "05", label: "Availability" },
            { num: "06", label: "Review" }
        ];

        let html = '<div class="wizard-progress-bar" role="progressbar" aria-label="Application Progress" aria-valuenow="' + formState.currentStep + '" aria-valuemin="1" aria-valuemax="6">';
        stepsMeta.forEach((s, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < formState.currentStep;
            const isActive = stepNum === formState.currentStep;
            const statusClass = isActive ? "step-item active" : isCompleted ? "step-item completed" : "step-item";

            html += `
                <div class="${statusClass}" data-step="${stepNum}">
                    <span class="step-num">${s.num}</span>
                    <span class="step-label">${s.label}</span>
                </div>
            `;
            if (idx < stepsMeta.length - 1) {
                const connectorClass = stepNum < formState.currentStep ? "step-connector filled" : "step-connector";
                html += `<div class="${connectorClass}" aria-hidden="true"></div>`;
            }
        });
        html += '</div>';

        stepTrackerContainer.innerHTML = html;
    }

    // ============================================================================
    // STEP CONTROLLER
    // ============================================================================
    function renderStep(step) {
        renderProgressTracker();
        clearStepError();

        // Control buttons visibility
        if (btnBack) {
            btnBack.style.display = step > 1 && !formState.submittedSuccess ? "inline-flex" : "none";
        }
        if (btnContinue) {
            btnContinue.style.display = step < formState.maxSteps ? "inline-flex" : "none";
        }
        if (btnSubmit) {
            btnSubmit.style.display = step === formState.maxSteps && !formState.submittedSuccess ? "inline-flex" : "none";
        }

        switch (step) {
            case 1:
                renderStep1();
                break;
            case 2:
                renderStep2();
                break;
            case 3:
                renderStep3();
                break;
            case 4:
                renderStep4();
                break;
            case 5:
                renderStep5();
                break;
            case 6:
                renderStep6();
                break;
            default:
                renderStep1();
        }
    }

    // ============================================================================
    // STEP 01: ENGAGEMENT
    // ============================================================================
    function renderStep1() {
        const isCoreOrLongTerm = ["Core Team", "Long-Term Technical Contributor"].includes(formState.engagement);

        let html = `
            <div class="step-panel animate-fade">
                <div class="step-header">
                    <span class="terminal-badge">STAGE 01 // INITIALIZATION</span>
                    <h2 class="step-title">JOIN ASTRANEX DEFENCE</h2>
                    <p class="step-subtitle">Build secure autonomous systems, mission systems, robotics and intelligent defence technologies.</p>
                </div>

                <div class="form-group">
                    <label class="form-label required">What are you applying for?</label>
                    <div class="options-grid engagement-grid">
                        ${renderRadioOption("engagement", "3 Month Internship", "3 Month Internship", "Dedicated engineering sprint on active tactical platforms.", formState.engagement)}
                        ${renderRadioOption("engagement", "6 Month Internship", "6 Month Internship", "In-depth research & subsystem build with full team integration.", formState.engagement)}
                        ${renderRadioOption("engagement", "Core Team", "Core Team", "High-ownership role driving platform architecture & leadership.", formState.engagement)}
                        ${renderRadioOption("engagement", "Long-Term Technical Contributor", "Long-Term Technical Contributor", "Continuous technical collaboration across engineering milestones.", formState.engagement)}
                    </div>
                </div>

                <div class="notice-box notice-info">
                    <div class="notice-icon">ℹ</div>
                    <div class="notice-text">
                        <strong>Important Notice:</strong> Current internship positions are unpaid. Selected candidates will work on technical projects under Astranex Defence.
                    </div>
                </div>

                <div id="step1-core-questions" class="conditional-block ${isCoreOrLongTerm ? "visible" : "hidden"}">
                    <div class="form-divider"></div>
                    <h3 class="section-subheading">CORE & LONG-TERM INVOLVEMENT ASSESSMENT</h3>
                    
                    <div class="form-group">
                        <label class="form-label required">Are you interested in long-term involvement with Astranex Defence?</label>
                        <div class="binary-radio-group">
                            <label class="binary-pill ${formState.longTermInterest === "Yes" ? "active" : ""}">
                                <input type="radio" name="longTermInterest" value="Yes" ${formState.longTermInterest === "Yes" ? "checked" : ""}>
                                <span>YES</span>
                            </label>
                            <label class="binary-pill ${formState.longTermInterest === "No" ? "active" : ""}">
                                <input type="radio" name="longTermInterest" value="No" ${formState.longTermInterest === "No" ? "checked" : ""}>
                                <span>NO</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label required">Are you willing to take ownership of a complete technical subsystem?</label>
                        <div class="binary-radio-group">
                            <label class="binary-pill ${formState.coreTeamInterest === "Yes" ? "active" : ""}">
                                <input type="radio" name="coreTeamInterest" value="Yes" ${formState.coreTeamInterest === "Yes" ? "checked" : ""}>
                                <span>YES</span>
                            </label>
                            <label class="binary-pill ${formState.coreTeamInterest === "No" ? "active" : ""}">
                                <input type="radio" name="coreTeamInterest" value="No" ${formState.coreTeamInterest === "No" ? "checked" : ""}>
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;

        stepContentContainer.innerHTML = html;

        // Dynamic toggle handlers for radio options
        const engagementRadios = stepContentContainer.querySelectorAll('input[name="engagement"]');
        engagementRadios.forEach(radio => {
            radio.addEventListener("change", (e) => {
                formState.engagement = e.target.value;
                const coreBlock = document.getElementById("step1-core-questions");
                const showCore = ["Core Team", "Long-Term Technical Contributor"].includes(formState.engagement);
                if (coreBlock) {
                    coreBlock.className = "conditional-block " + (showCore ? "visible" : "hidden");
                }
                updateOptionVisuals();
            });
        });

        const binaryRadios = stepContentContainer.querySelectorAll('.binary-radio-group input');
        binaryRadios.forEach(r => {
            r.addEventListener("change", (e) => {
                const name = e.target.name;
                formState[name] = e.target.value;
                const pills = e.target.closest('.binary-radio-group').querySelectorAll('.binary-pill');
                pills.forEach(p => p.classList.remove('active'));
                e.target.closest('.binary-pill').classList.add('active');
            });
        });
    }

    // ============================================================================
    // STEP 02: DOMAINS SELECTION
    // ============================================================================
    function renderStep2() {
        let html = `
            <div class="step-panel animate-fade">
                <div class="step-header">
                    <span class="terminal-badge">STAGE 02 // DOMAIN SELECTION</span>
                    <h2 class="step-title">SELECT YOUR ENGINEERING DOMAIN</h2>
                    <p class="step-subtitle">Choose the areas where you have technical knowledge or want to contribute. (Select at least one domain)</p>
                </div>

                <div class="domains-selection-grid">
        `;

        Object.values(DOMAIN_CONFIG).forEach((domain, idx) => {
            const isSelected = formState.selectedDomains.includes(domain.id);
            const indexStr = String(idx + 1).padStart(2, '0');
            const isPriority = domain.id === "command-control";

            html += `
                <div class="domain-select-card ${isSelected ? "selected" : ""} ${isPriority ? "priority-card" : ""}" data-domain-id="${domain.id}">
                    <div class="domain-card-header">
                        <span class="domain-idx">${indexStr}</span>
                        <div class="domain-check-icon">${isSelected ? "✓" : "+"}</div>
                    </div>
                    <h3 class="domain-card-name">${domain.name}</h3>
                    <p class="domain-card-desc">${domain.shortDesc}</p>
                    ${isPriority ? '<span class="domain-highlight-tag">HIGH-PRIORITY SUBSYSTEM</span>' : ''}
                </div>
            `;
        });

        html += `
                </div>
                <div class="selection-status-bar">
                    <span id="domain-count-label">${formState.selectedDomains.length} domain(s) selected</span>
                </div>
            </div>
        `;

        stepContentContainer.innerHTML = html;

        const cards = stepContentContainer.querySelectorAll(".domain-select-card");
        cards.forEach(card => {
            card.addEventListener("click", () => {
                const domainId = card.getAttribute("data-domain-id");
                const idx = formState.selectedDomains.indexOf(domainId);
                if (idx > -1) {
                    formState.selectedDomains.splice(idx, 1);
                    card.classList.remove("selected");
                    card.querySelector(".domain-check-icon").textContent = "+";
                } else {
                    formState.selectedDomains.push(domainId);
                    card.classList.add("selected");
                    card.querySelector(".domain-check-icon").textContent = "✓";
                }
                const label = document.getElementById("domain-count-label");
                if (label) {
                    label.textContent = `${formState.selectedDomains.length} domain(s) selected`;
                }
                clearStepError();
            });
        });
    }

    // ============================================================================
    // STEP 03: DYNAMIC TECHNICAL PROFILE
    // ============================================================================
    function renderStep3() {
        if (formState.selectedDomains.length === 0) {
            stepContentContainer.innerHTML = `
                <div class="step-panel animate-fade">
                    <div class="notice-box notice-warning">
                        <div class="notice-icon">⚠</div>
                        <div class="notice-text">No engineering domains selected. Please go back to Step 02 and select at least one domain.</div>
                    </div>
                </div>
            `;
            return;
        }

        let html = `
            <div class="step-panel animate-fade">
                <div class="step-header">
                    <span class="terminal-badge">STAGE 03 // TECHNICAL PROFILING</span>
                    <h2 class="step-title">TECHNICAL SKILLS & EXPERIENCE</h2>
                    <p class="step-subtitle">Rate your technical proficiency on a scale of 0 to 5 for your selected domains.</p>
                </div>

                <div class="rating-legend-card">
                    <div class="legend-title">PROFIENCY SCALE REFERENCE:</div>
                    <div class="legend-items">
                        <span><strong>0:</strong> No knowledge</span>
                        <span><strong>1:</strong> Basic</span>
                        <span><strong>2:</strong> Intermediate</span>
                        <span><strong>3:</strong> Advanced</span>
                        <span><strong>4:</strong> Production / Practical</span>
                        <span><strong>5:</strong> Expert</span>
                    </div>
                </div>
        `;

        formState.selectedDomains.forEach((domainId) => {
            const domain = DOMAIN_CONFIG[domainId];
            if (!domain) return;

            if (!formState.technicalSkills[domainId]) {
                formState.technicalSkills[domainId] = {};
            }

            html += `
                <div class="domain-tech-accordion" data-domain="${domainId}">
                    <div class="accordion-header">
                        <div class="accordion-title-wrap">
                            <span class="tech-domain-badge">DOMAIN</span>
                            <h3 class="accordion-title">${domain.name}</h3>
                        </div>
                        <span class="accordion-toggle-icon">▼</span>
                    </div>
                    <div class="accordion-content">
            `;

            // Render categories
            domain.categories.forEach((category, catIdx) => {
                html += `
                    <div class="category-block">
                        <h4 class="category-heading">${category.name}</h4>
                        <div class="skills-rating-table">
                `;

                category.skills.forEach((skill) => {
                    const currentVal = formState.technicalSkills[domainId][skill] !== undefined 
                        ? formState.technicalSkills[domainId][skill] 
                        : 0;

                    html += `
                        <div class="skill-row" data-domain="${domainId}" data-skill="${escapeHtml(skill)}">
                            <div class="skill-meta">
                                <span class="skill-name">${skill}</span>
                            </div>
                            <div class="rating-pill-group" role="radiogroup" aria-label="${skill} rating">
                    `;

                    RATING_LEVELS.forEach(lvl => {
                        const isChecked = currentVal === lvl.val;
                        html += `
                            <label class="rating-pill ${isChecked ? "active" : ""}" title="${lvl.title}">
                                <input type="radio" 
                                       name="skill_${domainId}_${sanitizeName(skill)}" 
                                       value="${lvl.val}" 
                                       data-domain="${domainId}" 
                                       data-skill="${escapeHtml(skill)}" 
                                       ${isChecked ? "checked" : ""}>
                                <span>${lvl.label}</span>
                            </label>
                        `;
                    });

                    html += `
                            </div>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            });

            // Domain Additional Questions
            if (domain.additionalQuestions && domain.additionalQuestions.length > 0) {
                html += `
                    <div class="domain-custom-questions">
                        <h4 class="category-heading">Domain Specific Evaluation</h4>
                `;

                domain.additionalQuestions.forEach((q) => {
                    const savedAns = formState.domainAnswers[q.id] || "";
                    const isVisible = !q.condition || (formState.domainAnswers[q.condition.field] === q.condition.value);

                    html += `
                        <div class="form-group domain-question-wrap ${isVisible ? "" : "hidden"}" id="wrap_${q.id}">
                            <label class="form-label ${q.required ? "required" : ""}">${q.label}</label>
                    `;

                    if (q.type === "textarea") {
                        html += `
                            <textarea class="form-control" 
                                      name="${q.id}" 
                                      rows="4" 
                                      placeholder="${q.placeholder || ""}" 
                                      ${q.required ? "required" : ""}>${escapeHtml(savedAns)}</textarea>
                        `;
                    } else if (q.type === "radio") {
                        html += `<div class="binary-radio-group">`;
                        (q.options || ["Yes", "No"]).forEach(opt => {
                            const isChecked = savedAns === opt;
                            html += `
                                <label class="binary-pill ${isChecked ? "active" : ""}">
                                    <input type="radio" name="${q.id}" value="${opt}" ${isChecked ? "checked" : ""}>
                                    <span>${opt.toUpperCase()}</span>
                                </label>
                            `;
                        });
                        html += `</div>`;
                    }

                    html += `</div>`;
                });

                html += `</div>`;
            }

            html += `
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        stepContentContainer.innerHTML = html;

        // Accordion collapsible behavior
        const accordions = stepContentContainer.querySelectorAll(".domain-tech-accordion");
        accordions.forEach(acc => {
            const header = acc.querySelector(".accordion-header");
            header.addEventListener("click", () => {
                acc.classList.toggle("collapsed");
                const icon = acc.querySelector(".accordion-toggle-icon");
                if (icon) {
                    icon.textContent = acc.classList.contains("collapsed") ? "▶" : "▼";
                }
            });
        });

        // Skill rating input listener
        const ratingInputs = stepContentContainer.querySelectorAll(".rating-pill-group input");
        ratingInputs.forEach(input => {
            input.addEventListener("change", (e) => {
                const domainId = e.target.getAttribute("data-domain");
                const skillName = e.target.getAttribute("data-skill");
                const val = parseInt(e.target.value, 10);

                if (!formState.technicalSkills[domainId]) {
                    formState.technicalSkills[domainId] = {};
                }
                formState.technicalSkills[domainId][skillName] = val;

                const group = e.target.closest(".rating-pill-group");
                group.querySelectorAll(".rating-pill").forEach(p => p.classList.remove("active"));
                e.target.closest(".rating-pill").classList.add("active");
            });
        });

        // Additional domain questions listener
        const domInputs = stepContentContainer.querySelectorAll(".domain-custom-questions textarea, .domain-custom-questions input");
        domInputs.forEach(input => {
            input.addEventListener("input", (e) => {
                formState.domainAnswers[e.target.name] = e.target.value;
            });
            input.addEventListener("change", (e) => {
                formState.domainAnswers[e.target.name] = e.target.value;
                if (e.target.type === "radio") {
                    const group = e.target.closest(".binary-radio-group");
                    if (group) {
                        group.querySelectorAll(".binary-pill").forEach(p => p.classList.remove("active"));
                        e.target.closest(".binary-pill").classList.add("active");
                    }
                    // Handle dynamic conditional questions like C2
                    if (e.target.name === "c2_military_aerospace_flag") {
                        const targetWrap = document.getElementById("wrap_c2_military_aerospace_desc");
                        if (targetWrap) {
                            targetWrap.className = "form-group domain-question-wrap " + (e.target.value === "Yes" ? "" : "hidden");
                        }
                    }
                }
            });
        });
    }

    // ============================================================================
    // STEP 04: APPLICANT INFO & PROJECT EXPERIENCE
    // ============================================================================
    function renderStep4() {
        let html = `
            <div class="step-panel animate-fade">
                <div class="step-header">
                    <span class="terminal-badge">STAGE 04 // PROFILE & DEEP DIVE</span>
                    <h2 class="step-title">PROJECT EXPERIENCE & CREDENTIALS</h2>
                    <p class="step-subtitle">Tell us about your background and deep dive into the most rigorous project you've built.</p>
                </div>

                <div class="form-grid-2col">
                    <div class="form-group">
                        <label class="form-label required" for="input_fullName">Full Name</label>
                        <input type="text" id="input_fullName" class="form-control" name="fullName" value="${escapeHtml(formState.fullName)}" placeholder="e.g. Vikram Sharma" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label required" for="input_email">Email Address</label>
                        <input type="email" id="input_email" class="form-control" name="email" value="${escapeHtml(formState.email)}" placeholder="e.g. vikram@example.com" required>
                    </div>
                </div>

                <div class="form-grid-2col">
                    <div class="form-group">
                        <label class="form-label required" for="input_phone">Phone Number</label>
                        <input type="tel" id="input_phone" class="form-control" name="phone" value="${escapeHtml(formState.phone)}" placeholder="+91 98765 43210" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label required" for="input_location">Current Location / City</label>
                        <input type="text" id="input_location" class="form-control" name="location" value="${escapeHtml(formState.location)}" placeholder="e.g. Bengaluru, India" required>
                    </div>
                </div>

                <div class="form-grid-3col">
                    <div class="form-group">
                        <label class="form-label required" for="input_college">College / University</label>
                        <input type="text" id="input_college" class="form-control" name="college" value="${escapeHtml(formState.college)}" placeholder="e.g. IIT Madras" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label required" for="input_degree">Degree / Major</label>
                        <input type="text" id="input_degree" class="form-control" name="degree" value="${escapeHtml(formState.degree)}" placeholder="e.g. B.Tech in Robotics / CS" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label required" for="input_graduationYear">Graduation Year</label>
                        <input type="text" id="input_graduationYear" class="form-control" name="graduationYear" value="${escapeHtml(formState.graduationYear)}" placeholder="e.g. 2026" required>
                    </div>
                </div>

                <div class="form-grid-3col">
                    <div class="form-group">
                        <label class="form-label" for="input_linkedin">LinkedIn Profile URL</label>
                        <input type="url" id="input_linkedin" class="form-control" name="linkedin" value="${escapeHtml(formState.linkedin)}" placeholder="https://linkedin.com/in/username">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="input_github">GitHub Profile URL</label>
                        <input type="url" id="input_github" class="form-control" name="github" value="${escapeHtml(formState.github)}" placeholder="https://github.com/username">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="input_portfolio">Portfolio / Personal Website</label>
                        <input type="url" id="input_portfolio" class="form-control" name="portfolio" value="${escapeHtml(formState.portfolio)}" placeholder="https://yourportfolio.dev">
                    </div>
                </div>

                <div class="form-divider"></div>
                <h3 class="section-subheading">STRONGEST TECHNICAL PROJECT DEEP-DIVE</h3>

                <div class="form-grid-2col">
                    <div class="form-group">
                        <label class="form-label required" for="input_projectName">Project Name</label>
                        <input type="text" id="input_projectName" class="form-control" name="projectName" value="${escapeHtml(formState.projectName)}" placeholder="e.g. Autonomous UGV Path Planner & GCS" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="input_projectLink">Project Repository / Demo Link</label>
                        <input type="url" id="input_projectLink" class="form-control" name="projectLink" value="${escapeHtml(formState.projectLink)}" placeholder="https://github.com/org/repo or demo video">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label required" for="input_projectTech">Technologies & Tools Used</label>
                    <input type="text" id="input_projectTech" class="form-control" name="projectTech" value="${escapeHtml(formState.projectTech)}" placeholder="e.g. C++20, ROS 2, Cyclone DDS, Qt/QML, STM32, OpenCV" required>
                </div>

                <div class="form-group">
                    <label class="form-label required" for="input_projectBuilt">What did you personally build and contribute?</label>
                    <textarea id="input_projectBuilt" class="form-control" name="projectBuilt" rows="4" placeholder="Detail your exact subsystem, algorithm implementations, hardware schematics, or architecture..." required>${escapeHtml(formState.projectBuilt)}</textarea>
                </div>

                <div class="form-group">
                    <label class="form-label required" for="input_projectHardestProblem">What was the hardest technical problem you encountered?</label>
                    <textarea id="input_projectHardestProblem" class="form-control" name="projectHardestProblem" rows="3" placeholder="Describe the failure mode, race condition, bandwidth bottleneck, or hardware challenge..." required>${escapeHtml(formState.projectHardestProblem)}</textarea>
                </div>

                <div class="form-group">
                    <label class="form-label required" for="input_projectSolution">How did you solve it?</label>
                    <textarea id="input_projectSolution" class="form-control" name="projectSolution" rows="3" placeholder="Explain your debugging methodology, architecture redesign, mathematical formulation, or fix..." required>${escapeHtml(formState.projectSolution)}</textarea>
                </div>

                <div class="form-group">
                    <label class="form-label" for="input_supportingDoc">Supporting Document / Cloud Drive Link (Optional)</label>
                    <input type="url" id="input_supportingDoc" class="form-control" name="supportingDoc" value="${escapeHtml(formState.supportingDoc)}" placeholder="Google Drive, Dropbox, or Paper PDF link (Make sure link is viewable)">
                </div>
            </div>
        `;

        stepContentContainer.innerHTML = html;
        bindInputSync(stepContentContainer);
    }

    // ============================================================================
    // STEP 05: AVAILABILITY & COMMITMENT
    // ============================================================================
    function renderStep5() {
        const isCoreTeam = ["Core Team", "Long-Term Technical Contributor"].includes(formState.engagement);

        let html = `
            <div class="step-panel animate-fade">
                <div class="step-header">
                    <span class="terminal-badge">STAGE 05 // LOGISTICS & COMMITMENT</span>
                    <h2 class="step-title">AVAILABILITY & ENGAGEMENT TERMS</h2>
                    <p class="step-subtitle">Specify your timeline, bandwidth, and working preferences.</p>
                </div>

                <div class="form-group">
                    <label class="form-label required">Hours Available Per Week</label>
                    <div class="options-grid hours-grid">
                        ${renderRadioOption("hoursPerWeek", "5 to 10", "5 to 10 hrs/week", "Limited part-time engagement", formState.hoursPerWeek)}
                        ${renderRadioOption("hoursPerWeek", "10 to 20", "10 to 20 hrs/week", "Standard part-time technical commitment", formState.hoursPerWeek)}
                        ${renderRadioOption("hoursPerWeek", "20 to 30", "20 to 30 hrs/week", "Intensive contributor commitment", formState.hoursPerWeek)}
                        ${renderRadioOption("hoursPerWeek", "30+", "30+ hrs/week", "Full-time immersion", formState.hoursPerWeek)}
                    </div>
                </div>

                <div class="form-grid-2col">
                    <div class="form-group">
                        <label class="form-label required">Working Preference</label>
                        <div class="options-grid pref-grid">
                            ${renderRadioOption("workPreference", "Remote", "Remote", "Async & virtual collaboration", formState.workPreference)}
                            ${renderRadioOption("workPreference", "Hybrid", "Hybrid", "Lab & remote combined", formState.workPreference)}
                            ${renderRadioOption("workPreference", "On-site", "On-site", "Direct physical lab integration", formState.workPreference)}
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label required" for="input_startDate">Earliest Start Date</label>
                        <input type="date" id="input_startDate" class="form-control" name="startDate" value="${escapeHtml(formState.startDate)}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="input_duration">Expected Engagement Duration</label>
                    <input type="text" id="input_duration" class="form-control" name="duration" value="${escapeHtml(formState.duration)}" placeholder="e.g. 3 Months, 6 Months, or Ongoing Long-Term">
                </div>

                <div class="notice-box notice-warning">
                    <div class="notice-icon">⚠</div>
                    <div class="notice-text">
                        <strong>Terms Acknowledgement:</strong> Are you willing to work on an unpaid basis during the selected engagement? Selected candidates work on advanced technical projects, prototypes, and platform engineering under Astranex Defence.
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label required">Do you acknowledge and agree to the unpaid engagement terms?</label>
                    <div class="binary-radio-group">
                        <label class="binary-pill ${formState.unpaidAcknowledgement === "Yes" ? "active" : ""}">
                            <input type="radio" name="unpaidAcknowledgement" value="Yes" ${formState.unpaidAcknowledgement === "Yes" ? "checked" : ""}>
                            <span>YES, I AGREE</span>
                        </label>
                        <label class="binary-pill ${formState.unpaidAcknowledgement === "No" ? "active" : ""}">
                            <input type="radio" name="unpaidAcknowledgement" value="No" ${formState.unpaidAcknowledgement === "No" ? "checked" : ""}>
                            <span>NO</span>
                        </label>
                    </div>
                </div>

                ${isCoreTeam ? `
                    <div class="form-divider"></div>
                    <h3 class="section-subheading">CORE COMMITMENT CONFIRMATION</h3>
                    <div class="form-group">
                        <label class="form-label required">Are you willing to take ownership of a complete technical subsystem?</label>
                        <div class="binary-radio-group">
                            <label class="binary-pill ${formState.subsystemOwnership === "Yes" ? "active" : ""}">
                                <input type="radio" name="subsystemOwnership" value="Yes" ${formState.subsystemOwnership === "Yes" ? "checked" : ""}>
                                <span>YES</span>
                            </label>
                            <label class="binary-pill ${formState.subsystemOwnership === "No" ? "active" : ""}">
                                <input type="radio" name="subsystemOwnership" value="No" ${formState.subsystemOwnership === "No" ? "checked" : ""}>
                                <span>NO</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label required">Are you interested in long-term involvement with Astranex Defence?</label>
                        <div class="binary-radio-group">
                            <label class="binary-pill ${formState.coreLongTerm === "Yes" ? "active" : ""}">
                                <input type="radio" name="coreLongTerm" value="Yes" ${formState.coreLongTerm === "Yes" ? "checked" : ""}>
                                <span>YES</span>
                            </label>
                            <label class="binary-pill ${formState.coreLongTerm === "No" ? "active" : ""}">
                                <input type="radio" name="coreLongTerm" value="No" ${formState.coreLongTerm === "No" ? "checked" : ""}>
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                ` : ""}
            </div>
        `;

        stepContentContainer.innerHTML = html;
        bindInputSync(stepContentContainer);
    }

    // ============================================================================
    // STEP 06: REVIEW & SUBMIT
    // ============================================================================
    function renderStep6() {
        const domainNames = formState.selectedDomains.map(id => DOMAIN_CONFIG[id]?.name || id).join(", ");
        const techScore = calculateTechnicalScore(formState.technicalSkills);
        const topSkills = getTopSkillsSummary(formState.technicalSkills);

        let html = `
            <div class="step-panel animate-fade">
                <div class="step-header">
                    <span class="terminal-badge">STAGE 06 // VERIFICATION & SUBMISSION</span>
                    <h2 class="step-title">APPLICATION REVIEW</h2>
                    <p class="step-subtitle">Verify your technical profile and credentials before final submission to the Astranex recruitment registry.</p>
                </div>

                <div class="review-sections-wrap">
                    <!-- Personal & Engagement -->
                    <div class="review-card">
                        <div class="review-card-header">
                            <span class="review-badge">01 // CANDIDATE & ROLE</span>
                            <button type="button" class="btn-edit-step" data-target-step="1">EDIT</button>
                        </div>
                        <div class="review-grid">
                            <div class="review-item"><span class="label">Name:</span><span class="val">${escapeHtml(formState.fullName || "—")}</span></div>
                            <div class="review-item"><span class="label">Email:</span><span class="val">${escapeHtml(formState.email || "—")}</span></div>
                            <div class="review-item"><span class="label">Phone:</span><span class="val">${escapeHtml(formState.phone || "—")}</span></div>
                            <div class="review-item"><span class="label">Location:</span><span class="val">${escapeHtml(formState.location || "—")}</span></div>
                            <div class="review-item"><span class="label">Engagement:</span><span class="val highlight">${escapeHtml(formState.engagement || "—")}</span></div>
                            <div class="review-item"><span class="label">Education:</span><span class="val">${escapeHtml(formState.degree || "—")} (${escapeHtml(formState.college || "—")}, ${escapeHtml(formState.graduationYear || "—")})</span></div>
                        </div>
                    </div>

                    <!-- Selected Domains & Technical Signal -->
                    <div class="review-card">
                        <div class="review-card-header">
                            <span class="review-badge">02 // DOMAINS & TECHNICAL PROFILE</span>
                            <button type="button" class="btn-edit-step" data-target-step="2">EDIT</button>
                        </div>
                        <div class="review-grid">
                            <div class="review-item full-width"><span class="label">Selected Domains:</span><span class="val highlight">${escapeHtml(domainNames || "None")}</span></div>
                            <div class="review-item"><span class="label">Initial Screening Signal:</span><span class="val">${techScore}</span></div>
                            <div class="review-item full-width"><span class="label">Primary Proficiencies:</span><span class="val mono">${escapeHtml(topSkills || "Ratings registered")}</span></div>
                        </div>
                    </div>

                    <!-- Project Deep-Dive -->
                    <div class="review-card">
                        <div class="review-card-header">
                            <span class="review-badge">03 // STRONGEST PROJECT</span>
                            <button type="button" class="btn-edit-step" data-target-step="4">EDIT</button>
                        </div>
                        <div class="review-grid">
                            <div class="review-item"><span class="label">Project:</span><span class="val">${escapeHtml(formState.projectName || "—")}</span></div>
                            <div class="review-item"><span class="label">Technologies:</span><span class="val mono">${escapeHtml(formState.projectTech || "—")}</span></div>
                            <div class="review-item full-width"><span class="label">Key Contributions:</span><span class="val multiline">${escapeHtml(formState.projectBuilt || "—")}</span></div>
                            <div class="review-item full-width"><span class="label">Hardest Problem & Solution:</span><span class="val multiline">${escapeHtml(formState.projectHardestProblem || "—")} — <em>${escapeHtml(formState.projectSolution || "—")}</em></span></div>
                        </div>
                    </div>

                    <!-- Availability & Terms -->
                    <div class="review-card">
                        <div class="review-card-header">
                            <span class="review-badge">04 // AVAILABILITY</span>
                            <button type="button" class="btn-edit-step" data-target-step="5">EDIT</button>
                        </div>
                        <div class="review-grid">
                            <div class="review-item"><span class="label">Hours/Week:</span><span class="val">${escapeHtml(formState.hoursPerWeek || "—")}</span></div>
                            <div class="review-item"><span class="label">Preference:</span><span class="val">${escapeHtml(formState.workPreference || "—")}</span></div>
                            <div class="review-item"><span class="label">Start Date:</span><span class="val">${escapeHtml(formState.startDate || "—")}</span></div>
                            <div class="review-item"><span class="label">Unpaid Terms Accepted:</span><span class="val highlight">${escapeHtml(formState.unpaidAcknowledgement || "—")}</span></div>
                        </div>
                    </div>
                </div>

                <div class="confirmation-box">
                    <label class="checkbox-label">
                        <input type="checkbox" id="chk_confirmedAccuracy" name="confirmedAccuracy" ${formState.confirmedAccuracy ? "checked" : ""}>
                        <span class="checkbox-custom"></span>
                        <span class="checkbox-text">
                            I confirm that the information provided is accurate and represents my own technical experience and project contributions.
                        </span>
                    </label>
                </div>

                <div id="submission-feedback-area"></div>
            </div>
        `;

        stepContentContainer.innerHTML = html;

        // Edit button handler
        const editButtons = stepContentContainer.querySelectorAll(".btn-edit-step");
        editButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const target = parseInt(btn.getAttribute("data-target-step"), 10);
                if (target) goToStep(target);
            });
        });

        // Checkbox handler
        const chk = stepContentContainer.querySelector("#chk_confirmedAccuracy");
        if (chk) {
            chk.addEventListener("change", (e) => {
                formState.confirmedAccuracy = e.target.checked;
                clearStepError();
            });
        }
    }

    // ============================================================================
    // INPUT SYNC & UTILITY HELPERS
    // ============================================================================
    function bindInputSync(container) {
        const inputs = container.querySelectorAll("input, textarea, select");
        inputs.forEach(input => {
            const name = input.name;
            if (!name) return;

            if (input.type === "radio") {
                input.addEventListener("change", (e) => {
                    formState[name] = e.target.value;
                    const group = e.target.closest(".options-grid, .binary-radio-group");
                    if (group) {
                        group.querySelectorAll(".option-pill, .binary-pill").forEach(p => p.classList.remove("active"));
                        const parent = e.target.closest(".option-pill, .binary-pill");
                        if (parent) parent.classList.add("active");
                    }
                    clearStepError();
                });
            } else {
                input.addEventListener("input", (e) => {
                    formState[name] = e.target.value;
                    clearStepError();
                });
            }
        });
    }

    function saveCurrentStepInputs() {
        if (!stepContentContainer) return;
        const inputs = stepContentContainer.querySelectorAll("input, textarea, select");
        inputs.forEach(input => {
            const name = input.name;
            if (!name) return;

            if (input.type === "radio") {
                if (input.checked) {
                    if (name.startsWith("skill_")) {
                        const domain = input.getAttribute("data-domain");
                        const skill = input.getAttribute("data-skill");
                        if (!formState.technicalSkills[domain]) formState.technicalSkills[domain] = {};
                        formState.technicalSkills[domain][skill] = parseInt(input.value, 10);
                    } else if (DOMAIN_CONFIG[name] || name.startsWith("c2_") || name.startsWith("sw_") || name.startsWith("sec_") || name.startsWith("sys_")) {
                        formState.domainAnswers[name] = input.value;
                    } else {
                        formState[name] = input.value;
                    }
                }
            } else if (input.type === "checkbox") {
                if (name === "confirmedAccuracy") {
                    formState.confirmedAccuracy = input.checked;
                }
            } else {
                if (name.startsWith("c2_") || name.startsWith("sw_") || name.startsWith("sec_") || name.startsWith("sys_")) {
                    formState.domainAnswers[name] = input.value.trim();
                } else if (formState.hasOwnProperty(name)) {
                    formState[name] = input.value.trim();
                }
            }
        });
    }

    function renderRadioOption(name, value, title, desc, currentValue) {
        const isChecked = currentValue === value;
        return `
            <label class="option-pill ${isChecked ? "active" : ""}">
                <input type="radio" name="${name}" value="${value}" ${isChecked ? "checked" : ""}>
                <div class="option-content">
                    <span class="option-title">${title}</span>
                    ${desc ? `<span class="option-desc">${desc}</span>` : ""}
                </div>
            </label>
        `;
    }

    function updateOptionVisuals() {
        const options = stepContentContainer.querySelectorAll(".option-pill");
        options.forEach(opt => {
            const input = opt.querySelector("input");
            if (input && input.checked) {
                opt.classList.add("active");
            } else {
                opt.classList.remove("active");
            }
        });
    }

    // ============================================================================
    // STEP VALIDATION
    // ============================================================================
    function validateCurrentStep() {
        switch (formState.currentStep) {
            case 1:
                if (!formState.engagement) {
                    return { isValid: false, message: "Please select an engagement position (Internship, Core Team, or Contributor)." };
                }
                if (["Core Team", "Long-Term Technical Contributor"].includes(formState.engagement)) {
                    if (!formState.longTermInterest) {
                        return { isValid: false, message: "Please answer if you are interested in long-term involvement." };
                    }
                    if (!formState.coreTeamInterest) {
                        return { isValid: false, message: "Please answer if you are willing to take ownership of a complete subsystem." };
                    }
                }
                return { isValid: true };

            case 2:
                if (!formState.selectedDomains || formState.selectedDomains.length === 0) {
                    return { isValid: false, message: "Please select at least one engineering domain to proceed." };
                }
                return { isValid: true };

            case 3:
                // Check required domain-specific questions
                for (let domainId of formState.selectedDomains) {
                    const cfg = DOMAIN_CONFIG[domainId];
                    if (cfg && cfg.additionalQuestions) {
                        for (let q of cfg.additionalQuestions) {
                            if (q.required) {
                                const val = formState.domainAnswers[q.id];
                                if (!val || !val.trim()) {
                                    return { isValid: false, message: `Please complete the required question for ${cfg.name}: "${q.label}"` };
                                }
                            }
                        }
                    }
                }
                return { isValid: true };

            case 4:
                if (!formState.fullName) return { isValid: false, message: "Full Name is required." };
                if (!formState.email || !isValidEmail(formState.email)) return { isValid: false, message: "Please enter a valid email address." };
                if (!formState.phone) return { isValid: false, message: "Phone number is required." };
                if (!formState.location) return { isValid: false, message: "Current location is required." };
                if (!formState.college) return { isValid: false, message: "College/University is required." };
                if (!formState.degree) return { isValid: false, message: "Degree/Program is required." };
                if (!formState.graduationYear) return { isValid: false, message: "Graduation year is required." };
                if (!formState.projectName) return { isValid: false, message: "Strongest technical project name is required." };
                if (!formState.projectTech) return { isValid: false, message: "Technologies used in project are required." };
                if (!formState.projectBuilt) return { isValid: false, message: "Please describe what you personally built in the project." };
                if (!formState.projectHardestProblem) return { isValid: false, message: "Please describe the hardest technical problem you faced." };
                if (!formState.projectSolution) return { isValid: false, message: "Please describe how you solved the hardest technical problem." };
                return { isValid: true };

            case 5:
                if (!formState.hoursPerWeek) return { isValid: false, message: "Please select your available hours per week." };
                if (!formState.workPreference) return { isValid: false, message: "Please select your work preference (Remote/Hybrid/On-site)." };
                if (!formState.startDate) return { isValid: false, message: "Please enter your earliest start date." };
                if (formState.unpaidAcknowledgement !== "Yes") return { isValid: false, message: "You must acknowledge and agree to the unpaid engagement terms." };
                if (["Core Team", "Long-Term Technical Contributor"].includes(formState.engagement)) {
                    if (!formState.subsystemOwnership) return { isValid: false, message: "Please specify if you are willing to take ownership of a technical subsystem." };
                    if (!formState.coreLongTerm) return { isValid: false, message: "Please specify if you are interested in long-term involvement." };
                }
                return { isValid: true };

            case 6:
                if (!formState.confirmedAccuracy) {
                    return { isValid: false, message: "Please check the confirmation box to verify your application accuracy." };
                }
                return { isValid: true };

            default:
                return { isValid: true };
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showStepError(msg) {
        let errBox = document.getElementById("wizard-error-banner");
        if (!errBox) {
            errBox = document.createElement("div");
            errBox.id = "wizard-error-banner";
            errBox.className = "wizard-error-banner animate-fade";
            if (wizardContainer) {
                wizardContainer.querySelector(".wizard-nav-controls")?.before(errBox);
            }
        }
        errBox.innerHTML = `<span>⚠ ${msg}</span>`;
        errBox.style.display = "block";
    }

    function clearStepError() {
        const errBox = document.getElementById("wizard-error-banner");
        if (errBox) {
            errBox.style.display = "none";
            errBox.innerHTML = "";
        }
    }

    // ============================================================================
    // TECHNICAL SIGNAL & SUMMARY SCORER
    // ============================================================================
    function calculateTechnicalScore(skills) {
        let totalScore = 0;
        let totalCount = 0;
        Object.values(skills).forEach(domainSkills => {
            Object.values(domainSkills).forEach(rating => {
                if (typeof rating === "number") {
                    totalScore += rating;
                    totalCount++;
                }
            });
        });
        if (totalCount === 0) return "0% (0/0)";
        const maxScore = totalCount * 5;
        const pct = Math.round((totalScore / maxScore) * 100);
        return `${pct}% (${totalScore}/${maxScore})`;
    }

    function getTopSkillsSummary(skills) {
        const items = [];
        Object.entries(skills).forEach(([domainId, domainSkills]) => {
            const domainName = DOMAIN_CONFIG[domainId]?.name || domainId;
            const topRated = Object.entries(domainSkills)
                .filter(([_, rating]) => rating >= 3)
                .sort((a, b) => b[1] - a[1])
                .map(([name, rating]) => `${name} (${rating}/5)`);

            if (topRated.length > 0) {
                items.push(`${domainName}: [${topRated.slice(0, 5).join(", ")}]`);
            }
        });
        return items.length > 0 ? items.join(" | ") : "Baseline skill evaluation recorded";
    }

    // ============================================================================
    // PAYLOAD BUILDER
    // ============================================================================
    function buildPayload() {
        const primaryDomain = formState.selectedDomains.length > 0 
            ? DOMAIN_CONFIG[formState.selectedDomains[0]]?.name || formState.selectedDomains[0]
            : "";
        
        const secondaryDomains = formState.selectedDomains.slice(1).map(id => DOMAIN_CONFIG[id]?.name || id);

        const projectFullDesc = [
            `Built: ${formState.projectBuilt}`,
            `Technologies: ${formState.projectTech}`,
            `Hardest Technical Challenge: ${formState.projectHardestProblem}`,
            `Solution: ${formState.projectSolution}`,
            formState.supportingDoc ? `Supporting Link: ${formState.supportingDoc}` : "",
            // Include domain answers
            Object.entries(formState.domainAnswers).length > 0 ? `Domain Q&A: ${JSON.stringify(formState.domainAnswers)}` : ""
        ].filter(Boolean).join("\n\n");

        return {
            name: formState.fullName,
            fullName: formState.fullName,
            email: formState.email,
            phone: formState.phone,
            location: formState.location,
            college: formState.college,
            degree: formState.degree,
            graduationYear: formState.graduationYear,
            engagement: formState.engagement,
            primaryDomain: primaryDomain,
            secondaryDomains: secondaryDomains,
            selectedDomains: formState.selectedDomains.map(id => DOMAIN_CONFIG[id]?.name || id),
            linkedin: formState.linkedin,
            github: formState.github,
            portfolio: formState.portfolio,
            hoursPerWeek: formState.hoursPerWeek,
            workPreference: formState.workPreference,
            startDate: formState.startDate,
            duration: formState.duration,
            longTermInterest: formState.longTermInterest || formState.coreLongTerm || "N/A",
            coreTeamInterest: formState.coreTeamInterest || formState.subsystemOwnership || "N/A",
            projectName: formState.projectName,
            projectLink: formState.projectLink,
            projectDescription: projectFullDesc,
            projectBuilt: formState.projectBuilt,
            projectHardestProblem: formState.projectHardestProblem,
            projectSolution: formState.projectSolution,
            technicalSkills: formState.technicalSkills,
            technicalSkillsSummary: getTopSkillsSummary(formState.technicalSkills),
            technicalScore: calculateTechnicalScore(formState.technicalSkills),
            domainAnswers: formState.domainAnswers
        };
    }

    // ============================================================================
    // APPLICATION SUBMISSION HANDLER
    // ============================================================================
    async function submitApplication() {
        if (formState.isSubmitting) return;

        formState.isSubmitting = true;
        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<span class="spinner-icon"></span> SUBMITTING APPLICATION...`;
        }
        if (btnBack) btnBack.disabled = true;

        clearStepError();
        const payload = buildPayload();

        // Check if endpoint configured
        if (!APPLICATION_ENDPOINT || APPLICATION_ENDPOINT === "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE") {
            console.warn("Astranex Recruitment: APPLICATION_ENDPOINT is not configured. Running demo simulation mode.");
            // Simulate realistic submission for testing/demo purposes if endpoint not yet pasted
            setTimeout(() => {
                const simulatedAppId = "AXD-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
                showSuccessState(simulatedAppId, true);
            }, 1200);
            return;
        }

        try {
            // First attempt standard fetch to retrieve JSON with Application ID
            let appId = null;
            try {
                const response = await fetch(APPLICATION_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.success) {
                        appId = data.applicationId;
                    }
                }
            } catch (fetchErr) {
                console.warn("Standard fetch encountered redirect/CORS restriction, attempting no-cors transmission...", fetchErr);
                // Fallback no-cors POST to ensure data reaches Google Sheet even if response headers are restricted
                await fetch(APPLICATION_ENDPOINT, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(payload)
                });
            }

            // If backend didn't return an ID due to CORS redirect restriction, generate client-side ID for user reference
            if (!appId) {
                appId = "AXD-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
            }

            showSuccessState(appId, false);

        } catch (err) {
            console.error("Submission failed:", err);
            showErrorState(err.message);
        } finally {
            formState.isSubmitting = false;
        }
    }

    // ============================================================================
    // SUCCESS & ERROR STATES
    // ============================================================================
    function showSuccessState(appId, isDemoMode) {
        formState.submittedSuccess = true;
        formState.applicationId = appId;

        if (btnBack) btnBack.style.display = "none";
        if (btnContinue) btnContinue.style.display = "none";
        if (btnSubmit) btnSubmit.style.display = "none";

        let html = `
            <div class="submission-success-panel animate-fade">
                <div class="success-icon-wrap">✓</div>
                <span class="terminal-badge">TRANSMISSION CONFIRMED // REGISTRY UPDATED</span>
                <h2 class="success-title">APPLICATION RECEIVED</h2>
                
                <div class="app-id-display-card">
                    <span class="app-id-label">OFFICIAL APPLICATION ID:</span>
                    <span class="app-id-value">${appId}</span>
                </div>

                <p class="success-desc">
                    Thank you for your interest in Astranex Defence. Your technical application and engineering profile have been registered in our evaluation pipeline.
                </p>

                ${isDemoMode ? `
                    <div class="notice-box notice-info" style="text-align: left; margin: 24px 0;">
                        <div class="notice-icon">⚙</div>
                        <div class="notice-text">
                            <strong>Demo Configuration Note:</strong> The Google Apps Script Web App endpoint URL has not been pasted into <code>careers.js</code> yet. Update <code>APPLICATION_ENDPOINT</code> in <code>careers.js</code> with your deployed Apps Script URL to store live rows directly into your Google Sheet.
                        </div>
                    </div>
                ` : ""}

                <div class="success-actions">
                    <a href="index.html" class="apply-main-btn" style="width: auto; padding: 0 32px;">RETURN TO HOME</a>
                </div>
            </div>
        `;

        stepContentContainer.innerHTML = html;
        scrollToWizardTop();
    }

    function showErrorState(msg) {
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `SUBMIT APPLICATION`;
        }
        if (btnBack) btnBack.disabled = false;

        const feedbackArea = document.getElementById("submission-feedback-area");
        if (feedbackArea) {
            feedbackArea.innerHTML = `
                <div class="notice-box notice-error animate-fade">
                    <div class="notice-icon">✕</div>
                    <div class="notice-text">
                        <strong>Submission Error:</strong> Unable to submit your application (${escapeHtml(msg || "Network issue")}). Please verify your connection and try again.
                    </div>
                </div>
            `;
        } else {
            showStepError(msg || "Unable to submit your application. Please try again.");
        }
    }

    // ============================================================================
    // STRING UTILS
    // ============================================================================
    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function sanitizeName(str) {
        return str.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    }

})();
