/*
 * Kendo UI v2015.2.624 (http://www.telerik.com/kendo-ui)
 * Copyright 2015 Telerik AD. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
!function (e, define) {
    define(["./kendo.core", "./kendo.data", "./kendo.ooxml"], e)
}(function () {
    return function (e, t) {
        t.ExcelExporter = t.Class.extend({
            init: function (n) {
                var i, o;
                n.columns = this._trimColumns(n.columns || []), this.allColumns = e.map(this._leafColumns(n.columns || []), this._prepareColumn), this.columns = e.grep(this.allColumns, function (e) {
                    return !e.hidden
                }), this.options = n, i = n.dataSource, i instanceof t.data.DataSource ? (this.dataSource = new i.constructor(e.extend({}, i.options, {
                    page: n.allPages ? 0 : i.page(),
                    filter: i.filter(),
                    pageSize: n.allPages ? i.total() : i.pageSize(),
                    sort: i.sort(),
                    group: i.group(),
                    aggregate: i.aggregate()
                })), o = i.data(), o.length > 0 && (this.dataSource._data = o)) : this.dataSource = t.data.DataSource.create(i)
            },
            _trimColumns: function (t) {
                var n = this;
                return e.grep(t, function (e) {
                    var t = !!e.field;
                    return !t && e.columns && (t = n._trimColumns(e.columns).length > 0), t
                })
            },
            _leafColumns: function (e) {
                var t, n = [];
                for (t = 0; e.length > t; t++) e[t].columns ? n = n.concat(this._leafColumns(e[t].columns)) : n.push(e[t]);
                return n
            },
            workbook: function () {
                return e.Deferred(e.proxy(function (t) {
                    this.dataSource.fetch().then(e.proxy(function () {
                        var e = {
                            sheets: [{
                                columns: this._columns(),
                                rows: this._rows(),
                                freezePane: this._freezePane(),
                                filter: this._filter()
                            }]
                        };
                        t.resolve(e, this.dataSource.view())
                    }, this))
                }, this)).promise()
            },
            _prepareColumn: function (n) {
                var i, o;
                if (n.field) return i = function (e) {
                    return e.get(n.field)
                }, o = null, n.values && (o = {}, e.each(n.values, function () {
                    o[this.value] = this.text
                }), i = function (e) {
                    return o[e.get(n.field)]
                }), e.extend({}, n, {
                    value: i,
                    values: o,
                    groupHeaderTemplate: t.template(n.groupHeaderTemplate || "${title}: ${value}"),
                    groupFooterTemplate: n.groupFooterTemplate ? t.template(n.groupFooterTemplate) : null,
                    footerTemplate: n.footerTemplate ? t.template(n.footerTemplate) : null
                })
            },
            _filter: function () {
                if (!this.options.filterable) return null;
                var e = this._depth();
                return {
                    from: e,
                    to: e + this.columns.length - 1
                }
            },
            _dataRow: function (t, n, i) {
                var o, r, s, a, l, c, h, d, u, f;
                for (this._hierarchical() && (n = this.dataSource.level(t) + 1), o = [], r = 0; n > r; r++) o[r] = {
                    background: "#dfdfdf",
                    color: "#333"
                };
                if (i && t.items) return s = e.grep(this.allColumns, function (e) {
                    return e.field == t.field
                })[0], a = s && s.title ? s.title : t.field, l = s ? s.groupHeaderTemplate : null, c = a + ": " + t.value, h = e.extend({
                    title: a,
                    field: t.field,
                    value: s && s.values ? s.values[t.value] : t.value,
                    aggregates: t.aggregates
                }, t.aggregates[t.field]), l && (c = l(h)), o.push({
                    value: c,
                    background: "#dfdfdf",
                    color: "#333",
                    colSpan: this.columns.length + i - n
                }), d = this._dataRows(t.items, n + 1), d.unshift({
                    type: "group-header",
                    cells: o
                }), d.concat(this._footer(t));
                for (u = [], f = 0; this.columns.length > f; f++) u[f] = this._cell(t, this.columns[f]);
                return this._hierarchical() && (u[0].colSpan = i - n + 1), [{
                    type: "data",
                    cells: o.concat(u)
                }]
            },
            _dataRows: function (e, t) {
                var n, i = this._depth(),
                    o = [];
                for (n = 0; e.length > n; n++) o.push.apply(o, this._dataRow(e[n], t, i));
                return o
            },
            _footer: function (t) {
                var n = [],
                    i = !1,
                    o = e.map(this.columns, e.proxy(function (n) {
                        return n.groupFooterTemplate ? (i = !0, {
                            background: "#dfdfdf",
                            color: "#333",
                            value: n.groupFooterTemplate(e.extend({}, this.dataSource.aggregates(), t.aggregates, t.aggregates[n.field]))
                        }) : {
                            background: "#dfdfdf",
                            color: "#333"
                        }
                    }, this));
                return i && n.push({
                    type: "group-footer",
                    cells: e.map(Array(this.dataSource.group().length), function () {
                        return {
                            background: "#dfdfdf",
                            color: "#333"
                        }
                    }).concat(o)
                }), n
            },
            _isColumnVisible: function (e) {
                return this._visibleColumns([e]).length > 0 && (e.field || e.columns)
            },
            _visibleColumns: function (t) {
                var n = this;
                return e.grep(t, function (e) {
                    var t = !e.hidden;
                    return t && e.columns && (t = n._visibleColumns(e.columns).length > 0), t
                })
            },
            _headerRow: function (t, n) {
                var i = e.map(t.cells, function (e) {
                    return {
                        background: "#7a7a7a",
                        color: "#fff",
                        value: e.title,
                        colSpan: e.colSpan > 1 ? e.colSpan : 1,
                        rowSpan: t.rowSpan > 1 && !e.colSpan ? t.rowSpan : 1
                    }
                });
                return this._hierarchical() && (i[0].colSpan = this._depth() + 1), {
                    type: "header",
                    cells: e.map(Array(n.length), function () {
                        return {
                            background: "#7a7a7a",
                            color: "#fff"
                        }
                    }).concat(i)
                }
            },
            _prependHeaderRows: function (e) {
                var t, n = this.dataSource.group(),
                    i = [{
                        rowSpan: 1,
                        cells: [],
                        index: 0
                    }];
                for (this._prepareHeaderRows(i, this.options.columns), t = i.length - 1; t >= 0; t--) e.unshift(this._headerRow(i[t], n))
            },
            _prepareHeaderRows: function (e, t, n, i) {
                var o, r, s, a = i || e[e.length - 1],
                    l = e[a.index + 1],
                    c = 0;
                for (s = 0; t.length > s; s++) o = t[s], this._isColumnVisible(o) && (r = {
                    title: o.title || o.field,
                    colSpan: 0
                }, a.cells.push(r), o.columns && o.columns.length && (l || (l = {
                    rowSpan: 0,
                    cells: [],
                    index: e.length
                }, e.push(l)), r.colSpan = this._trimColumns(this._visibleColumns(o.columns)).length, this._prepareHeaderRows(e, o.columns, r, l), c += r.colSpan - 1, a.rowSpan = e.length - a.index));
                n && (n.colSpan += c)
            },
            _rows: function () {
                var t, n, i = this.dataSource.group(),
                    o = this._dataRows(this.dataSource.view(), 0);
                return this.columns.length && (this._prependHeaderRows(o), t = !1, n = e.map(this.columns, e.proxy(function (n) {
                    if (n.footerTemplate) {
                        t = !0;
                        var i = this.dataSource.aggregates();
                        return {
                            background: "#dfdfdf",
                            color: "#333",
                            value: n.footerTemplate(e.extend({}, i, i[n.field]))
                        }
                    }
                    return {
                        background: "#dfdfdf",
                        color: "#333"
                    }
                }, this)), t && o.push({
                    type: "footer",
                    cells: e.map(Array(i.length), function () {
                        return {
                            background: "#dfdfdf",
                            color: "#333"
                        }
                    }).concat(n)
                })), o
            },
            _headerDepth: function (e) {
                var t, n, i = 1,
                    o = 0;
                for (t = 0; e.length > t; t++) e[t].columns && (n = this._headerDepth(e[t].columns), n > o && (o = n));
                return i + o
            },
            _freezePane: function () {
                var t = this._visibleColumns(this.options.columns || []),
                    n = this._trimColumns(this._leafColumns(e.grep(t, function (e) {
                        return e.locked
                    }))).length;
                return {
                    rowSplit: this._headerDepth(t),
                    colSplit: n ? n + this.dataSource.group().length : 0
                }
            },
            _cell: function (e, t) {
                return {
                    value: t.value(e)
                }
            },
            _hierarchical: function () {
                return this.options.hierarchy && this.dataSource.level
            },
            _depth: function () {
                var e, t, n, i = this.dataSource,
                    o = 0;
                if (this._hierarchical()) {
                    for (e = i.view(), t = 0; e.length > t; t++) n = i.level(e[t]), n > o && (o = n);
                    o++
                } else o = i.group().length;
                return o
            },
            _columns: function () {
                var t = this._depth(),
                    n = e.map(Array(t), function () {
                        return {
                            width: 20
                        }
                    });
                return n.concat(e.map(this.columns, function (e) {
                    return {
                        width: parseInt(e.width, 10),
                        autoWidth: e.width ? !1 : !0
                    }
                }))
            }
        }), t.ExcelMixin = {
            extend: function (t) {
                t.events.push("excelExport"), t.options.excel = e.extend(t.options.excel, this.options), t.saveAsExcel = this.saveAsExcel
            },
            options: {
                proxyURL: "",
                allPages: !1,
                filterable: !1,
                fileName: "Export.xlsx"
            },
            saveAsExcel: function () {
                var n = this.options.excel || {},
                    i = new t.ExcelExporter({
                        columns: this.columns,
                        dataSource: this.dataSource,
                        allPages: n.allPages,
                        filterable: n.filterable,
                        hierarchy: n.hierarchy
                    });
                i.workbook().then(e.proxy(function (e, i) {
                    if (!this.trigger("excelExport", {
                            workbook: e,
                            data: i
                        })) {
                        var o = new t.ooxml.Workbook(e);
                        t.saveAs({
                            dataURI: o.toDataURL(),
                            fileName: e.fileName || n.fileName,
                            proxyURL: n.proxyURL,
                            forceProxy: n.forceProxy
                        })
                    }
                }, this))
            }
        }
    }(kendo.jQuery, kendo), window.kendo
}, "function" == typeof define && define.amd ? define : function (e, t) {
    t()
});
