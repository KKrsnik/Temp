/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown(elementId) {
    this.closeDropdowns();
    document.getElementById(elementId).classList.toggle("show");
    if (elementId === "dateFilterDropdown" && $("#dateFrom").val() === "") {
        $("#dateFrom").val(moment().startOf('day').format('YYYY-MM-DDTHH:mm'))
    }
}

function clearFilter(elementId) {
    this.closeDropdowns();
    if (elementId === "dateFilterDropdown") {
        $("#dateFrom").val("")
        $("#dateTo").val("")
    } else if (elementId === "locationFilterDropdown") {
        $("#locationFilter").val("")
    } else if (elementId === "nameFilterDropdown") {
        $("#nameFilter").val("")
    }
    var vrstice = document.getElementById("eventTable").getElementsByTagName("tr");
    for (let i = 0; i < vrstice.length; i++) {
        var stolpec = vrstice[i].getElementsByTagName("td")[1];
        if (stolpec) {
            vrstice[i].style.display = "";
        }
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    let dropdowns = document.getElementsByClassName("dropdown");
    //!event.composedPath().includes(document.getElementById("filterButton")) &&
    let dropdownClicked = false;
    // determine if we clicked on dropdown div
    for (let i = 0; i < dropdowns.length; i++) {
        if (event.composedPath().includes(dropdowns.item(i))) {
            dropdownClicked = true
        }
    }
    if (!dropdownClicked) {
        this.closeDropdowns();
    }
}

function closeDropdowns() {
    let dropdownContents = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdownContents.length; i++) {
        let openDropdown = dropdownContents[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            if (!event.composedPath().includes(document.getElementById("filterButton")) &&
                !event.composedPath().includes(document.getElementById("nameFilterDropdown"))) {
                let dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }
}

function onNameFilterInput() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("nameFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("eventTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function onDateFilterInput() {
    this.closeDropdowns();
    let dateFrom = moment($("#dateFrom").val());
    let dateTo = moment($("#dateTo").val());
    var vrstice = document.getElementById("eventTable").getElementsByTagName("tr");
    for (let i = 0; i < vrstice.length; i++) {
        var stolpec = vrstice[i].getElementsByTagName("td")[3];
        if (stolpec) {
            var eventDate = moment(stolpec.textContent, 'D. MM. YYYY ob HH:mm')
            if (eventDate.isAfter(dateFrom) && eventDate.isBefore(dateTo)) {
                vrstice[i].style.display = "";
            } else {
                vrstice[i].style.display = "none";
            }
        }
    }
}

function onLocationFilterInput() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("locationFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("eventTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
