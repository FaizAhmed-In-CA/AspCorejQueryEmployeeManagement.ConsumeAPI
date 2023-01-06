var RAndRJavaScripts = {

    tools: {

        validationType: {
            isNotEmpty: 0,
            isGreterThen: 1,
            isLessThen: 2
        },

        // Reset the page , clear divs input and reset datasource of other databound controls
        resetPage: function (divNames, kendoGrids, kendoMultis, kendoListViews, kendoTree, kendoUpload, focusControl) {
            //
            if (typeof divNames != 'undefined' && divNames != null) {
                var arrayDivs = divNames.split(',');
                for (i = 0; i < arrayDivs.length; i++) {
                    var divID = document.getElementById(arrayDivs[i]);
                    setControlsValue(new RAndRJavaScripts.jsonObject(),
                        divID,
                        true,
                        true); //why reset & clear together needed...
                }
            }

            if (typeof kendoGrids != 'undefined' && kendoGrids != null) {
                //
                var arrayGrids = kendoGrids.split(',');
                for (i = 0; i < arrayGrids.length; i++) {
                    $("#" + arrayGrids[i]).data('kendoGrid').dataSource.data([]);
                    RAndRJavaScripts.grid.getSelectedUID[arrayGrids[i]] = "";
                }
            }

            if (typeof kendoMultis != 'undefined' && kendoMultis != null) {
                var arrayMulti = kendoMultis.split(',');
                for (i = 0; i < arrayMulti.length; i++) {
                    $("#" + arrayMulti[i]).data('kendoMultiSelect').value([]); //.dataSource.data([]);;
                }
            }

            if (typeof kendoListViews != 'undefined' && kendoListViews != null) {
                var arrayList = kendoListViews.split(',');
                for (i = 0; i < arrayList.length; i++) {
                    $("#" + arrayList[i]).data('kendoListView').dataSource.data([]);;
                }
            }

            if (typeof kendoTree != 'undefined' && kendoTree != null) {
                var arrayTree = kendoTree.split(',');
                for (i = 0; i < arrayTree.length; i++) { //work
                    $("#" + arrayTree[i]).data('kendoListView').dataSource.data([]);;
                }
            }

            if (typeof kendoUpload != 'undefined' && kendoUpload != null) {
                var arrayUp = kendoUpload.split(',');
                for (i = 0; i < arrayUp.length; i++) { //work
                    $("#" + arrayUp[i]).data('kendoListView').dataSource.data([]);;
                }
            }
            //if (typeof primaryKeyTags != 'undefined') {
            //    var arrayPK = primaryKeyTags.split(',');
            //    for (i = 0; i < arrayPK.length; i++) { //work
            //        $("#" + arrayPK[i]).data('kendoListView').dataSource.data([]);;
            //    }
            //}
            if (typeof focusControl != 'undefined' && focusControl != null) $('#' + focusControl).focus();
        },

    },


    message: {
        showError: function (base, msg, duration) {
            //
            if (duration == null || duration == undefined) duration = true;
            $(base).iziModal({
                title: "Error",
                subtitle: msg,
                iconClass: 'fa fa-exclamation-triangle',
                headerColor: '#BD5B5B',
                width: 600,
                timeout: duration,
                autoOpen: false,
                timeoutProgressbar: true

            });
            $(base).iziModal('setSubtitle', msg);
            $(base).iziModal('open');
        },
        showWarning: function (base, msg, duration) {
            //
            if (duration == null || duration == undefined) duration = true;
            $(base).iziModal({
                title: "warning",
                subtitle: msg,
                iconClass: 'fa fa-exclamation-triangle',
                headerColor: '#EB610D', //#e48b73
                width: 600,
                timeout: duration,
                autoOpen: false,
                timeoutProgressbar: true

            });
            $(base).iziModal('setSubtitle', msg);
            $(base).iziModal('open');
        },
        showInfo: function (base, msg, duration) {
            //
            if (duration == null || duration == undefined) duration = true;
            $(base).iziModal({
                title: "Information",
                subtitle: msg,
                iconClass: 'fa fa-info-circle',
                headerColor: '#5bbd72',
                width: 600,
                timeout: duration,
                autoOpen: false,
                timeoutProgressbar: true
            });
            $(base).iziModal('setSubtitle', msg);
            $(base).iziModal('open');
        },
        showConfirmMini: function (msg) {
            swal({
                title: "Error!",
                text: "Here's my error message!",
                type: "error",
                confirmButtonText: "Cool"
            });
        },
        showConfirm: function (msg, callbackFn) {
            swal({
                title: "Are you sure?",
                text: msg,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
                function (isConfirm) {
                    if (isConfirm) {
                        callbackFn(isConfirm);
                    }
                    swal.close();
                });
        }
    },


    ajaxLoder: {
        showPleaseWait: function () {
            var styleModal = document.createElement('style');
            styleModal.type = 'text/css';
            styleModal.innerHTML =
                '.modal { display: none; position: fixed; z-index: 1000; top: 0; left: 0; height: 100%; ' +
                'width: 100%; background: rgba( 255, 255, 255, .8 ) url(\'http://i.stack.imgur.com/FhHRx.gif\') 50% 50% no-repeat; }';
            document.getElementsByTagName('head')[0].appendChild(styleModal);

            var styleModalHide = document.createElement('style');
            styleModalHide.type = 'text/css';
            styleModalHide.innerHTML = '.modal .show { display: none; }';
            document.getElementsByTagName('head')[0].appendChild(styleModalHide);

            $('body').append('<div id="modalDiv" class="modal"></div>');
            $('#modalDiv').addClass('modal show');
        },
        hidePleaseWait: function () {
            $('#modalDiv').removeClass("show");
        },
    },


    //Div inputes/labels operations 
    div: {

        // Add div inputs to a selected grid
        addItemToGrid: function (grid, parentDiv, primaryKeyTag, foreignKeyTag, focusControl, isClear) {

            var jo = new RAndRJavaScripts.jsonObject();
            var productsGrid = $('#' + grid).data('kendoGrid');
            var dataSource = productsGrid.dataSource;


            if ($("#" + primaryKeyTag).val() == "") $("#" + primaryKeyTag).val(0);
            if ($("#" + foreignKeyTag).val() == "") $("#" + foreignKeyTag).val(0);
            var _foreignKeyTag = $("#" + foreignKeyTag);


            var _parentDiv = document.getElementById(parentDiv);
            setControlsValue(jo, _parentDiv, isClear);
            jo.add(_foreignKeyTag[0].id, _foreignKeyTag.val()); //if not null //why 0 needed

            var jsonval = jo.get();
            var found = "";

            var girdCols = dataSource.options.schema.model.fields;
            var findItems = $("#" + grid).data("kendoGrid").dataSource.data();

            //Find DUPLICATE ROWS

            for (i = 0; i < findItems.length; i++) {
                for (var key in jsonval) {
                    if (jsonval[key] != RAndRJavaScripts.grid.getSelectedUID[grid]) {
                        if (key != primaryKeyTag) {
                            var row = findItems[i][key];
                            if (jsonval[key] == row) found += true.toString() + ' ';
                            else found += false.toString() + ' ';
                        }
                    }
                }
                if (found != "" && found.search('false') == -1) {

                    if (jsonval["modType"] == "D") {
                        dataItem.modType = "A";
                        var grid = $("#" + g).data("kendoGrid");
                        var currenRow =
                            grid.table.find("tr[data-uid='" +
                                findItems.uid +
                                "']"); // var editButton = $(currenRow).find(".k-grid-edit");
                        currenRow.show();
                    } else {
                        alert('Duplicate Entry Found');
                    }
                    return;
                }
                found = "";
            }

            //REPLACE OLD ITEMS

            var isReplaced = false;
            var items = $("#" + grid).data("kendoGrid").dataSource.data();
            for (i = 0; i < items.length; i++) {
                if (items[i].uid == RAndRJavaScripts.grid.getSelectedUID[grid]) {

                    jo.add("modType", "E");
                    //;
                    for (var key in jsonval) {
                        //;
                        if (key == "modType") items[i][key] = "E";
                        else items[i][key] = jsonval[key];
                    }
                    isReplaced = true;
                    //break;
                }
            }

            //ADD NEW ITEM
            if (isReplaced == false) {
                jo.add("modType", "A");
                var jsonval = jo.get();
                dataSource.add(jsonval);
            }
            RAndRJavaScripts.grid.getSelectedUID[grid] = "";

            dataSource.sync();
            jo.empty();
            if (focusControl != null) $('#' + focusControl).focus();
        },

        // Add div inputs to a selected list view
        addItemToListView:
            function (listView, parentDiv, primaryKeyFirst, focusControl) { //neeed to work later  /*rework*/ 

                var jo = new RAndRJavaScripts.jsonObject();
                var productsGrid = $(listView).data('kendoListView');
                var dataSource = productsGrid.dataSource;

                setControlsValue(jo, parentDiv);

                jo.add(primaryKeyFirst, dataSource._total);
                var jsonval = jo.get();

                var dataItems = dataSource.view();
                for (var i = 0; i < dataSource._data.length; i++) {
                    var row = dataItems[i][duplicateCheckField];
                    if (jsonval[duplicateCheckField] == row) {
                        alert('Duplicate Entry Found');
                        return;
                    }
                    //break;
                }

                dataSource.add(jsonval);
                dataSource.sync();
                if (focusControl != null) $('#' + focusControl).focus();
            },

        //Get all inputs in div and return json
        getJsonObjectFromDiv: function (divName, primaryKeyTag) {



            if ($("#" + primaryKeyTag).val() == "") $("#" + primaryKeyTag).val(0);
            var jo = new RAndRJavaScripts.jsonObject();
            var _divName = document.getElementById(divName);
            setControlsValue(jo, _divName, false);
            var jsonval = jo.get();
            return jsonval;
        },

        // Set control values from given jason       
        loadDivControlFromJson: function (jsonVal, primaryKeyTag) {
            //;
            var jObj = jsonVal;// JSON.parse(jsonString);
            for (var key in jObj) {
                //;
                if (key == "ProductiveAssets") {

                }
                //  if (jObj.hasOwnProperty(key)) {
                if (key != "") {

                    var fieldName = key;
                    var cellValue = (jObj[key]);
                    var node = $('#' + key);
                    var nodeName = key;

                    //var iNumber = Number(cellValue);

                    if (fieldName == primaryKeyTag) {
                        //
                        if (cellValue == "")
                            cellValue = 0;

                        $("#" + primaryKeyTag).val(cellValue);
                    }
                    else {
                        // 
                        if (isDropDownList() == 'k-dropdown-wrap k-state-default') {
                            var dropdownlist = $("#" + fieldName).data("kendoDropDownList");
                            dropdownlist.value(jObj[fieldName.replace('Name', 'ID')]);
                        }
                        else if (isDateTimePicker() == "k-widget k-datetimepicker k-header") {
                            //
                            var datepicker = $('#' + fieldName).data("kendoDateTimePicker");
                            var dateVal = new Date(cellValue);
                            var dateString = dateVal.toLocaleDateString() + ' ' + dateVal.toLocaleTimeString();
                            datepicker.value(dateVal);
                        }
                        else if (isDateTimePicker() == "k-widget k-datetimepicker k-header") {
                            //
                            var datepicker = $('#' + fieldName).data("kendoDateTimePicker");
                            var dateVal = new Date(cellValue);
                            var dateString = dateVal.toLocaleDateString() + ' ' + dateVal.toLocaleTimeString();
                            datepicker.value(dateVal);
                        }
                        else if (isRadioButton() == "radio") {
                            $("input[name=" + nodeName + "][value=" + cellValue + "]").attr('checked', 'checked');

                        }
                        else if (isMultiSelect() == 'select-multiple') {
                            var multiSelect = $(node.selector).data("kendoMultiSelect");
                            cellValue = (jObj[key + "Id"]);
                            var mulValue = JSON.parse("[" + cellValue + "]");
                            multiSelect.value(mulValue);
                        }
                        else {

                            $('#' + fieldName).val(cellValue);
                            $('#l' + fieldName).html(cellValue);
                        }
                    }
                }
            }

            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function isDropDownList() {
                var classNameKendoControl = "";
                if (node[0] != null) {
                    if (node[0].previousSibling != null) {
                        classNameKendoControl = node[0].previousSibling.className;
                    }
                }
                return classNameKendoControl;
            }
            function isRadioButton() {
                var classNameKendoControl = "";
                if (node[0] == null) {
                    var nodee = document.getElementsByName(nodeName);
                    if (nodee[0] != null) {
                        if (nodee[0].type == "radio")
                            classNameKendoControl = nodee[0].type;
                    }
                }
                return classNameKendoControl;
            }
            function isMultiSelect() {
                // 
                var classNameKendoControl = "";
                if (node[0] != null) {
                    var nodee = document.getElementsByName(nodeName);
                    if (nodee[0] != null) {
                        if (nodee[0].type == "select-multiple")
                            classNameKendoControl = nodee[0].type;
                    }
                }
                return classNameKendoControl;
            }
            function isDateTimePicker() {
                var classNameKendoControl = "";
                if (node[0] != null) {
                    if (node[0].parentNode != null) {
                        classNameKendoControl = node[0].parentNode.parentNode.className;
                    }
                }
                return classNameKendoControl;
            }
        }
    },



    //From validations object to validate forms inputs at client side. Usage : Add Validation and check validate status before crudPost 
    formValidation: function () {
        this.valObj = {};
        this.add = function (controlName, validationType, message) {
  
            var info = [];
            info.push(validationType);
            info.push(message);
            this.valObj[$('#' + controlName)[0].id] = info;
        };
        this.validate = function () {

            var isValid = true;
            var focusControl = null;
            for (var key in this.valObj) {
                if (this.valObj.hasOwnProperty(key)) {
                    var arrVal = this.valObj[key];
                    if (arrVal[0] == 0) {
                        var cVal = $('#' + key).val();
                        if (cVal == "") { // if control value is empty // need to add other validation logic - B/H
                            $('#e' + key).html(arrVal[1]);
                            $('#e' + key).addClass('showError');
                            $('#e' + key).removeClass('hideError');
                            if (focusControl == null) focusControl = $('#' + key);
                            isValid = false;
                        } else {
                            $('#e' + key).addClass('hideError');
                            $('#e' + key).removeClass('showError');
                        }
                    }
                }
            }
            //focusControl.focus();
            if (focusControl != null) $('#' + focusControl[0].id).focus()
            this.valObj = {};
            return isValid;
        };
    },


    grid: {
        getSelectedUID: {},

    },
    // Memory JSON onject
    //memJSON: {
    jsonObject: function () {
        this.jsonObj = {};
        this.add = function (name, value) {
            //
            this.jsonObj[name] = value;
        };
        this.addBatch = function (jsonObj) {
            //;
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    if (key != "") {
                        this.add(key, jsonObj[key]);
                    }
                }
            }
        };
        this.get = function () {
            return this.jsonObj;
        };
        this.getString = function () {
            var json = JSON.stringify(this.jsonObj);
            return json;
        };
        this.empty = function () {
            this.jsonObj = {};
        }
    },

    actionCall: function (actionURL, jsonObject, type, callbackFn) {

        alert("json object: " + jsonObject);

        $.ajax({
            //type: "POST",
            url: actionURL,
            type: type,
            data: jsonObject,
            dataType: 'json',
            success: function (response, status, jqXHR) {
                // 
                if (callbackFn != null || callbackFn != undefined) {
                    if (response != null && response.success) callbackFn(response, true);
                    else callbackFn(response, false);
                }
            },
            error: function (jqXHR, status, error) {

                if (callbackFn != null || callbackFn != undefined) {
                    var err = jqXHR.responseText;
                    // err = err.substring(err.indexOf("<title>"), err.indexOf("<meta")).replace('<title>', '').replace('<meta', '');
                    callbackFn(err, false);
                }
            }
        });
    },


};

//Common function for control value exchanges ....lete des
function setControlsValue(jsonObj, nodeDiv, isCrear, isReset) {
    //;
    var isClearValue; var isResetValue;
    if (typeof (isCrear) === 'undefined') isClearValue = false; else isClearValue = isCrear;
    if (typeof (isReset) === 'undefined') isResetValue = false; else isResetValue = isReset;

    walk_the_DOM(nodeDiv, function (node) {
        //
        if (node.nodeType == 1) {
            //
            //do not remove
            //if (node.id == "ProductiveAssets") {
            //    //
            //}
            if ((node.localName == 'input' || node.localName == 'select' || node.type == 'textarea') && node.type != 'button') {
                if (isDateTimePicker(node) == 'k-widget k-datetimepicker k-header') {
                    //
                    var datepicker = $("#" + node.id).data("kendoDateTimePicker");
                    if (isResetValue != true) {
                        var dateValue = datepicker.value();
                        jsonObj.add(node.id, dateValue);
                    }
                    if (isResetValue == true) { isClearValue = true; }
                    if (isClearValue == true) {
                        var d = new Date();
                        var curr_date = d.getDate();
                        var curr_month = d.getMonth() + 1; //Months are zero based
                        var curr_year = d.getFullYear();
                        var curr_hour = d.getHours();
                        var curr_minute = d.getMinutes();

                        datepicker.value(new Date(curr_year, curr_month, curr_date, curr_hour, curr_minute));
                    }
                }
                else if (node.previousSibling != null) {

                    if (node.previousSibling.className == 'k-dropdown-wrap k-state-default' && node.id != "") {

                        var dropdownlist = $("#" + node.id).data("kendoDropDownList");
                        if (isResetValue != true) {
                            var ddlVal = dropdownlist.value();
                            var ddlTxt = dropdownlist.text();

                            var hasID = node.id.toLowerCase().search("id");
                            if (hasID != null) {
                                jsonObj.add(node.id, ddlVal);
                                //jsonObj.add(node.id.replace("ID", "Name"), ddlTxt); // only for grid relation binding ... need more discuss
                            }
                            else {
                                jsonObj.add(node.id.replace("Name", "ID"), ddlVal);
                                jsonObj.add(node.id, ddlTxt); // only for grid relation binding ... need more discuss
                            }
                        }
                        if (isResetValue == true) { isClearValue = true; }
                        if (isClearValue == true) dropdownlist.select(0);
                    }
                    else {
                        // 
                        if (node.previousSibling.className == 'k-formatted-value k-input') {
                            var numerictextbox = $('#' + node.id).data("kendoNumericTextBox");
                            if (isResetValue != true) {
                                var tagVal = numerictextbox.value();
                                jsonObj.add(node.id, tagVal);
                            }
                            if (isResetValue == true) { isClearValue = true; }
                            if (isClearValue == true) numerictextbox.value(0);
                        }
                        else {

                            if (node.id != "" && node.type == "checkbox") {
                                if (isResetValue != true) {
                                    jsonObj.add(node.id, node.checked);
                                }
                                if (isResetValue == true) { isClearValue = true; }
                                if (isClearValue == true) {
                                    if (node.type != 'hidden') { //clearing non hiden controls 
                                        $("#" + node.id).val('');
                                    }
                                }
                            }
                            if (node.id != "" && node.type == "select-multiple") {// Added By Belayet Using For Multy select box

                                var multiSelect = $("#" + node.id).data("kendoMultiSelect");
                                if (isResetValue != true) {
                                    jsonObj.add(node.id, multiSelect.value());
                                }

                            }
                            if (node.id != "" && node.type != "checkbox" && node.type != "select-multiple" && node.type == "radio") {
                                //
                                if (isResetValue != true && $("#" + node.id).is(':checked')) {
                                    jsonObj.add(node.name, node.value);
                                }

                            }
                            if (node.id != "" && node.type != "checkbox" && node.type != "select-multiple" && node.type != "radio") {
                                //  
                                if (isResetValue != true) {
                                    jsonObj.add(node.id, node.value);
                                }
                                if (isResetValue == true) { isClearValue = true; }
                                if (isClearValue == true) {
                                    if (node.type != 'hidden') { //clearing non hiden controls 
                                        $("#" + node.id).val('');
                                    }
                                }
                            }
                            //;
                            if (node.id != "" && node.type == "file") {
                                if (isResetValue != true) {
                                    jsonObj.add(node.id, node.files[0]);
                                }
                                if (isResetValue == true) { isClearValue = true; }
                                if (isClearValue == true) {
                                    if (node.type != 'hidden') { //clearing non hiden controls 
                                        $("#" + node.id).val('');
                                    }
                                }
                            }
                        }
                    }
                } // end of node.previousSibling
                else {
                    //
                    if (node.id != "") {
                        if (isResetValue != true) {
                            jsonObj.add(node.id, node.value);
                        }
                        if (isResetValue == true) { isClearValue = true; }
                        if (isClearValue == true) {
                            if (node.type != 'hidden') { //clearing non hiden controls 
                                $("#" + node.id).val('');
                            }
                        }
                    }
                }
            }
        }
    });

}

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

function isDateTimePicker(node) {
    var classNameKendoControl = "";
    if (node != null) {
        if (node.parentNode != null) {
            classNameKendoControl = node.parentNode.parentNode.className;
        }
    }
    return classNameKendoControl;
}

