document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. TYPING EFFECT
    ========================================== */
    const roles = [
        "Building AI-powered software for real businesses.",
        "Python Developer",
        "AI Automation Builder",
        "Future Machine Learning Engineer",
        "AI & Data Science Student"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typing = document.getElementById("typing");

    function typeEffect() {
        if (!typing) return;
        const current = roles[roleIndex];

        if (!deleting) {
            typing.textContent = current.substring(0, charIndex++);
        } else {
            typing.textContent = current.substring(0, charIndex--);
        }

        let speed = deleting ? 40 : 80;

        if (!deleting && charIndex === current.length + 1) {
            deleting = true;
            speed = 1400;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();


    /* ==========================================
       2. FEATURE 4: SCI-FI WEB AUDIO API
    ========================================== */
    let soundEnabled = true;
    const audioToggleBtn = document.getElementById("audioToggleBtn");

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            audioToggleBtn.textContent = soundEnabled ? "🔊" : "🔇";
        });
    }

    function playSciFiBeep(freq = 600, duration = 0.03) {
        if (!soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context blocked until interaction
        }
    }

    document.querySelectorAll(".btn, .btn-outline, .suggestion-chip, .preset-btn, .social-card").forEach(el => {
        el.addEventListener("mouseenter", () => playSciFiBeep(900, 0.02));
        el.addEventListener("click", () => playSciFiBeep(450, 0.05));
    });


    /* ==========================================
       3. FEATURE 2: ACCENT COLOR SWITCHER
    ========================================== */
    const themeDots = document.querySelectorAll(".theme-dot");
    themeDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const color = dot.getAttribute("data-color");
            document.documentElement.style.setProperty("--accent-color", color);
            playSciFiBeep(1200, 0.04);
        });
    });


    /* ==========================================
       4. FEATURE 3: MATRIX RAIN EASTER EGG TOGGLE
    ========================================== */
    const matrixCanvas = document.getElementById("matrixCanvas");
    const matrixToggleBtn = document.getElementById("matrixToggleBtn");
    let matrixActive = false;
    let matrixInterval = null;

    if (matrixToggleBtn && matrixCanvas) {
        matrixToggleBtn.addEventListener("click", () => {
            matrixActive = !matrixActive;
            matrixCanvas.classList.toggle("active", matrixActive);
            matrixToggleBtn.style.borderColor = matrixActive ? "#22C55E" : "";

            if (matrixActive) {
                startMatrixRain();
            } else {
                clearInterval(matrixInterval);
                const ctx = matrixCanvas.getContext("2d");
                ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            }
        });
    }

    function startMatrixRain() {
        const ctx = matrixCanvas.getContext("2d");
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const katakana = "AIENGINEERPYTHONJAVASCRIPT0101JINESH";
        const alphabet = katakana.split("");
        const fontSize = 16;
        const columns = matrixCanvas.width / fontSize;
        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        matrixInterval = setInterval(() => {
            ctx.fillStyle = "rgba(7, 11, 22, 0.08)";
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = "#22C55E";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet[Math.floor(Math.random() * alphabet.length)];
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }, 30);
    }


    /* ==========================================
       5. FEATURE 1: AI MINI-PLAYGROUND SIMULATOR
    ========================================== */
    const playgroundScreen = document.getElementById("playgroundScreen");
    const playgroundInput = document.getElementById("playgroundInput");
    const playgroundRunBtn = document.getElementById("playgroundRunBtn");
    const presetBtns = document.querySelectorAll(".preset-btn");

    function simulateAIResponse(query) {
        if (!playgroundScreen) return;
        playgroundScreen.innerHTML = `<span class="terminal-prompt">&gt; Processing query: "${query}"...</span><br><br>`;

        const responses = {
            "what is jinesh's core tech stack?": "MODEL OUTPUT:\n- Languages: Python, Java, JavaScript, HTML5, CSS3, SQL\n- Databases: MySQL, JSON Storage, Google Sheets DB\n- Tools & Automation: Git, GitHub, VS Code, Node-RED, Google Apps Script, REST APIs, WhatsApp Cloud API.",
            "explain expense tracker ai features": "MODEL OUTPUT:\n- Full-stack Python & MySQL application.\n- Features: Secure user authentication, income & expense tracking, monthly budget planning, category breakdown, and AI spending assistant roadmap.",
            "what are jinesh's career goals?": "MODEL OUTPUT:\n- Pursuing B.Tech in Artificial Intelligence & Data Science at AISSMS IOIT, Pune (2026-2030).\n- Passionate about becoming an expert AI Engineer, building autonomous AI agents, and scaling real-world business automation tools."
        };

        const key = query.toLowerCase().trim();
        let answer = responses[key] || `MODEL OUTPUT:\nAnalyzed query "${query}". Jinesh is an AI & DS engineering student at AISSMS IOIT specializing in Python automation, intelligent software, and full-stack development.`;

        let i = 0;
        function typeStream() {
            if (i < answer.length) {
                playgroundScreen.innerHTML += answer.charAt(i);
                i++;
                setTimeout(typeStream, 15);
                playgroundScreen.scrollTop = playgroundScreen.scrollHeight;
            }
        }
        setTimeout(typeStream, 400);
    }

    if (playgroundRunBtn && playgroundInput) {
        playgroundRunBtn.addEventListener("click", () => {
            if (playgroundInput.value.trim()) {
                simulateAIResponse(playgroundInput.value);
                playgroundInput.value = "";
            }
        });
        playgroundInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && playgroundInput.value.trim()) {
                simulateAIResponse(playgroundInput.value);
                playgroundInput.value = "";
            }
        });
    }

    presetBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const prompt = btn.getAttribute("data-prompt");
            if (playgroundInput) playgroundInput.value = prompt;
            simulateAIResponse(prompt);
        });
    });


    /* ==========================================
       SPOTLIGHT EFFECT
    ========================================== */
    const spotlight = document.querySelector(".spotlight");
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateSpotlight(){
        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;
        if(spotlight){
            spotlight.style.left = currentX + "px";
            spotlight.style.top = currentY + "px";
        }
        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();


    /* ==========================================
       ANIMATED COUNTERS
    ========================================== */
    const counters = document.querySelectorAll(".stat-card h1");
    const counterObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const counter = entry.target;
                const target = +counter.dataset.target;
                let count = 0;
                const speed = target / 80;

                function updateCounter(){
                    if(count < target){
                        count += speed;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    }else{
                        counter.innerText = target;
                    }
                }
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    counters.forEach(counter => counterObserver.observe(counter));


    /* ==========================================
       PROJECT POPUP MODAL
    ========================================== */
    const projects = {
        expense:{
            title:"Expense Tracker AI",
            category:"PYTHON PROJECT",
            image:"assets/projects/expense-tracker.png",
            github:"https://github.com/JineshShingvi0/ai-expense-tracker-python-mysql",
            demo:"https://ai-expense-manager-u5yp.onrender.com",
            description:"AI-powered finance management platform with income, expenses, budgets, reports and future AI assistant integration.",
            tech:["Python","MySQL","AI","Analytics"],
            features:["Track income and expenses.", "Monthly budget planning.", "Expense categories.", "Financial reports dashboard.", "AI spending assistant."]
        },
        billing:{
            title:"Shingvi Supermart Billing Software",
            category:"BUSINESS SOFTWARE",
            image:"assets/projects/billing.png",
            github:"https://github.com/JineshShingvi0/python-mysql-inventory-management-gui",
            demo:"#",
            description:"Retail billing platform with customer management, WhatsApp reminders, loyalty points, inventory and GST billing.",
            tech:["Google Apps Script","Google Sheets","WhatsApp API"],
            features:["Customer phone lookup.", "Loyalty points.", "Oil refill reminders.", "Inventory management.", "GST invoice generation."]
        },
        cake:{
            title:"Soft & Sweet Cake Shop Website",
            category:"WEB PROJECT",
            image:"assets/projects/cake-shop.png",
            github:"https://github.com/YOUR_USERNAME/cake-shop-website",
            demo:"https://softandsweetcakeshopee.netlify.app",
            description:"Responsive cake ordering website with WhatsApp ordering, product catalog and customer feedback system.",
            tech:["HTML","CSS","JavaScript"],
            features:["Responsive design.", "WhatsApp ordering.", "Cake catalog.", "Feedback section.", "Modern UI."]
        },
        node:{
            title:"Node-RED Automation Hub",
            category:"AUTOMATION PROJECT",
            image:"assets/projects/node-red.png",
            github:"https://github.com/YOUR_USERNAME/node-red-projects",
            demo:"#",
            description:"Collection of Node-RED automations including weather alerts, WhatsApp chatbot, PDF monitor and bulk emails.",
            tech:["Node-RED","JavaScript","Automation"],
            features:["WhatsApp chatbot.", "Weather alerts.", "PDF monitoring.", "Bulk email automation.", "IoT workflows."]
        },
        student:{
            title:"Student Result Management System",
            category:"PYTHON PROJECT",
            image:"assets/projects/student-system.png",
            github:"https://github.com/JineshShingvi0/student-management-system-python-mysql",
            demo:"#",
            description:"Python console application with CRUD operations, JSON storage and automatic result calculation.",
            tech:["Python","JSON","OOP"],
            features:["Add/Edit/Delete students.", "Search student.", "Result calculation.", "JSON database.", "Menu driven interface."]
        }
    };

    const modal = document.getElementById("projectModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    const modalTech = document.getElementById("modalTech");
    const modalFeatures = document.getElementById("modalFeatures");

    document.querySelectorAll(".view-project").forEach(button=>{
        button.addEventListener("click",()=>{
            const project = projects[button.dataset.project];
            const githubBtn = document.querySelector(".github-btn");
            const demoBtn = document.querySelector(".demo-btn");

            if(githubBtn) githubBtn.href = project.github;
            if(demoBtn) demoBtn.href = project.demo;
            if(modal) modal.classList.add("active");
            document.body.style.overflow = "hidden";

            if(modalImage) modalImage.src = project.image;
            if(modalTitle) modalTitle.innerText = project.title;
            if(modalCategory) modalCategory.innerText = project.category;
            if(modalDescription) modalDescription.innerText = project.description;

            if(modalTech){
                modalTech.innerHTML = "";
                project.tech.forEach(item => { modalTech.innerHTML += `<span>${item}</span>`; });
            }
            if(modalFeatures){
                modalFeatures.innerHTML = "";
                project.features.forEach(feature => { modalFeatures.innerHTML += `<li>${feature}</li>`; });
            }
        });
    });

    const closeModalBtn = document.querySelector(".close-modal");
    if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if(modal) modal.addEventListener("click",(e)=>{ if(e.target === modal) closeModal(); });

    function closeModal(){
        if(modal) modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }


    /* ==========================================
       JOURNEY TIMELINE SCROLL FILL
    ========================================== */
    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelineLine = document.querySelector(".timeline-line");

    function revealTimeline() {
        timelineItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.classList.add("show");
            }
        });

        const timeline = document.querySelector(".timeline");
        if(timeline && timelineLine){
            const rect = timeline.getBoundingClientRect();
            const totalHeight = timeline.offsetHeight;
            const scrollDistance = (window.innerHeight * 0.4) - rect.top;
            const progress = Math.min(Math.max(scrollDistance / totalHeight, 0), 1);
            timelineLine.style.setProperty("--timelineFill", `${progress * 100}%`);
        }
    }
    window.addEventListener("scroll", revealTimeline);
    window.addEventListener("load", revealTimeline);


    /* ==========================================
       GITHUB HEATMAP GRID
    ========================================== */
    const githubGrid = document.getElementById("githubGrid");
    if (githubGrid) {
        for (let i = 0; i < 240; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            const random = Math.random();
            if (random > 0.75) square.classList.add("active4");
            else if (random > 0.55) square.classList.add("active3");
            else if (random > 0.35) square.classList.add("active2");
            else if (random > 0.2) square.classList.add("active1");
            githubGrid.appendChild(square);
        }
    }


    /* ==========================================
       CONTACT FORM REDIRECT
    ========================================== */
    const contactForm = document.getElementById("contactForm");
    if(contactForm){
        contactForm.addEventListener("submit",function(e){
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`;
            window.location.href = `mailto:jineshshingvi2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }


    /* ==========================================
       AI ASSISTANT CHATBOT LOGIC
    ========================================== */
    const aiOrbBtn = document.getElementById("aiOrbBtn");
    const aiChatWindow = document.getElementById("aiChatWindow");
    const aiCloseBtn = document.getElementById("aiCloseBtn");
    const aiChatBody = document.getElementById("aiChatBody");
    const aiUserInput = document.getElementById("aiUserInput");
    const aiSendBtn = document.getElementById("aiSendBtn");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");

    if (aiOrbBtn) {
        aiOrbBtn.addEventListener("click", () => {
            aiChatWindow.classList.toggle("active");
            if (aiChatWindow.classList.contains("active")) aiUserInput.focus();
        });
    }

    if (aiCloseBtn) {
        aiCloseBtn.addEventListener("click", () => aiChatWindow.classList.remove("active"));
    }

    function getAIResponse(query) {
        const q = query.toLowerCase();
        if (q.includes("expense") || q.includes("tracker")) return "💰 **Expense Tracker AI**: Python & MySQL application built by Jinesh featuring income/expense management, budgets, and categories.";
        if (q.includes("billing") || q.includes("supermart")) return "🛒 **Shingvi Supermart Billing**: Retail automation software with GST invoicing, WhatsApp reminders, and customer databases.";
        if (q.includes("node") || q.includes("automation")) return "⚙️ **Node-RED Automation Hub**: Automations for weather alerts, WhatsApp chatbots, and email triggers.";
        if (q.includes("education") || q.includes("college") || q.includes("aissms")) return "🎓 **Education**: First-year B.Tech in AI & Data Science at AISSMS IOIT, Pune (2026–2030).";
        if (q.includes("contact") || q.includes("email")) return "📬 Reach Jinesh at **jineshshingvi2@gmail.com** or via LinkedIn!";
        return "Jinesh is an AI & DS student at AISSMS IOIT building practical Python software, automation tools, and AI agents. Feel free to ask about his projects!";
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("ai-message", sender === "user" ? "user-message" : "bot-message");
        msgDiv.innerHTML = `<p>${text}</p>`;
        aiChatBody.appendChild(msgDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }

    function handleUserMessage() {
        const text = aiUserInput.value.trim();
        if (!text) return;
        appendMessage(text, "user");
        aiUserInput.value = "";

        setTimeout(() => {
            const reply = getAIResponse(text);
            appendMessage(reply, "bot");
        }, 600);
    }

    if (aiSendBtn) aiSendBtn.addEventListener("click", handleUserMessage);
    if (aiUserInput) aiUserInput.addEventListener("keypress", (e) => { if (e.key === "Enter") handleUserMessage(); });
    suggestionChips.forEach(chip => {
        chip.addEventListener("click", () => {
            aiUserInput.value = chip.getAttribute("data-query");
            handleUserMessage();
        });
    });
});