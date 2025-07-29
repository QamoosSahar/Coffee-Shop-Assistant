function login () {
    const validUsers = {
        "admin": {password: "1234", role: "Admin", securityLevel: "High"},
        "user": {password: "1234", role: "User", securityLevel: "Low"}
    };

    const username = prompt("Enter username:");
    if (username === null) {
        alert("Error: Login cancelled!");
        return null;
    }

    const password = prompt("Enter password:");
    if (password === null) {
        alert("Error: Login cancelled!");
        return null;
    }

    if (validUsers[username] && validUsers[username].password === password) {
        alert(`Login Successful! Welcome ${username} (Role: ${validUsers[username].role}, Security Level: ${validUsers[username].securityLevel})`);
        return validUsers[username];
    } else {
        alert("Alert: Invalid credentials!");
        return null;
    }
}

// Coffee menu with prices
function coffeeShopCalculator(user) {
    const menu = {
        "espresso": 2.5,
        "latte": 3.5,
        "cappuccino": 4.0
    };

    // Getting Inputs
    const name = prompt("Enter your name:");
    if (name === null) {
        alert("Error: Order cancelled!");
        return null;
    }

    let age = parseInt(prompt("Enter your age:"));
    if (age === null) {
        alert("Error: Order cancelled!");
        return null;
    }

    let coffeeType = prompt("Enter coffee type (espresso, latte, cappuccino):").toLowerCase();
    if (coffeeType === null) {
        alert("Error: Order cancelled!");
        return null;
    }

    let quantity = parseInt(prompt("Enter quantity of cups:"));
    if (quantity === null) {
        alert("Error: Order cancelled!");
        return null;
    }

    // Inputs validation
    if (!name) {
        alert("Error: Name cannot be empty!");
        return null;
    }

    if (isNaN(age) || age < 0) {
        alert("Error: Invalid age!");
        return null;
    }

    if (!menu[coffeeType]) {
        alert("Error: Invalid coffee type! Choose espresso, latte, or cappuccino.");
        return null;
    }

    if (isNaN(quantity) || quantity <= 0) {
        alert("Error: Quantity mute be a positive number!");
        return null;
    }

    // Calculator original amount
    const originalTotal = menu[coffeeType] * quantity;
    let discount = 0;
    if (age < 18 || age > 60) {
        discount = originalTotal * 0.1;
    }

    // Calculator total amount
    const finalTotal = originalTotal - discount;
    return {
        name: name,
        coffeeType: coffeeType,
        quantity: quantity,
        originalTotal: originalTotal,
        discount: discount,
        finalTotal: finalTotal
    };
}

function billSplitter(order) {
    if (!order) return; 

    const validSplitCounts = [1, 2, 3];
    const validTipPercentages = [0, 5, 10, 15];

    const splitCountInput = prompt("How many people are splitting the bill? (1, 2, or 3)");
    if (splitCountInput === null) {
        alert("Error: Bill splitting cancelled!");
        return null;
    }

    const splitCount = parseInt(splitCountInput);

    const tipPercentageInput = prompt("Enter tip percentage (0, 5, 10, or 15):");
    if (tipPercentageInput === null) {
        alert("Error: Bill splitting cancelled!");
        return null;
    }

    const tipPercentage = parseInt(tipPercentageInput);

    if (isNaN(splitCount) || !validSplitCounts.includes(splitCount)) {
        alert("Error: Number of people must be 1, 2, or 3!");
        return null;
    }

    if (isNaN(tipPercentage) || !validTipPercentages.includes(tipPercentage)) {
        alert("Error: Tip percentage must be 0, 5, 10, or 15!");
        return null;
    }
    
    // Calculations
    const tipAmount = order.finalTotal * (tipPercentage / 100);
    const totalWithTip = order.finalTotal + tipAmount;
    const amountPerPerson = totalWithTip / splitCount;

    console.log("Before alert:", {tipAmount, totalWithTip, amountPerPerson});

    // Show result
    alert(
        `Hello ${order.name}! \n` +
        `You ordered ${order.quantity} ${order.coffeeType}(s). \n` +
        `Original total: $${order.originalTotal.toFixed(2)} \n` +
        `Discount: $${order.discount.toFixed(2)} \n` +
        `Final total: $${order.finalTotal.toFixed(2)} \n` +
        `Tip: $${tipAmount.toFixed(2)} \n` +
        `Total with Tip: $${totalWithTip.toFixed(2)}`+
        `Split between ${splitCount} people: $${amountPerPerson.toFixed(2)} each`
    );

    return {
        tipAmount: tipAmount,
        totalWithTip: totalWithTip,
        amountPerPerson: amountPerPerson,
        splitCount: splitCount,
        tipPercentage: tipPercentage
    };
}

// run program
const user = login();
if (user) {
    const order = coffeeShopCalculator(user);
    if (order) {
        const bill = billSplitter(order);
        if (bill) {
            console.log("Bill details:", bill);
        } else {
            console.log("Bill splitting failed");
        }
    } else {
        console.log("Order failed");
    }
}