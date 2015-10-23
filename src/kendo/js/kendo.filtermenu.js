/*
 * Kendo UI v2015.2.624 (http://www.telerik.com/kendo-ui)
 * Copyright 2015 Telerik AD. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
!function (e, define) {
    define(["./kendo.datepicker", "./kendo.numerictextbox", "./kendo.dropdownlist", "./kendo.binder"], e)
}(function () {
    return function (e, t) {
        function n(t, i) {
            t.filters && (t.filters = e.grep(t.filters, function (e) {
                return n(e, i), e.filters ? e.filters.length : e.field != i
            }))
        }

        function i(e) {
            var t, n, i, o, r, s;
            if (e && e.length)
                for (s = [], t = 0, n = e.length; n > t; t++) i = e[t], r = i.text || i.value || i, o = null == i.value ? i.text || i : i.value, s[t] = {
                    text: r,
                    value: o
                };
            return s
        }

        function o(t, n) {
            return e.grep(t, function (t) {
                return t.filters ? (t.filters = e.grep(t.filters, function (e) {
                    return e.field != n
                }), t.filters.length) : t.field != n
            })
        }

        function r(t, n) {
            t.filters && (t.filters = e.grep(t.filters, function (e) {
                return r(e, n), e.filters ? e.filters.length : e.field == n && "eq" == e.operator
            }))
        }

        function s(n) {
            return "and" == n.logic && n.filters.length > 1 ? [] : n.filters ? e.map(n.filters, function (e) {
                return s(e)
            }) : null !== n.value && n.value !== t ? [n.value] : []
        }

        function a(e, n) {
            for (var i, o, r = c.getter(n, !0), s = [], a = 0, l = {}; e.length > a;) i = e[a++], o = r(i), o === t || null === o || l.hasOwnProperty(o) || (s.push(i), l[o] = !0);
            return s
        }

        function l(e, t) {
            return function (n) {
                var i = e(n);
                return a(i, t)
            }
        }

        var c = window.kendo,
            h = c.ui,
            d = e.proxy,
            u = "kendoPopup",
            f = "init",
            p = "refresh",
            g = "change",
            m = ".kendoFilterMenu",
            v = "Is equal to",
            _ = "Is not equal to",
            y = {
                number: "numerictextbox",
                date: "datepicker"
            },
            w = {
                string: "text",
                number: "number",
                date: "date"
            },
            b = c.isFunction,
            x = h.Widget,
            k = '<div><div class="k-filter-help-text">#=messages.info#</div><label><input type="radio" data-#=ns#bind="checked: filters[0].value" value="true" name="filters[0].value"/>#=messages.isTrue#</label><label><input type="radio" data-#=ns#bind="checked: filters[0].value" value="false" name="filters[0].value"/>#=messages.isFalse#</label><div><button type="submit" class="k-button k-primary">#=messages.filter#</button><button type="reset" class="k-button">#=messages.clear#</button></div></div>',
            C = '<div><div class="k-filter-help-text">#=messages.info#</div><select data-#=ns#bind="value: filters[0].operator" data-#=ns#role="dropdownlist">#for(var op in operators){#<option value="#=op#">#=operators[op]#</option>#}#</select>#if(values){#<select data-#=ns#bind="value:filters[0].value" data-#=ns#text-field="text" data-#=ns#value-field="value" data-#=ns#source=\'#=kendo.stringify(values).replace(/\'/g,"&\\#39;")#\' data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#" data-#=ns#value-primitive="true"></select>#}else{#<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="text" #=role ? "data-" + ns + "role=\'" + role + "\'" : ""# />#}##if(extra){#<select class="k-filter-and" data-#=ns#bind="value: logic" data-#=ns#role="dropdownlist"><option value="and">#=messages.and#</option><option value="or">#=messages.or#</option></select><select data-#=ns#bind="value: filters[1].operator" data-#=ns#role="dropdownlist">#for(var op in operators){#<option value="#=op#">#=operators[op]#</option>#}#</select>#if(values){#<select data-#=ns#bind="value:filters[1].value" data-#=ns#text-field="text" data-#=ns#value-field="value" data-#=ns#source=\'#=kendo.stringify(values).replace(/\'/g,"&\\#39;")#\' data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#" data-#=ns#value-primitive="true"></select>#}else{#<input data-#=ns#bind="value: filters[1].value" class="k-textbox" type="text" #=role ? "data-" + ns + "role=\'" + role + "\'" : ""#/>#}##}#<div><button type="submit" class="k-button k-primary">#=messages.filter#</button><button type="reset" class="k-button">#=messages.clear#</button></div></div>',
            S = '<div data-#=ns#role="view" data-#=ns#init-widgets="false" class="k-grid-filter-menu"><div data-#=ns#role="header" class="k-header"><button class="k-button k-cancel">#=messages.cancel#</button>#=title#<button type="submit" class="k-button k-submit">#=messages.filter#</button></div><form class="k-filter-menu k-mobile-list"><ul class="k-filter-help-text"><li><span class="k-link">#=messages.info#</span><ul><li class="k-item"><label class="k-label">#=messages.operator#<select data-#=ns#bind="value: filters[0].operator">#for(var op in operators){#<option value="#=op#">#=operators[op]#</option>#}#</select></label></li><li class="k-item"><label class="k-label">#=messages.value##if(values){#<select data-#=ns#bind="value:filters[0].value"><option value="">#=messages.selectValue#</option>#for(var val in values){#<option value="#=values[val].value#">#=values[val].text#</option>#}#</select>#}else{#<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="#=inputType#" #=useRole ? "data-" + ns + "role=\'" + role + "\'" : ""# />#}#</label></li>#if(extra){#</ul><ul class="k-filter-help-text"><li><span class="k-link"></span><li class="k-item"><label class="k-label"><input type="radio" name="logic" class="k-check" data-#=ns#bind="checked: logic" value="and" />#=messages.and#</label></li><li class="k-item"><label class="k-label"><input type="radio" name="logic" class="k-check" data-#=ns#bind="checked: logic" value="or" />#=messages.or#</label></li></ul><ul class="k-filter-help-text"><li><span class="k-link"></span><li class="k-item"><label class="k-label">#=messages.operator#<select data-#=ns#bind="value: filters[1].operator">#for(var op in operators){#<option value="#=op#">#=operators[op]#</option>#}#</select></label></li><li class="k-item"><label class="k-label">#=messages.value##if(values){#<select data-#=ns#bind="value:filters[1].value"><option value="">#=messages.selectValue#</option>#for(var val in values){#<option value="#=values[val].value#">#=values[val].text#</option>#}#</select>#}else{#<input data-#=ns#bind="value:filters[1].value" class="k-textbox" type="#=inputType#" #=useRole ? "data-" + ns + "role=\'" + role + "\'" : ""# />#}#</label></li>#}#</ul></li><li class="k-button-container"><button type="reset" class="k-button">#=messages.clear#</button></li></ul></div></form></div>',
            T = '<div data-#=ns#role="view" data-#=ns#init-widgets="false" class="k-grid-filter-menu"><div data-#=ns#role="header" class="k-header"><button class="k-button k-cancel">#=messages.cancel#</button>#=title#<button type="submit" class="k-button k-submit">#=messages.filter#</button></div><form class="k-filter-menu k-mobile-list"><ul class="k-filter-help-text"><li><span class="k-link">#=messages.info#</span><ul><li class="k-item"><label class="k-label"><input class="k-check" type="radio" data-#=ns#bind="checked: filters[0].value" value="true" name="filters[0].value"/>#=messages.isTrue#</label></li><li class="k-item"><label class="k-label"><input class="k-check" type="radio" data-#=ns#bind="checked: filters[0].value" value="false" name="filters[0].value"/>#=messages.isFalse#</label></li></ul></li><li class="k-button-container"><button type="reset" class="k-button">#=messages.clear#</button></li></ul></form></div>',
            A = x.extend({
                init: function (t, n) {
                    var i, o, r, s, a = this,
                        l = "string";
                    x.fn.init.call(a, t, n), i = a.operators = n.operators || {}, t = a.element, n = a.options, n.appendToElement || (r = t.addClass("k-with-icon k-filterable").find(".k-grid-filter"), r[0] || (r = t.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter")), r.attr("tabindex", -1).on("click" + m, d(a._click, a))), a.link = r || e(), a.dataSource = n.dataSource, a.field = n.field || t.attr(c.attr("field")), a.model = a.dataSource.reader.model, a._parse = function (e) {
                        return e + ""
                    }, a.model && a.model.fields && (s = a.model.fields[a.field], s && (l = s.type || "string", s.parse && (a._parse = d(s.parse, s)))), n.values && (l = "enums"), a.type = l, i = i[l] || n.operators[l];
                    for (o in i) break;
                    a._defaultFilter = function () {
                        return {
                            field: a.field,
                            operator: o || "eq",
                            value: ""
                        }
                    }, a._refreshHandler = d(a.refresh, a), a.dataSource.bind(g, a._refreshHandler), n.appendToElement ? a._init() : a.refresh()
                },
                _init: function () {
                    var t, n = this,
                        i = n.options.ui,
                        o = b(i);
                    n.pane = n.options.pane, n.pane && (n._isMobile = !0), o || (t = i || y[n.type]), n._isMobile ? n._createMobileForm(t) : n._createForm(t), n.form.on("submit" + m, d(n._submit, n)).on("reset" + m, d(n._reset, n)), o && n.form.find(".k-textbox").removeClass("k-textbox").each(function () {
                        i(e(this))
                    }), n.form.find("[" + c.attr("role") + "=numerictextbox]").removeClass("k-textbox").end().find("[" + c.attr("role") + "=datetimepicker]").removeClass("k-textbox").end().find("[" + c.attr("role") + "=timepicker]").removeClass("k-textbox").end().find("[" + c.attr("role") + "=datepicker]").removeClass("k-textbox"), n.refresh(), n.trigger(f, {
                        field: n.field,
                        container: n.form
                    }), c.cycleForm(n.form)
                },
                _createForm: function (t) {
                    var n = this,
                        o = n.options,
                        r = n.operators || {},
                        s = n.type;
                    r = r[s] || o.operators[s], n.form = e('<form class="k-filter-menu"/>').html(c.template("boolean" === s ? k : C)({
                        field: n.field,
                        format: o.format,
                        ns: c.ns,
                        messages: o.messages,
                        extra: o.extra,
                        operators: r,
                        type: s,
                        role: t,
                        values: i(o.values)
                    })), o.appendToElement ? (n.element.append(n.form), n.popup = n.element.closest(".k-popup").data(u)) : n.popup = n.form[u]({
                        anchor: n.link,
                        open: d(n._open, n),
                        activate: d(n._activate, n),
                        close: function () {
                            n.options.closeCallback && n.options.closeCallback(n.element)
                        }
                    }).data(u), n.form.on("keydown" + m, d(n._keydown, n))
                },
                _createMobileForm: function (t) {
                    var n = this,
                        o = n.options,
                        r = n.operators || {},
                        s = n.type;
                    r = r[s] || o.operators[s], n.form = e("<div />").html(c.template("boolean" === s ? T : S)({
                        field: n.field,
                        title: o.title || n.field,
                        format: o.format,
                        ns: c.ns,
                        messages: o.messages,
                        extra: o.extra,
                        operators: r,
                        type: s,
                        role: t,
                        useRole: !c.support.input.date && "date" === s || "number" === s,
                        inputType: w[s],
                        values: i(o.values)
                    })), n.view = n.pane.append(n.form.html()), n.form = n.view.element.find("form"), n.view.element.on("click", ".k-submit", function (e) {
                        n.form.submit(), e.preventDefault()
                    }).on("click", ".k-cancel", function (e) {
                        n._closeForm(), e.preventDefault()
                    })
                },
                refresh: function () {
                    var e = this,
                        t = e.dataSource.filter() || {
                                filters: [],
                                logic: "and"
                            };
                    e.filterModel = c.observable({
                        logic: "and",
                        filters: [e._defaultFilter(), e._defaultFilter()]
                    }), e.form && c.bind(e.form.children().first(), e.filterModel), e._bind(t) ? e.link.addClass("k-state-active") : e.link.removeClass("k-state-active")
                },
                destroy: function () {
                    var e = this;
                    x.fn.destroy.call(e), e.form && (c.unbind(e.form), c.destroy(e.form), e.form.unbind(m), e.popup && (e.popup.destroy(), e.popup = null), e.form = null), e.view && (e.view.purge(), e.view = null), e.link.unbind(m), e._refreshHandler && (e.dataSource.unbind(g, e._refreshHandler), e.dataSource = null), e.element = e.link = e._refreshHandler = e.filterModel = null
                },
                _bind: function (e) {
                    var t, n, i, o, r = this,
                        s = e.filters,
                        a = !1,
                        l = 0,
                        c = r.filterModel;
                    for (t = 0, n = s.length; n > t; t++) o = s[t], o.field == r.field ? (c.set("logic", e.logic), i = c.filters[l], i || (c.filters.push({
                        field: r.field
                    }), i = c.filters[l]), i.set("value", r._parse(o.value)), i.set("operator", o.operator), l++, a = !0) : o.filters && (a = a || r._bind(o));
                    return a
                },
                _merge: function (t) {
                    var i, o, r, s = this,
                        a = t.logic || "and",
                        l = t.filters,
                        c = s.dataSource.filter() || {
                                filters: [],
                                logic: "and"
                            };
                    for (n(c, s.field), l = e.grep(l, function (e) {
                        return "" !== e.value && null != e.value
                    }), o = 0, r = l.length; r > o; o++) i = l[o], i.value = s._parse(i.value);
                    return l.length && (c.filters.length ? (t.filters = l, "and" !== c.logic && (c.filters = [{
                        logic: c.logic,
                        filters: c.filters
                    }], c.logic = "and"), c.filters.push(l.length > 1 ? t : l[0])) : (c.filters = l, c.logic = a)), c
                },
                filter: function (e) {
                    e = this._merge(e), e.filters.length && this.dataSource.filter(e)
                },
                clear: function () {
                    var t = this,
                        n = t.dataSource.filter() || {
                                filters: []
                            };
                    n.filters = e.grep(n.filters, function (e) {
                        return e.filters ? (e.filters = o(e.filters, t.field), e.filters.length) : e.field != t.field
                    }), n.filters.length || (n = null), t.dataSource.filter(n)
                },
                _submit: function (e) {
                    e.preventDefault(), e.stopPropagation(), this.filter(this.filterModel.toJSON()), this._closeForm()
                },
                _reset: function () {
                    this.clear(), this._closeForm()
                },
                _closeForm: function () {
                    this._isMobile ? this.pane.navigate("", this.options.animations.right) : this.popup.close()
                },
                _click: function (e) {
                    e.preventDefault(), e.stopPropagation(), this.popup || this.pane || this._init(), this._isMobile ? this.pane.navigate(this.view, this.options.animations.left) : this.popup.toggle()
                },
                _open: function () {
                    var t;
                    e(".k-filter-menu").not(this.form).each(function () {
                        t = e(this).data(u), t && t.close()
                    })
                },
                _activate: function () {
                    this.form.find(":kendoFocusable:first").focus()
                },
                _keydown: function (e) {
                    e.keyCode == c.keys.ESC && this.popup.close()
                },
                events: [f],
                options: {
                    name: "FilterMenu",
                    extra: !0,
                    appendToElement: !1,
                    type: "string",
                    operators: {
                        string: {
                            eq: v,
                            neq: _,
                            startswith: "Starts with",
                            contains: "Contains",
                            doesnotcontain: "Does not contain",
                            endswith: "Ends with"
                        },
                        number: {
                            eq: v,
                            neq: _,
                            gte: "Is greater than or equal to",
                            gt: "Is greater than",
                            lte: "Is less than or equal to",
                            lt: "Is less than"
                        },
                        date: {
                            eq: v,
                            neq: _,
                            gte: "Is after or equal to",
                            gt: "Is after",
                            lte: "Is before or equal to",
                            lt: "Is before"
                        },
                        enums: {
                            eq: v,
                            neq: _
                        }
                    },
                    messages: {
                        info: "Show items with value that:",
                        isTrue: "is true",
                        isFalse: "is false",
                        filter: "Filter",
                        clear: "Clear",
                        and: "And",
                        or: "Or",
                        selectValue: "-Select value-",
                        operator: "Operator",
                        value: "Value",
                        cancel: "Cancel"
                    },
                    animations: {
                        left: "slide",
                        right: "slide:right"
                    }
                }
            }),
            D = ".kendoFilterMultiCheck",
            P = c.data.DataSource,
            M = x.extend({
                init: function (t, n) {
                    var i, o;
                    x.fn.init.call(this, t, n), n = this.options, this.element = e(t), i = this.field = this.options.field || this.element.attr(c.attr("field")), o = n.checkSource, n.forceUnique ? (o = n.dataSource.options, delete o.pageSize, this.checkSource = P.create(o), this.checkSource.reader.data = l(this.checkSource.reader.data, this.field)) : this.checkSource = P.create(o), this.dataSource = n.dataSource, this.model = this.dataSource.reader.model, this._parse = function (e) {
                        return e + ""
                    }, this.model && this.model.fields && (i = this.model.fields[this.field], i && (i.parse && (this._parse = d(i.parse, i)), this.type = i.type || "string")), n.appendToElement ? this._init() : this._createLink(), this._refreshHandler = d(this.refresh, this), this.dataSource.bind(g, this._refreshHandler)
                },
                _createLink: function () {
                    var e = this.element,
                        t = e.addClass("k-with-icon k-filterable").find(".k-grid-filter");
                    t[0] || (t = e.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter")), this._link = t.attr("tabindex", -1).on("click" + m, d(this._click, this))
                },
                _init: function () {
                    var e = this,
                        t = this.options.forceUnique,
                        n = this.options;
                    this.pane = n.pane, this.pane && (this._isMobile = !0), this._createForm(), t && !this.checkSource.options.serverPaging && this.dataSource.data().length ? (this.checkSource.data(a(this.dataSource.data(), this.field)), this.refresh()) : (this._attachProgress(), this.checkSource.fetch(function () {
                        e.refresh.call(e)
                    })), this.options.forceUnique || (this.checkChangeHandler = function () {
                        e.container.empty(), e.refresh()
                    }, this.checkSource.bind(g, this.checkChangeHandler)), this.form.on("keydown" + D, d(this._keydown, this)).on("submit" + D, d(this._filter, this)).on("reset" + D, d(this._reset, this)), this.trigger(f, {
                        field: this.field,
                        container: this.form
                    })
                },
                _attachProgress: function () {
                    var e = this;
                    this._progressHandler = function () {
                        h.progress(e.container, !0)
                    }, this._progressHideHandler = function () {
                        h.progress(e.container, !1)
                    }, this.checkSource.bind("progress", this._progressHandler).bind("change", this._progressHideHandler)
                },
                _createForm: function () {
                    var t, n, i = this.options,
                        o = "<ul class='k-reset k-multicheck-wrap'></ul><button type='submit' class='k-button k-primary'>" + i.messages.filter + "</button>";
                    o += "<button type='reset' class='k-button'>" + i.messages.clear + "</button>", this.form = e('<form class="k-filter-menu"/>').html(o), this.container = this.form.find(".k-multicheck-wrap"), this._isMobile ? (this.view = this.pane.append(this.form.addClass("k-mobile-list").wrap("<div/>").parent().html()), t = this.view.element, this.form = t.find("form"), this.container = t.find(".k-multicheck-wrap"), n = this, t.on("click", ".k-primary", function (e) {
                        n.form.submit(), e.preventDefault()
                    }).on("click", "[type=reset]", function (e) {
                        n._reset(), e.preventDefault()
                    })) : i.appendToElement ? (this.popup = this.element.closest(".k-popup").data(u), this.element.append(this.form)) : this.popup = this.form.kendoPopup({
                        anchor: this._link
                    }).data(u)
                },
                createCheckAllItem: function () {
                    var t = this.options,
                        n = c.template(t.itemTemplate({
                            field: "all",
                            mobile: this._isMobile
                        })),
                        i = e(n({
                            all: t.messages.checkAll
                        }));
                    this.container.prepend(i), this.checkBoxAll = i.find(":checkbox").eq(0).addClass("k-check-all"), this.checkAllHandler = d(this.checkAll, this), this.checkBoxAll.on(g + D, this.checkAllHandler)
                },
                updateCheckAllState: function () {
                    if (this.checkBoxAll) {
                        var e = this.container.find(":checkbox:not(.k-check-all)").length == this.container.find(":checked:not(.k-check-all)").length;
                        this.checkBoxAll.prop("checked", e)
                    }
                },
                refresh: function (e) {
                    var t = this.options.forceUnique,
                        n = this.dataSource,
                        i = this.getFilterArray();
                    this._link && this._link.toggleClass("k-state-active", 0 !== i.length), this.form && (!e || !t || e.sender !== n || n.options.serverPaging || "itemchange" != e.action && "add" != e.action && "remove" != e.action || (this.checkSource.data(a(this.dataSource.data(), this.field)), this.container.empty()), this.container.is(":empty") && this.createCheckBoxes(), this.checkValues(i), this.trigger(p))
                },
                getFilterArray: function () {
                    var t, n = e.extend(!0, {}, {
                        filters: [],
                        logic: "and"
                    }, this.dataSource.filter());
                    return r(n, this.field), t = s(n)
                },
                createCheckBoxes: function () {
                    var e, t, n, i = this.options,
                        o = {
                            field: this.field,
                            format: i.format,
                            mobile: this._isMobile,
                            type: this.type
                        };
                    this.options.forceUnique ? i.values ? (e = i.values, o.valueField = "value", o.field = "text") : e = this.checkSource.data() : e = this.checkSource.view(), t = c.template(i.itemTemplate(o)), n = c.render(t, e), i.checkAll && (this.createCheckAllItem(), this.container.on(g + D, ":checkbox", d(this.updateCheckAllState, this))), this.container.append(n)
                },
                checkAll: function () {
                    var e = this.checkBoxAll.is(":checked");
                    this.container.find(":checkbox").prop("checked", e)
                },
                checkValues: function (t) {
                    var n = this;
                    e(e.grep(this.container.find(":checkbox").prop("checked", !1), function (i) {
                        var o, r, s = !1;
                        if (!e(i).is(".k-check-all"))
                            for (o = n._parse(e(i).val()), r = 0; t.length > r; r++)
                                if (s = "date" == n.type ? t[r].getTime() == o.getTime() : t[r] == o) return s
                    })).prop("checked", !0), this.updateCheckAllState()
                },
                _filter: function (t) {
                    var n, i;
                    t.preventDefault(), t.stopPropagation(), n = {
                        logic: "or"
                    }, i = this, n.filters = e.map(this.form.find(":checkbox:checked:not(.k-check-all)"), function (t) {
                        return {
                            value: e(t).val(),
                            operator: "eq",
                            field: i.field
                        }
                    }), n = this._merge(n), n.filters.length && this.dataSource.filter(n), this._closeForm()
                },
                destroy: function () {
                    var e = this;
                    x.fn.destroy.call(e), e.form && (c.unbind(e.form), c.destroy(e.form), e.form.unbind(D), e.popup && (e.popup.destroy(), e.popup = null), e.form = null, e.container && (e.container.unbind(D), e.container = null), e.checkBoxAll && e.checkBoxAll.unbind(D)), e.view && (e.view.purge(), e.view = null), e._link && e._link.unbind(m), e._refreshHandler && (e.dataSource.unbind(g, e._refreshHandler), e.dataSource = null), e.checkChangeHandler && e.checkSource.unbind(g, e.checkChangeHandler), e._progressHandler && e.checkSource.unbind("progress", e._progressHandler), e._progressHideHandler && e.checkSource.unbind("change", e._progressHideHandler), e.element = e.checkSource = e.container = e.checkBoxAll = e._link = e._refreshHandler = e.checkAllHandler = null
                },
                options: {
                    name: "FilterMultiCheck",
                    itemTemplate: function (e) {
                        var n = e.field,
                            i = e.format,
                            o = e.valueField,
                            r = e.mobile,
                            s = "";
                        return o === t && (o = n), "date" == e.type && (s = ":yyyy-MM-ddTHH:mm:sszzz"), "<li class='k-item'><label class='k-label'><input type='checkbox' class='" + (r ? "k-check" : "") + "'  value='#:kendo.format('{0" + s + "}'," + o + ")#'/>#:kendo.format('" + (i ? i : "{0}") + "', " + n + ")#</label></li>"
                    },
                    checkAll: !0,
                    appendToElement: !1,
                    messages: {
                        checkAll: "Select All",
                        clear: "Clear",
                        filter: "Filter"
                    },
                    forceUnique: !0,
                    animations: {
                        left: "slide",
                        right: "slide:right"
                    }
                },
                events: [f, p]
            });
        e.extend(M.fn, {
            _click: A.fn._click,
            _keydown: A.fn._keydown,
            _reset: A.fn._reset,
            _closeForm: A.fn._closeForm,
            clear: A.fn.clear,
            _merge: A.fn._merge
        }), h.plugin(A), h.plugin(M)
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function (e, t) {
    t()
});