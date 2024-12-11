// تخزين الأشخاص حسب الولايات
const statePersons = {};

// إضافة اسم شخص حسب الولاية
function addPerson() {
    const state = document.getElementById('state-selector').value;
    const personName = prompt('أدخل اسم الشخص:');

    if (!personName) return;

    // إذا لم تكن الولاية موجودة في القائمة، أضفها
    if (!statePersons[state]) {
        statePersons[state] = [];
    }

    // أضف اسم الشخص إلى القائمة
    statePersons[state].push(personName);

    // تحديث العرض
    updatePersonsList();
}

// تحديث قائمة الأشخاص في الصفحة
function updatePersonsList() {
    const personsList = document.getElementById('persons-list');
    personsList.innerHTML = '';

    for (const [state, persons] of Object.entries(statePersons)) {
        const stateItem = document.createElement('li');
        stateItem.innerHTML = `<strong>ولاية ${state}:</strong> ${persons.join(', ')}`;
        personsList.appendChild(stateItem);
    }
}

// حساب النتائج وعرض الفاتورة
function calculate() {
    const state = document.getElementById('state-selector').value;
    const salesCount = parseInt(document.getElementById('sales-count').value) || 0;
    const pricePerItem = parseFloat(document.getElementById('price-per-item').value) || 0;
    const payment = parseFloat(document.getElementById('payment').value) || 0;
    const remaining = parseFloat(document.getElementById('remaining').value) || 0;

    // الحسابات
    const totalSales = salesCount * pricePerItem;
    const halfAmount = totalSales / 2;

    // جلب أسماء الأشخاص المرتبطين بالولاية
    const persons = statePersons[state] || [];

    // عرض الفاتورة
    const invoiceSection = document.getElementById('invoice-section');
    const invoiceContent = document.getElementById('invoice-content');

    invoiceContent.innerHTML = `
        <p><strong>الولاية:</strong> ${state}</p>
        <p><strong>أسماء الأشخاص:</strong> ${persons.join(', ') || 'لا يوجد'}</p>
        <p><strong>عدد المبيعات:</strong> ${salesCount}</p>
        <p><strong>ثمن المبيعة الواحدة:</strong> ${pricePerItem.toFixed(2)} دينار</p>
        <p><strong>إجمالي المبيعات:</strong> ${totalSales.toFixed(2)} دينار</p>
        <p><strong>مبلغ التسديد:</strong> ${payment.toFixed(2)} دينار</p>
        <p><strong>المبلغ المتبقي:</strong> ${remaining.toFixed(2)} دينار</p>
        <p><strong>نصف المبلغ الإجمالي:</strong> ${halfAmount.toFixed(2)} دينار</p>
    `;

    invoiceSection.style.display = 'block';
}

// طباعة الفاتورة
function printInvoice() {
    const printContent = document.getElementById('invoice-section').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}