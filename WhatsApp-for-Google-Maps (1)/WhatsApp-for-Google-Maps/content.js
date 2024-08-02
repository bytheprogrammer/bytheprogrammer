const addWhatsAppIcons = () => {
    const phoneElements = document.querySelectorAll('button[data-tooltip="Telefon numarasını kopyala"]');

    phoneElements.forEach(phoneElement => {
        const phoneContainer = phoneElement.closest('div');
        if (!phoneContainer) return;

        // Numara metnini al
        const phoneNumberText = phoneContainer.textContent.trim();

        // Numara metnini rakamlara çevir
        let phoneNumber = phoneNumberText.replace(/[^0-9]/g, '');

        // Eğer numara 10 haneli ise (Türkiye için), ülke kodunu ekle
        if (phoneNumber.length === 10) {
            phoneNumber = '+90' + phoneNumber;
        } else if (phoneNumber.length === 11 && phoneNumber.startsWith('0')) {
            phoneNumber = '+90' + phoneNumber.slice(1);
        }

        // Numara formatını kontrol et
        if (!phoneNumber.startsWith('+')) {
            console.error('Geçersiz numara formatı:', phoneNumber);
            return;
        }

        // Daha önce eklenmiş bir simge olup olmadığını kontrol et
        if (phoneContainer.querySelector('.whatsapp-icon')) return;

        const whatsappIcon = document.createElement('img');
        whatsappIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png';
        whatsappIcon.style.cursor = 'pointer';
        whatsappIcon.style.width = '24px';
        whatsappIcon.style.height = '24px';
        whatsappIcon.style.verticalAlign = 'middle';
        whatsappIcon.style.marginLeft = '180px'; // Numaranın hemen yanında
        whatsappIcon.style.zIndex = '1000'; // İkonu diğer elementlerin üstünde tutar
        whatsappIcon.style.position = 'relative'; // Z-index etkili olsun diye
        whatsappIcon.style.pointerEvents = 'auto'; // Tıklanabilir olması için

        whatsappIcon.alt = 'WhatsApp';
        whatsappIcon.className = 'whatsapp-icon';

        whatsappIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Diğer click olaylarını engeller
            window.open(`https://wa.me/${phoneNumber}`, '_blank'); // WhatsApp sohbeti başlatır
        });

        // Telefon numarasının hemen yanına ikonu ekle
        const phoneTextElement = phoneContainer.querySelector('div');
        if (phoneTextElement) {
            phoneTextElement.style.display = 'flex';
            phoneTextElement.style.alignItems = 'center';
            phoneTextElement.appendChild(whatsappIcon);
        }

        // Diğer butonları gizle
        const otherButtons = phoneContainer.querySelectorAll('button:not([data-tooltip="Telefon numarasını kopyala"])');
        otherButtons.forEach(button => {
            button.style.display = 'none';
        });
    });
};

// MutationObserver kurulumu
const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            addWhatsAppIcons();
            break;
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Sayfa yüklendiğinde de çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWhatsAppIcons);
} else {
    addWhatsAppIcons();
}
