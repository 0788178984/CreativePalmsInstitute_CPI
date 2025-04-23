// Notice Details JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get notice ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const noticeId = urlParams.get('id');
    
    if (!noticeId) {
        displayError('No notice ID provided');
        return;
    }
    
    // Fetch notice details
    fetchNoticeDetails(noticeId);
    
    // Fetch related notices
    fetchRelatedNotices(noticeId);
});

/**
 * Fetch notice details from API
 * @param {string} noticeId - The ID of the notice to fetch
 */
function fetchNoticeDetails(noticeId) {
    // Show loading state
    document.getElementById('notice-details-container').innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-3">Loading notice details...</p></div>';
    
    // In a real implementation, this would be an API call
    // For demo purposes, we'll simulate with timeout and sample data
    setTimeout(() => {
        // Simulate successful API response
        const noticeData = {
            id: noticeId,
            title: "Important Announcement Regarding Semester Registration",
            date: "2023-08-15",
            author: "Academic Affairs",
            category: "Important",
            tags: ["Registration", "Academic", "Deadlines"],
            content: `<p>Dear Students,</p>
                <p>This is to inform all students that the registration for the Fall 2023 semester will begin on September 1, 2023. All students are required to complete their registration by September 15, 2023.</p>
                <p>Please note the following important points:</p>
                <ul>
                    <li>Clear all outstanding dues before registration</li>
                    <li>Update your profile information in the student portal</li>
                    <li>Meet with your academic advisor to plan your courses</li>
                    <li>Registration after the deadline will incur a late fee</li>
                </ul>
                <p>For any queries, please contact the Registrar's Office.</p>
                <p>Thank you for your cooperation.</p>`,
            attachments: [
                { name: "Registration_Form.pdf", size: "245 KB", type: "pdf" },
                { name: "Academic_Calendar.pdf", size: "320 KB", type: "pdf" },
                { name: "Fee_Structure.xlsx", size: "178 KB", type: "excel" }
            ]
        };
        
        displayNoticeDetails(noticeData);
    }, 1000);
}

/**
 * Display notice details in the DOM
 * @param {Object} notice - The notice data to display
 */
function displayNoticeDetails(notice) {
    const container = document.getElementById('notice-details-container');
    
    // Create HTML for notice details
    let html = `
        <div class="notice-details-header">
            <div class="notice-details-meta">
                <span class="notice-details-tag ${notice.category.toLowerCase()}">${notice.category}</span>
                ${notice.tags.map(tag => `<span class="notice-details-tag">${tag}</span>`).join('')}
                <span class="notice-details-date"><i class="fas fa-calendar-alt"></i> ${formatDate(notice.date)}</span>
                <span class="notice-details-author"><i class="fas fa-user"></i> ${notice.author}</span>
            </div>
            <h1 class="notice-details-title">${notice.title}</h1>
        </div>
        
        <div class="notice-details-content">
            ${notice.content}
        </div>
    `;
    
    // Add attachments if any
    if (notice.attachments && notice.attachments.length > 0) {
        html += `
            <div class="notice-details-attachments">
                <h4><i class="fas fa-paperclip"></i> Attachments</h4>
                <div class="attachment-list">
                    ${notice.attachments.map(attachment => `
                        <div class="attachment-item">
                            <i class="fas ${getFileIcon(attachment.type)}"></i>
                            <span class="attachment-name">${attachment.name}</span>
                            <span class="attachment-size">${attachment.size}</span>
                            <a href="#" class="attachment-download">Download <i class="fas fa-download"></i></a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Add footer actions
    html += `
        <div class="notice-details-footer">
            <div class="notice-details-actions">
                <a href="#" onclick="printNotice(event)"><i class="fas fa-print"></i> Print</a>
                <a href="#" onclick="shareNotice(event)"><i class="fas fa-share-alt"></i> Share</a>
                <a href="notices.html"><i class="fas fa-arrow-left"></i> Back to Notices</a>
            </div>
        </div>
    `;
    
    // Update container with HTML
    container.innerHTML = html;
}

/**
 * Fetch related notices from API
 * @param {string} noticeId - The ID of the current notice
 */
function fetchRelatedNotices(noticeId) {
    const container = document.getElementById('related-notices');
    
    // Show loading state
    container.innerHTML = '<div class="text-center p-3"><div class="spinner-border spinner-border-sm text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
    
    // In a real implementation, this would be an API call
    // For demo purposes, we'll simulate with timeout and sample data
    setTimeout(() => {
        // Simulate successful API response
        const relatedNotices = [
            {
                id: "124",
                title: "Semester Registration Fee Structure",
                date: "2023-08-10",
                category: "Academic"
            },
            {
                id: "125",
                title: "Important Changes to Registration Process",
                date: "2023-08-05",
                category: "Important"
            },
            {
                id: "126",
                title: "Academic Calendar for Fall 2023",
                date: "2023-07-25",
                category: "Academic"
            }
        ];
        
        displayRelatedNotices(relatedNotices);
    }, 1500);
}

/**
 * Display related notices in the DOM
 * @param {Array} notices - List of related notices
 */
function displayRelatedNotices(notices) {
    const container = document.getElementById('related-notices');
    
    if (!notices || notices.length === 0) {
        container.innerHTML = '<p class="text-muted">No related notices found</p>';
        return;
    }
    
    let html = '';
    
    notices.forEach(notice => {
        html += `
            <div class="related-notice-item">
                <span class="related-notice-date"><i class="fas fa-calendar-alt"></i> ${formatDate(notice.date)}</span>
                <h4 class="related-notice-title">
                    <a href="notice-details.html?id=${notice.id}">${notice.title}</a>
                </h4>
                <span class="notice-details-tag ${notice.category.toLowerCase()}">${notice.category}</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function displayError(message) {
    const container = document.getElementById('notice-details-container');
    
    container.innerHTML = `
        <div class="notice-error-container">
            <i class="fas fa-exclamation-circle"></i>
            <h2>Notice Not Found</h2>
            <p>${message || 'The requested notice could not be found. It may have been removed or you may have followed an incorrect link.'}</p>
            <a href="notices.html" class="btn btn-primary">Go to Notices</a>
        </div>
    `;
}

/**
 * Format date to readable format
 * @param {string} dateString - Date string to format
 * @return {string} Formatted date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get icon class based on file type
 * @param {string} fileType - Type of file
 * @return {string} Icon class
 */
function getFileIcon(fileType) {
    switch(fileType.toLowerCase()) {
        case 'pdf':
            return 'fa-file-pdf';
        case 'doc':
        case 'docx':
            return 'fa-file-word';
        case 'xls':
        case 'xlsx':
        case 'excel':
            return 'fa-file-excel';
        case 'ppt':
        case 'pptx':
            return 'fa-file-powerpoint';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'fa-file-image';
        case 'zip':
        case 'rar':
            return 'fa-file-archive';
        default:
            return 'fa-file';
    }
}

/**
 * Print the notice
 * @param {Event} e - Click event
 */
function printNotice(e) {
    e.preventDefault();
    window.print();
}

/**
 * Share the notice
 * @param {Event} e - Click event
 */
function shareNotice(e) {
    e.preventDefault();
    
    // If Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: document.querySelector('.notice-details-title').textContent,
            url: window.location.href
        })
        .catch(err => {
            console.error('Error sharing:', err);
        });
    } else {
        // Fallback - copy to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    }
} 