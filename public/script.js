document.addEventListener("DOMContentLoaded", function() {
    const baseRateSlider = document.getElementById("baseRate");
    const baseRateValue = document.getElementById("baseRateValue");
    const timeWorkSlider = document.getElementById("timeWorkSlider");
    const timeWorkDisplay = document.getElementById("timeWorkDisplay");
    const remoteWorkSlider = document.getElementById("remoteWorkSlider");
    const remoteWorkDisplay = document.getElementById("remoteWorkDisplay");
    const paymentDelaySlider = document.getElementById("paymentDelaySlider");
    const paymentDelayDisplay = document.getElementById("paymentDelayDisplay");
    const technicalContextSlider = document.getElementById("technicalContextSlider");
    const technicalContextDisplay = document.getElementById("technicalContextDisplay");
    const companyContextSlider = document.getElementById("companyContextSlider");
    const companyContextDisplay = document.getElementById("companyContextDisplay");
    const finalTJDisplay = document.getElementById("finalTJ");

    let timeWorkValues = [
        "Temps partiel | +100€",
        "Temps plein | 0€"
    ]

    let remoteWorkValues = [
        "Full présentiel | +400€",
        "1 jour remote | +50€ ",
        "2 jours remote | +15€",
        "50% remote | 0€",
        "3 jours remote | -15€",
        "4 jours remote | -30€",
        "Full remote | -50€"
    ];

    let paymentDelayValues = [
        "60j date de facture | +150€",
        "45j date de facture | +75€",
        "30j date de facture | 0€",
        "15j et moins | -50€"
    ];
    
    let technicalContextValues = [
        "Niveau technique peu valorisant | +50€",
        "Niveau technique habituel | 0€",
        "Niveau technique valorisant | -30€"
    ];
    
    let companyContextValues = [
        "Contexte non souhaité | +50€",
        "Contexte habituel | 0€",
        "Contexte intéressant | -30€"
    ];

    function calculateTJ() {
        let baseRate = parseInt(baseRateSlider.value);
        let timeWorkAdjustment = parseInt(timeWorkValues[timeWorkSlider.value].split("|")[1]);
        let remoteWorkAdjustment = parseInt(remoteWorkValues[remoteWorkSlider.value].split("|")[1]);
        let paymentDelayAdjustment = parseInt(paymentDelayValues[paymentDelaySlider.value].split("|")[1]);
        let technicalContextAdjustment = parseInt(technicalContextValues[technicalContextSlider.value].split("|")[1]);
        let companyContextAdjustment = parseInt(companyContextValues[companyContextSlider.value].split("|")[1]);
    
        let finalTJ = baseRate + timeWorkAdjustment + remoteWorkAdjustment + paymentDelayAdjustment + technicalContextAdjustment + companyContextAdjustment;
    
        finalTJDisplay.textContent = finalTJ + "€";

        updateSliderColor(timeWorkSlider, timeWorkDisplay);
        updateSliderColor(remoteWorkSlider, remoteWorkDisplay);
        updateSliderColor(paymentDelaySlider, paymentDelayDisplay);
        updateSliderColor(technicalContextSlider, technicalContextDisplay);
        updateSliderColor(companyContextSlider, companyContextDisplay);
    }

    function updateSliderColor(slider, display) {
        const value = parseInt(display.textContent.split("|")[1]);
        if (value > 0) {
            slider.classList.add("slider-positive");
            slider.classList.remove("slider-neutral", "slider-negative");
        } else if (value < 0) {
            slider.classList.add("slider-negative");
            slider.classList.remove("slider-neutral", "slider-positive");
        } else {
            slider.classList.add("slider-neutral");
            slider.classList.remove("slider-positive", "slider-negative");
        }
    }

    baseRateSlider.addEventListener("input", function() {
        baseRateValue.textContent = baseRateSlider.value + "€";
        calculateTJ();
    });

    timeWorkSlider.addEventListener("input", function() {
        timeWorkDisplay.textContent = timeWorkValues[timeWorkSlider.value];
        calculateTJ();
    });

    remoteWorkSlider.addEventListener("input", function() {
        remoteWorkDisplay.textContent = remoteWorkValues[remoteWorkSlider.value];
        calculateTJ();
    });

    paymentDelaySlider.addEventListener("input", function() {
        paymentDelayDisplay.textContent = paymentDelayValues[paymentDelaySlider.value];
        calculateTJ();
    });
    
    technicalContextSlider.addEventListener("input", function() {
        technicalContextDisplay.textContent = technicalContextValues[technicalContextSlider.value];
        calculateTJ();
    });
    
    companyContextSlider.addEventListener("input", function() {
        companyContextDisplay.textContent = companyContextValues[companyContextSlider.value];
        calculateTJ();
    });

    // Initialisation des affichages des sliders
    baseRateSlider.dispatchEvent(new Event('input'));
    timeWorkSlider.dispatchEvent(new Event('input'));
    remoteWorkSlider.dispatchEvent(new Event('input'));
    paymentDelaySlider.dispatchEvent(new Event('input'));
    technicalContextSlider.dispatchEvent(new Event('input'));
    companyContextSlider.dispatchEvent(new Event('input'));

    // Initialisation des affichages et du calcul du TJ
    baseRateValue.textContent = baseRateSlider.value + "€";
    calculateTJ();

    document.getElementById('saveConfigBtn').addEventListener('click', () => {
        const partTimeValue = parseInt(document.getElementById('partTime').value, 10);
        const fullTimeValue = parseInt(document.getElementById('fullTime').value, 10);

        const fullPresentielValue = parseInt(document.getElementById('fullPresentiel').value, 10);
        const oneDayRemoteValue = parseInt(document.getElementById('oneDayRemote').value, 10);
        const twoDayRemoteValue = parseInt(document.getElementById('twoDayRemote').value, 10);
        const fiftyRemoteValue = parseInt(document.getElementById('fiftyRemote').value, 10);
        const threeDayRemoteValue = parseInt(document.getElementById('threeDayRemote').value, 10);
        const fourDayRemoteValue = parseInt(document.getElementById('fourDayRemote').value, 10);
        const fullRemoteValue = parseInt(document.getElementById('fullRemote').value, 10);

        const sixtyDaysValue = parseInt(document.getElementById('sixtyDays').value, 10);
        const fortyFiveDaysValue = parseInt(document.getElementById('fortyFiveDays').value, 10);
        const thirtyFiveDaysValue = parseInt(document.getElementById('thirtyFiveDays').value, 10);
        const fifteenFiveDaysValue = parseInt(document.getElementById('fifteenFiveDays').value, 10);

        const lowTechnicalValue = parseInt(document.getElementById('lowTechnical').value, 10);
        const usualTechnicalValue = parseInt(document.getElementById('usualTechnical').value, 10);
        const highTechnicalValue = parseInt(document.getElementById('highTechnical').value, 10);
        
        const unwantedContextValue = parseInt(document.getElementById('unwantedContext').value, 10);
        const knownContextValue = parseInt(document.getElementById('knownContext').value, 10);
        const interestingContextValue = parseInt(document.getElementById('interestingContext').value, 10);

        const configData = {
            type: 'amount',
            baseRate: baseRateSlider.value,
            partTime : partTimeValue,
            fullTime : fullTimeValue,
            fullPresentiel : fullPresentielValue,
            oneDayRemote : oneDayRemoteValue,
            twoDayRemote : twoDayRemoteValue,
            fiftyRemote : fiftyRemoteValue, 
            threeDayRemote : threeDayRemoteValue, 
            fourDayRemote : fourDayRemoteValue,
            fullRemote : fullRemoteValue,
            sixtyDays : sixtyDaysValue,
            fortyFiveDays : fortyFiveDaysValue,
            thirtyFiveDays : thirtyFiveDaysValue,
            fifteenFiveDays : fifteenFiveDaysValue,
            lowTechnical : lowTechnicalValue,
            usualTechnical : usualTechnicalValue,
            highTechnical : highTechnicalValue,
            unwantedContext : unwantedContextValue,
            knownContext : knownContextValue,
            interestingContext : interestingContextValue
        };
    
        fetch('/save-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        })
        .then(response => response.json())
        .then(data => {
            const uniqueUrl = window.location.href + '?id=' + data.id;
            alert('Votre configuration a été sauvegardée. URL unique : ' + uniqueUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const configId = urlParams.get('id');
    const slideId = urlParams.get('slide');

    document.getElementById('saveSliderPositionBtn').addEventListener('click', function() {
        const timeWorkSliderValue = document.getElementById('timeWorkSlider').value;
        const remoteWorkSliderValue = document.getElementById('remoteWorkSlider').value;
        const paymentDelaySliderValue = document.getElementById('paymentDelaySlider').value;
        const technicalContextSliderValue = document.getElementById('technicalContextSlider').value;
        const companyContextSliderValue = document.getElementById('companyContextSlider').value;
    
        const configData = {
            type: 'slide',
            amountId: configId,
            timeWorkSlider : timeWorkSliderValue,
            remoteWorkSlider: remoteWorkSliderValue,
            paymentDelaySlider: paymentDelaySliderValue,
            technicalContextSlider: technicalContextSliderValue,
            companyContextSlider: companyContextSliderValue,
        };
    
        fetch('/save-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        })
        .then(response => response.json())
        .then(data => {
            const uniqueUrl = `${window.location.href}&slide=${data.slide}`;
            alert('La position des sliders a été sauvegardée. URL unique : ' + uniqueUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    if (configId) {
        fetch(`/load-config/${configId}/amount`)
        .then(response => response.json())
        .then(data => {
            baseRateSlider.value = data.baseRate;

            function formatValue(value) {
                return value > 0 ? `+${value}€` : `${value}€`;
            }

            timeWorkValues = [
                `Temps partiel | ${formatValue(data.partTime)}`,
                `Temps plein | ${formatValue(data.fullTime)}`,
            ]

            remoteWorkValues = [
                `Full présentiel | ${formatValue(data.fullPresentiel)}`,
                `1 jour remote | ${formatValue(data.oneDayRemote)}`,
                `2 jours remote | ${formatValue(data.twoDayRemote)}`,
                `50% remote | ${formatValue(data.fiftyRemote)}`,
                `3 jours remote | ${formatValue(data.threeDayRemote)}`,
                `4 jours remote | ${formatValue(data.fourDayRemote)}`,
                `Full remote | ${formatValue(data.fullRemote)}`,
            ];

            paymentDelayValues = [
                `60j date de facture | ${formatValue(data.sixtyDays)}`,
                `45j date de facture | ${formatValue(data.fortyFiveDays)}`,
                `30j date de facture | ${formatValue(data.thirtyFiveDays)}`,
                `15j et moins | ${formatValue(data.fifteenFiveDays)}`,
            ];

            technicalContextValues = [
                `Niveau technique peu valorisant | ${formatValue(data.lowTechnical)}`,
                `Niveau technique habituel | ${formatValue(data.usualTechnical)}`,
                `Niveau technique valorisant | ${formatValue(data.highTechnical)}`,
            ];
            
            companyContextValues = [
                `Contexte non souhaité | ${formatValue(data.unwantedContext)}`,
                `Contexte habituel | ${formatValue(data.knownContext)}`,
                `Contexte intéressant | ${formatValue(data.interestingContext)}`,
            ];

            // Masquer le slider du taux de base
            document.getElementById('baseRate').classList.add('hidden');
            document.getElementById('configured').classList.remove('hidden');
            document.getElementById('notConfigured').classList.add('hidden');

            // Mettre à jour les affichages et les couleurs des sliders
            baseRateSlider.dispatchEvent(new Event('input'));
            timeWorkSlider.dispatchEvent(new Event('input'));
            remoteWorkSlider.dispatchEvent(new Event('input'));
            paymentDelaySlider.dispatchEvent(new Event('input'));
            technicalContextSlider.dispatchEvent(new Event('input'));
            companyContextSlider.dispatchEvent(new Event('input'));
        })
        .catch(error => {
            console.error('Error:', error);
        });
        if (slideId) {
            fetch(`/load-config/${configId}/${slideId}`)
            .then(response => response.json())
            .then(data => {
                // Charger la configuration des sliders
                document.getElementById('timeWorkSlider').value = data.timeWorkSlider;
                document.getElementById('remoteWorkSlider').value = data.remoteWorkSlider;
                document.getElementById('paymentDelaySlider').value = data.paymentDelaySlider;
                document.getElementById('technicalContextSlider').value = data.technicalContextSlider;
                document.getElementById('companyContextSlider').value = data.companyContextSlider;

                // Masquer le slider du taux de base
                document.getElementById('baseRate').classList.add('hidden');
                document.getElementById('configured').classList.remove('hidden');
                document.getElementById('notConfigured').classList.add('hidden');
                document.getElementById('saveSliderPositionBtn').classList.add('hidden');

                // Désactiver les sliders
                document.getElementById('timeWorkSlider').disabled = true;
                document.getElementById('remoteWorkSlider').disabled = true;
                document.getElementById('paymentDelaySlider').disabled = true;
                document.getElementById('technicalContextSlider').disabled = true;
                document.getElementById('companyContextSlider').disabled = true;
        
                // Mettre à jour les affichages et les couleurs des sliders
                timeWorkSlider.dispatchEvent(new Event('input'));
                remoteWorkSlider.dispatchEvent(new Event('input'));
                paymentDelaySlider.dispatchEvent(new Event('input'));
                technicalContextSlider.dispatchEvent(new Event('input'));
                companyContextSlider.dispatchEvent(new Event('input'));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
});