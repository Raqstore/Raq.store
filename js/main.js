const translations = {
  'zh-CN': {
    'title': '兑换店即将上线',
    'subtitle': '安全、高效的跨链兑换服务',
    'launch_date': '预计上线时间',
    'launch_date_value': '2026年6月18日 UTC',
    'contract_address': 'BSC 合约地址',
    'tech_desc': '基于 BNB Chain 的 1:1 跨链兑换',
    'copy_success': '已复制',
    'footer': '© 2026 Raq.Store. All rights reserved.',
    'days': '天',
    'hours': '时',
    'minutes': '分',
    'seconds': '秒'
  },
  'en': {
    'title': 'Exchange Coming Soon',
    'subtitle': 'Secure & Efficient Cross-Chain Exchange Service',
    'launch_date': 'Expected Launch Date',
    'launch_date_value': 'June 18, 2026 UTC',
    'contract_address': 'BSC Contract Address',
    'tech_desc': '1:1 Cross-Chain Exchange on BNB Chain',
    'copy_success': 'Copied',
    'footer': '© 2026 Raq.Store. All rights reserved.',
    'days': 'DAYS',
    'hours': 'HRS',
    'minutes': 'MIN',
    'seconds': 'SEC'
  },
  'zh-TW': {
    'title': '兌換店即將上線',
    'subtitle': '安全、高效的跨鏈兌換服務',
    'launch_date': '預計上線時間',
    'launch_date_value': '2026年6月18日 UTC',
    'contract_address': 'BSC 合約地址',
    'tech_desc': '基於 BNB Chain 的 1:1 跨鏈兌換',
    'copy_success': '已複製',
    'footer': '© 2026 Raq.Store. All rights reserved.',
    'days': '天',
    'hours': '時',
    'minutes': '分',
    'seconds': '秒'
  },
  'ja': {
    'title': '交換所近日公開',
    'subtitle': '安全で効率的なクロスチェーン交換サービス',
    'launch_date': '公開予定日',
    'launch_date_value': '2026年6月18日 UTC',
    'contract_address': 'BSC コントラクトアドレス',
    'tech_desc': 'BNB Chain 上で 1:1 クロスチェーン交換',
    'copy_success': 'コピーしました',
    'footer': '© 2026 Raq.Store. All rights reserved.',
    'days': '日',
    'hours': '時',
    'minutes': '分',
    'seconds': '秒'
  },
  'ru': {
    'title': 'Магазин скоро откроется',
    'subtitle': 'Безопасный и эффективный кросс-чейн обмен',
    'launch_date': 'Ожидаемая дата запуска',
    'launch_date_value': '18 июня 2026 г. UTC',
    'contract_address': 'Адрес контракта BSC',
    'tech_desc': 'Кросс-чейн обмен 1:1 на BNB Chain',
    'copy_success': 'Скопировано',
    'footer': '© 2026 Raq.Store. All rights reserved.',
    'days': 'ДНЕЙ',
    'hours': 'ЧАС',
    'minutes': 'МИН',
    'seconds': 'СЕК'
  },
  'fr': {
    'title': 'Boutique Bientôt Disponible',
    'subtitle': "Service d'échange cross-chain sécurisé et efficace",
    'launch_date': 'Date de lancement prévue',
    'launch_date_value': '18 juin 2026 UTC',
    'contract_address': 'Adresse du contrat BSC',
    'tech_desc': 'Échange cross-chain 1:1 sur BNB Chain',
    'copy_success': 'Copié',
    'footer': '© 2026 Raq.Store. All rights reserved.',
    'days': 'JOURS',
    'hours': 'HEU',
    'minutes': 'MIN',
    'seconds': 'SEC'
  }
};

const languageNames = {
  'zh-CN': '中文',
  'en': 'English',
  'zh-TW': '繁體中文',
  'ja': '日本語',
  'ru': 'Русский',
  'fr': 'Français'
};

const TARGET_DATE = new Date('2026-06-18T00:00:00Z');
const CONTRACT_ADDRESS = '0x1AaA6cCF6C8674408F0Ca0843CB5BA02674B10Fd';

let currentLang = localStorage.getItem('raq-lang') || 'zh-CN';

const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const currentLangSpan = document.getElementById('currentLang');
const countdownDays = document.getElementById('days');
const countdownHours = document.getElementById('hours');
const countdownMinutes = document.getElementById('minutes');
const countdownSeconds = document.getElementById('seconds');
const contractAddressEl = document.getElementById('contractAddress');
const copyTooltip = document.getElementById('copyTooltip');

function setLanguage(lang) {
  if (!translations[lang]) return;
  
  currentLang = lang;
  localStorage.setItem('raq-lang', lang);
  
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.classList.add('lang-changing');
      setTimeout(() => {
        el.textContent = translations[lang][key];
        el.classList.remove('lang-changing');
      }, 150);
    }
  });
  
  currentLangSpan.textContent = languageNames[lang];
  
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

function toggleDropdown() {
  langDropdown.classList.toggle('show');
  langToggle.classList.toggle('active');
}

function closeDropdown() {
  langDropdown.classList.remove('show');
  langToggle.classList.remove('active');
}

langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.querySelectorAll('.lang-option').forEach(option => {
  option.addEventListener('click', () => {
    setLanguage(option.dataset.lang);
    closeDropdown();
  });
});

document.addEventListener('click', (e) => {
  if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
    closeDropdown();
  }
});

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;
  
  if (diff <= 0) {
    countdownDays.textContent = '00';
    countdownHours.textContent = '00';
    countdownMinutes.textContent = '00';
    countdownSeconds.textContent = '00';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  const newDays = String(days).padStart(2, '0');
  const newHours = String(hours).padStart(2, '0');
  const newMinutes = String(minutes).padStart(2, '0');
  const newSeconds = String(seconds).padStart(2, '0');
  
  if (countdownDays.textContent !== newDays) {
    countdownDays.textContent = newDays;
    countdownDays.classList.add('update');
    setTimeout(() => countdownDays.classList.remove('update'), 150);
  }
  
  if (countdownHours.textContent !== newHours) {
    countdownHours.textContent = newHours;
    countdownHours.classList.add('update');
    setTimeout(() => countdownHours.classList.remove('update'), 150);
  }
  
  if (countdownMinutes.textContent !== newMinutes) {
    countdownMinutes.textContent = newMinutes;
    countdownMinutes.classList.add('update');
    setTimeout(() => countdownMinutes.classList.remove('update'), 150);
  }
  
  if (countdownSeconds.textContent !== newSeconds) {
    countdownSeconds.textContent = newSeconds;
    countdownSeconds.classList.add('update');
    setTimeout(() => countdownSeconds.classList.remove('update'), 150);
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

function copyToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
      showCopySuccess();
    }).catch(() => {
      fallbackCopy();
    });
  } else {
    fallbackCopy();
  }
}

function fallbackCopy() {
  const textarea = document.createElement('textarea');
  textarea.value = CONTRACT_ADDRESS;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopySuccess();
  } catch (err) {
    console.error('Copy failed:', err);
  }
  document.body.removeChild(textarea);
}

function showCopySuccess() {
  copyTooltip.classList.add('show');
  setTimeout(() => {
    copyTooltip.classList.remove('show');
  }, 2000);
}

contractAddressEl.addEventListener('click', copyToClipboard);

setLanguage(currentLang);