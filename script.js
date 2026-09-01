// ========================================
// TOOLNEST JAVASCRIPT
// ========================================


// THEME

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("toolnest-theme") === "dark") {

    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.textContent = "☀";
    }
}

if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            themeBtn.textContent = "☀";

            localStorage.setItem(
                "toolnest-theme",
                "dark"
            );

        } else {

            themeBtn.textContent = "☾";

            localStorage.setItem(
                "toolnest-theme",
                "light"
            );
        }
    });
}


// SEARCH

const searchInput =
    document.getElementById("heroSearch");

const searchBtn =
    document.getElementById("searchBtn");


function searchTools() {

    if (!searchInput) return;

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    const cards =
        document.querySelectorAll(".tool-card");

    const noResults =
        document.getElementById("noResults");

    let found = 0;


    cards.forEach(function (card) {

        const searchableText =
            (
                card.dataset.name ||
                card.textContent
            ).toLowerCase();


        if (
            query === "" ||
            searchableText.includes(query)
        ) {

            card.classList.remove("hide");

            found++;

        } else {

            card.classList.add("hide");
        }
    });


    if (noResults) {

        noResults.style.display =
            found === 0
                ? "block"
                : "none";
    }
}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchTools
    );
}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                searchTools();
            }
        }
    );
}


// QUICK SEARCH

document
    .querySelectorAll(".quick-links button")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (!searchInput) return;

                searchInput.value =
                    button.dataset.search;

                searchTools();

                document
                    .getElementById("tools")
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );
    });


// FILTERS

document
    .querySelectorAll(".filter")
    .forEach(function (filter) {

        filter.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter")
                    .forEach(function (button) {

                        button.classList.remove(
                            "active"
                        );
                    });


                filter.classList.add("active");


                const selected =
                    filter.dataset.filter;


                const cards =
                    document.querySelectorAll(
                        ".tool-card"
                    );

                let visible = 0;


                cards.forEach(function (card) {

                    const category =
                        card.dataset.category;


                    if (
                        selected === "all" ||
                        category === selected
                    ) {

                        card.classList.remove(
                            "hide"
                        );

                        visible++;

                    } else {

                        card.classList.add(
                            "hide"
                        );
                    }
                });


                const noResults =
                    document.getElementById(
                        "noResults"
                    );


                if (noResults) {

                    noResults.style.display =
                        visible === 0
                            ? "block"
                            : "none";
                }
            }
        );
    });


// MODAL

const modal =
    document.getElementById("toolModal");

const closeModal =
    document.getElementById("closeModal");

const toolInterface =
    document.getElementById("toolInterface");


function openModal() {

    if (modal) {
        modal.classList.add("active");
    }
}


function closeToolModal() {

    if (modal) {
        modal.classList.remove("active");
    }
}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeToolModal
    );
}


if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                closeToolModal();
            }
        }
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeToolModal();
        }
    }
);


// OPEN TOOLS

document
    .querySelectorAll(".open-tool")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                openTool(
                    button.dataset.tool
                );
            }
        );
    });


function openTool(tool) {

    if (!toolInterface) return;

    openModal();


    // WORD COUNTER

    if (tool === "counter") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Word Counter</h2>

                <p>
                    Count words, characters and sentences.
                </p>

                <textarea
                    id="counterText"
                    placeholder="Type or paste your text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="countWords()">
                    Count Words
                </button>

                <div
                    class="result"
                    id="counterResult">
                    Your result will appear here.
                </div>

            </div>
        `;
    }


    // PASSWORD GENERATOR

    else if (tool === "password") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Password Generator</h2>

                <p>
                    Generate a strong random password.
                </p>

                <input
                    type="number"
                    id="passwordLength"
                    value="16"
                    min="6"
                    max="50"
                >

                <button
                    class="tool-button"
                    onclick="generatePassword()">
                    Generate Password
                </button>

                <div
                    class="result"
                    id="passwordResult">
                    Your password will appear here.
                </div>

            </div>
        `;
    }


    // JSON FORMATTER

    else if (tool === "json") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>JSON Formatter</h2>

                <p>
                    Format and validate JSON.
                </p>

                <textarea
                    id="jsonInput"
                    placeholder='{"name":"ToolNest"}'
                ></textarea>

                <button
                    class="tool-button"
                    onclick="formatJSON()">
                    Format JSON
                </button>

                <div class="result">
                    <pre id="jsonResult">
Result will appear here.
                    </pre>
                </div>

            </div>
        `;
    }


    // BASE64

    else if (tool === "base64") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Base64 Encoder / Decoder</h2>

                <p>
                    Encode or decode Base64 text.
                </p>

                <textarea
                    id="base64Input"
                    placeholder="Enter your text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="encodeBase64()">
                    Encode
                </button>

                <button
                    class="tool-button"
                    onclick="decodeBase64()">
                    Decode
                </button>

                <div
                    class="result"
                    id="base64Result">
                    Result will appear here.
                </div>

            </div>
        `;
    }


    // CASE CONVERTER

    else if (tool === "case") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Case Converter</h2>

                <p>
                    Convert text between uppercase and lowercase.
                </p>

                <textarea
                    id="caseInput"
                    placeholder="Enter your text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="upperCase()">
                    UPPERCASE
                </button>

                <button
                    class="tool-button"
                    onclick="lowerCase()">
                    lowercase
                </button>

                <div
                    class="result"
                    id="caseResult">
                    Result will appear here.
                </div>

            </div>
        `;
    }


    // META TAG GENERATOR

    else if (tool === "meta") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Meta Tag Generator</h2>

                <p>
                    Generate basic SEO meta tags.
                </p>

                <input
                    id="metaTitle"
                    placeholder="Website title"
                >

                <textarea
                    id="metaDescription"
                    placeholder="Website description"
                ></textarea>

                <button
                    class="tool-button"
                    onclick="generateMeta()">
                    Generate Tags
                </button>

                <div class="result">

                    <pre id="metaResult">
Result will appear here.
                    </pre>

                </div>

            </div>
        `;
    }


    // URL ENCODER

    else if (tool === "url") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>URL Encoder / Decoder</h2>

                <p>
                    Encode or decode URL text.
                </p>

                <textarea
                    id="urlInput"
                    placeholder="Enter URL or text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="encodeURL()">
                    Encode
                </button>

                <button
                    class="tool-button"
                    onclick="decodeURL()">
                    Decode
                </button>

                <div
                    class="result"
                    id="urlResult">
                    Result will appear here.
                </div>

            </div>
        `;
    }


    // REMOVE SPACES

    else if (tool === "spaces") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Remove Spaces</h2>

                <p>
                    Remove extra spaces from your text.
                </p>

                <textarea
                    id="spacesInput"
                    placeholder="Enter your text..."
                ></textarea>

                <button
                    class="tool-button"
                    onclick="removeSpaces()">
                    Remove Spaces
                </button>

                <div
                    class="result"
                    id="spacesResult">
                    Result will appear here.
                </div>

            </div>
        `;
    }


    // CALCULATOR

    else if (tool === "calculator") {

        toolInterface.innerHTML = `

            <div class="tool-interface">

                <h2>Simple Calculator</h2>

                <p>
                    Perform basic mathematical calculations.
                </p>

                <input
                    id="calcInput"
                    type="text"
                    placeholder="Example: 25 + 10 * 2"
                >

                <button
                    class="tool-button"
                    onclick="calculate()">
                    Calculate
                </button>

                <div
                    class="result"
                    id="calcResult">
                    Result will appear here.
                </div>

            </div>
        `;
    }
}


// WORD COUNTER

function countWords() {

    const input =
        document.getElementById("counterText");

    const result =
        document.getElementById("counterResult");

    if (!input || !result) return;

    const text = input.value;

    const trimmed = text.trim();

    const words =
        trimmed === ""
            ? 0
            : trimmed.split(/\s+/).length;

    const characters =
        text.length;

    const charactersWithoutSpaces =
        text.replace(/\s/g, "").length;

    const sentences =
        trimmed === ""
            ? 0
            : trimmed
                .split(/[.!?]+/)
                .filter(
                    sentence =>
                        sentence.trim() !== ""
                ).length;


    result.innerHTML = `

        <strong>Words:</strong>
        ${words}

        <br>

        <strong>Characters:</strong>
        ${characters}

        <br>

        <strong>Characters without spaces:</strong>
        ${charactersWithoutSpaces}

        <br>

        <strong>Sentences:</strong>
        ${sentences}

    `;
}


// PASSWORD GENERATOR

function generatePassword() {

    const lengthInput =
        document.getElementById(
            "passwordLength"
        );

    const result =
        document.getElementById(
            "passwordResult"
        );

    if (!lengthInput || !result) return;


    let length =
        parseInt(lengthInput.value);


    if (isNaN(length)) {
        length = 16;
    }


    length =
        Math.max(
            6,
            Math.min(50, length)
        );


    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+-=[]{}";


    let password = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        const random =
            Math.floor(
                Math.random() *
                characters.length
            );

        password +=
            characters[random];
    }


    result.textContent =
        password;
}


// JSON FORMATTER

function formatJSON() {

    const input =
        document.getElementById("jsonInput");

    const result =
        document.getElementById("jsonResult");

    if (!input || !result) return;


    try {

        const data =
            JSON.parse(input.value);

        result.textContent =
            JSON.stringify(
                data,
                null,
                4
            );

    }

    catch (error) {

        result.textContent =
            "Invalid JSON. Please check your JSON syntax.";
    }
}


// BASE64 ENCODE

function encodeBase64() {

    const input =
        document.getElementById(
            "base64Input"
        );

    const result =
        document.getElementById(
            "base64Result"
        );

    if (!input || !result) return;


    try {

        const encoded =
            btoa(
                unescape(
                    encodeURIComponent(
                        input.value
                    )
                )
            );

        result.textContent =
            encoded;

    }

    catch (error) {

        result.textContent =
            "Unable to encode text.";
    }
}


// BASE64 DECODE

function decodeBase64() {

    const input =
        document.getElementById(
            "base64Input"
        );

    const result =
        document.getElementById(
            "base64Result"
        );

    if (!input || !result) return;


    try {

        const decoded =
            decodeURIComponent(
                escape(
                    atob(
                        input.value
                    )
                )
            );

        result.textContent =
            decoded;

    }

    catch (error) {

        result.textContent =
            "Invalid Base64 text.";
    }
}


// CASE CONVERTER

function upperCase() {

    const input =
        document.getElementById(
            "caseInput"
        );

    const result =
        document.getElementById(
            "caseResult"
        );

    if (!input || !result) return;

    result.textContent =
        input.value.toUpperCase();
}


function lowerCase() {

    const input =
        document.getElementById(
            "caseInput"
        );

    const result =
        document.getElementById(
            "caseResult"
        );

    if (!input || !result) return;

    result.textContent =
        input.value.toLowerCase();
}


// META TAG GENERATOR

function generateMeta() {

    const title =
        document.getElementById(
            "metaTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "metaDescription"
        ).value.trim();


    const result =
        document.getElementById(
            "metaResult"
        );


    result.textContent =
`<title>${title}</title>

<meta name="description"
content="${description}">

<meta property="og:title"
content="${title}">

<meta property="og:description"
content="${description}">`;
}


// URL ENCODER

function encodeURL() {

    const input =
        document.getElementById(
            "urlInput"
        );

    const result =
        document.getElementById(
            "urlResult"
        );

    if (!input || !result) return;

    result.textContent =
        encodeURIComponent(
            input.value
        );
}


function decodeURL() {

    const input =
        document.getElementById(
            "urlInput"
        );

    const result =
        document.getElementById(
            "urlResult"
        );

    if (!input || !result) return;


    try {

        result.textContent =
            decodeURIComponent(
                input.value
            );

    }

    catch (error) {

        result.textContent =
            "Invalid encoded URL.";
    }
}


// REMOVE SPACES

function removeSpaces() {

    const input =
        document.getElementById(
            "spacesInput"
        );

    const result =
        document.getElementById(
            "spacesResult"
        );

    if (!input || !result) return;


    result.textContent =
        input.value
            .replace(/\s+/g, " ")
            .trim();
}


// CALCULATOR

function calculate() {

    const input =
        document.getElementById(
            "calcInput"
        );

    const result =
        document.getElementById(
            "calcResult"
        );

    if (!input || !result) return;


    try {

        const expression =
            input.value.trim();


        if (
            !/^[0-9+\-*/().%\s]+$/
                .test(expression)
        ) {

            throw new Error(
                "Invalid expression"
            );
        }


        const answer =
            Function(
                `"use strict"; return (${expression})`
            )();


        result.textContent =
            answer;

    }

    catch (error) {

        result.textContent =
            "Invalid calculation.";
    }
}


// MOBILE MENU

const mobileMenu =
    document.getElementById("mobileMenu");

const navLinks =
    document.querySelector(".nav-links");


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function () {

            if (
                navLinks.style.display ===
                "flex"
            ) {

                navLinks.style.display =
                    "none";

            } else {

                navLinks.style.display =
                    "flex";

                navLinks.style.position =
                    "absolute";

                navLinks.style.top =
                    "68px";

                navLinks.style.left =
                    "0";

                navLinks.style.right =
                    "0";

                navLinks.style.padding =
                    "20px";

                navLinks.style.flexDirection =
                    "column";

                navLinks.style.background =
                    "white";

                navLinks.style.borderBottom =
                    "1px solid #e2e8f0";
            }
        }
    );
}