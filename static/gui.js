!(function(t) {
	function e(r) {
		if (i[r]) return i[r].exports;
		var o = (i[r] = {
			i: r,
			l: !1,
			exports: {}
		});
		return t[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
	}
	var i = {};
	(e.m = t),
	(e.c = i),
	(e.i = function(t) {
		return t;
	}),
	(e.d = function(t, i, r) {
		e.o(t, i) ||
			Object.defineProperty(t, i, {
				configurable: !1,
				enumerable: !0,
				get: r,
			});
	}),
	(e.n = function(t) {
		var i =
			t && t.__esModule ?
			function() {
				return t.default;
			} :
			function() {
				return t;
			};
		return e.d(i, "a", i), i;
	}),
	(e.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e);
	}),
	(e.p = ""),
	e((e.s = 23));
})([
	function(t, e, i) {
		"use strict";
		if ("undefined" == typeof AFRAME)
			throw new Error(
				"Component attempted to register before AFRAME was available."
			);
		AFRAME.registerComponent("bevelbox", {
			schema: {
				width: {
					type: "number",
					default: 1
				},
				height: {
					type: "number",
					default: 1
				},
				depth: {
					type: "number",
					default: 1
				},
				topLeftRadius: {
					type: "number",
					default: 1e-5
				},
				topRightRadius: {
					type: "number",
					default: 1e-5
				},
				bottomLeftRadius: {
					type: "number",
					default: 1e-5
				},
				bottomRightRadius: {
					type: "number",
					default: 1e-5
				},
				bevelEnabled: {
					type: "boolean",
					default: !0
				},
				bevelSegments: {
					type: "number",
					default: 2
				},
				steps: {
					type: "number",
					default: 1
				},
				bevelSize: {
					type: "number",
					default: 0.1
				},
				bevelOffset: {
					type: "number",
					default: 0
				},
				bevelThickness: {
					type: "number",
					default: 0.1
				},
			},
			multiple: !1,
			init: function() {
				var t = this.el,
					e = this.data,
					i = e.width,
					r = e.height,
					o = -e.width / 2,
					n = -e.height / 2,
					a = new THREE.Shape();
				a.moveTo(o, n + e.topLeftRadius),
					a.lineTo(o, n + r - e.topLeftRadius),
					a.quadraticCurveTo(o, n + r, o + e.topLeftRadius, n + r),
					a.lineTo(o + i - e.topRightRadius, n + r),
					a.quadraticCurveTo(o + i, n + r, o + i, n + r - e.topRightRadius),
					a.lineTo(o + i, n + e.bottomRightRadius),
					a.quadraticCurveTo(o + i, n, o + i - e.bottomRightRadius, n),
					a.lineTo(o + e.bottomLeftRadius, n),
					a.quadraticCurveTo(o, n, o, n + e.bottomLeftRadius);
				var s = this.extrude(a);
				t.setObject3D("mesh", s);
			},
			extrude: function(t) {
				var e = (this.el, this.data),
					i = {
						steps: e.steps,
						depth: e.depth,
						bevelEnabled: e.bevelEnabled,
						bevelThickness: e.bevelThickness,
						bevelSize: e.bevelSize,
						bevelOffset: e.bevelOffset,
						bevelSegments: e.bevelSegments,
					},
					r = new THREE.ExtrudeGeometry(t, i);
				return new THREE.Mesh(
					r,
					new THREE.MeshStandardMaterial({
						side: THREE.DoubleSide
					})
				);
			},
			update: function(t) {},
			remove: function() {},
			pause: function() {},
			play: function() {},
		});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-button", {
				schema: {
					on: {
						default: "click"
					},
					value: {
						type: "string",
						default: ""
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_offwhite
					},
					borderColor: {
						type: "string",
						default: key_offwhite
					},
					focusColor: {
						type: "string",
						default: key_orange_light
					},
					backgroundColor: {
						type: "string",
						default: key_grey
					},
					hoverColor: {
						type: "string",
						default: key_grey_dark
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
					toggle: {
						type: "boolean",
						default: !1
					},
					toggleState: {
						type: "boolean",
						default: !1
					},
				},
				dependencies: ["aframe-troika-text"],
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					if (((this.guiItem = i), t.fontSize > 20)) {
						var r = t.fontSize / 750;
						t.fontSize = r;
					}
					var o = e.getAttribute("gui-interactable");
					(this.guiInteractable = o),
					e.setAttribute(
							"geometry",
							"primitive: plane; \n                                     height: " +
							i.height +
							"; \n                                     width: " +
							i.width +
							";\n                                     "
						),
						e.setAttribute(
							"material",
							"shader: flat; \n                                     transparent: true; \n                                     opacity: 0.5; \n                                     side:double; \n                                     color:" +
							t.backgroundColor +
							";\n                                     "
						);
					var n = document.createElement("a-entity");
					if (i.bevel) {
						var a = 1 * i.bevelSize,
							s = i.bevelThickness;
						n.setAttribute(
								"bevelbox",
								"width: " +
								(i.width - i.width * a) +
								"; \n                                                      height: " +
								(i.height - i.height * a) +
								"; \n                                                      depth: " +
								(i.baseDepth - i.baseDepth * s) +
								";\n                                                      bevelThickness: 0;\n                                                      bevelSize: " +
								i.bevelSize +
								";\n                                                      "
							),
							n.setAttribute("position", "0 0 0");
					} else
						n.setAttribute(
							"geometry",
							"primitive: box; \n                                                      width: " +
							i.width +
							"; \n                                                      height: " +
							i.height +
							"; \n                                                      depth: " +
							i.baseDepth +
							";\n                                                      "
						),
						n.setAttribute("position", "0 0 " + i.baseDepth / 2);
					n.setAttribute("rotation", "0 0 0"),
						n.setAttribute(
							"material",
							"shader: flat; \n                                                  opacity: 1; \n                                                  side:double; \n                                                  color: " +
							t.borderColor +
							"\n                                                  "
						),
						e.appendChild(n),
						(this.buttonContainer = n);
					var l = document.createElement("a-entity");
					if (i.bevel) {
						var a = 1 * i.bevelSize,
							s = i.bevelThickness;
						l.setAttribute(
								"bevelbox",
								"width: " +
								(i.width - i.gap - (i.width - i.gap) * a) +
								"; \n                                                   height: " +
								(i.height - i.gap - (i.height - i.gap) * a) +
								"; \n                                                   depth: " +
								(i.depth - i.depth * s) +
								";\n                                                   bevelThickness: " +
								i.bevelThickness +
								";\n                                                   bevelSize: " +
								i.bevelSize +
								";\n                                                   "
							),
							l.setAttribute("position", "0 0 0");
					} else
						l.setAttribute(
							"geometry",
							"primitive: box; \n                                               width: " +
							(i.width - i.gap) +
							"; \n                                               height: " +
							(i.height - i.gap) +
							"; \n                                               depth: " +
							i.depth +
							";"
						),
						l.setAttribute("position", "0 0 " + i.depth / 2);
					l.setAttribute(
							"material",
							"shader: flat; \n                                               opacity: 1; \n                                               side:double; \n                                               color: " +
							(t.toggleState ? t.activeColor : t.backgroundColor) +
							"\n                                               "
						),
						l.setAttribute("rotation", "0 0 0"),
						e.appendChild(l),
						(this.buttonEntity = l),
						this.setText(t.value),
						e.addEventListener("mouseenter", function(e) {
							l.removeAttribute("animation__leave"),
								t.toggle ||
								l.setAttribute(
									"animation__enter",
									"property: material.color; from: " +
									t.backgroundColor +
									"; to:" +
									t.hoverColor +
									"; dur:200;"
								);
						}),
						e.addEventListener("mouseleave", function(e) {
							t.toggle ||
								(l.removeAttribute("animation__click"),
									l.setAttribute(
										"animation__leave",
										"property: material.color; from: " +
										t.hoverColor +
										"; to:" +
										t.backgroundColor +
										"; dur:200; easing: easeOutQuad;"
									)),
								l.removeAttribute("animation__enter");
						}),
						e.addEventListener("focus", function(e) {
							n.setAttribute("material", "color", "" + t.focusColor);
						}),
						e.addEventListener("blur", function(e) {
							n.setAttribute("material", "color", "" + t.borderColor),
								t.toggle ||
								(l.removeAttribute("animation__click"),
									l.setAttribute(
										"animation__leave",
										"property: material.color; from: " +
										t.hoverColor +
										"; to:" +
										t.backgroundColor +
										"; dur:200; easing: easeOutQuad;"
									)),
								l.removeAttribute("animation__enter");
						}),
						e.addEventListener(t.on, function(i) {
							if (t.toggle) {
								var r = e.components["gui-button"];
								r.setActiveState(!r.data.toggleState);
							} else l.setAttribute("animation__click", "property: material.color; from: " + t.activeColor + "; to:" + t.backgroundColor + "; dur:400; easing: easeOutQuad;");
							var n = o.clickAction,
								a = window[n];
							"function" == typeof a && a(i);
						}),
						e.addEventListener("keyup", function(i) {
							i.isComposing ||
								229 === i.keyCode ||
								((13 != i.keyCode && 32 != i.keyCode) || e.emit(t.on),
									i.preventDefault());
						}),
						e.setAttribute("role", "button"),
						e.setAttribute("tabindex", "0"),
						e.setAttribute("aria-label", t.value);
				},
				play: function() {},
				update: function(t) {
					var e = this.data,
						i = this.el,
						r = i.getAttribute("gui-item");
					if (
						((this.guiItem = r),
							i.setAttribute(
								"geometry",
								"primitive: plane; \n                                     height: " +
								r.height +
								"; \n                                     width: " +
								r.width +
								";\n                                     "
							),
							i.setAttribute(
								"material",
								"shader: flat; \n                                     transparent: true; \n                                     opacity: 0.5; \n                                     side:double; \n                                     color:" +
								e.backgroundColor +
								";\n                                     "
							),
							r.bevel)
					) {
						var o = 1 * r.bevelSize,
							n = r.bevelThickness;
						this.buttonContainer.setAttribute(
								"bevelbox",
								"width: " +
								(r.width - r.width * o) +
								"; \n                                                           height: " +
								(r.height - r.height * o) +
								"; \n                                                           depth: " +
								(r.baseDepth - r.baseDepth * n) +
								";\n                                                           bevelThickness: 0;\n                                                           bevelSize: " +
								r.bevelSize +
								";\n                                                           "
							),
							this.buttonContainer.setAttribute("position", "0 0 0");
					} else
						this.buttonContainer.setAttribute(
							"geometry",
							"primitive: box; \n                                                       width: " +
							r.width +
							"; \n                                                       height: " +
							r.height +
							"; \n                                                       depth: " +
							r.baseDepth +
							";\n                                                       "
						),
						this.buttonContainer.setAttribute(
							"position",
							"0 0 " + r.baseDepth / 2
						);
					if (
						(this.buttonContainer.setAttribute(
								"material",
								"shader: flat; \n                                                       opacity: 1; \n                                                       side:double; \n                                                       color: " +
								e.borderColor +
								"\n                                                       "
							),
							r.bevel)
					) {
						var o = 1 * r.bevelSize,
							n = r.bevelThickness;
						this.buttonEntity.setAttribute(
								"bevelbox",
								"width: " +
								(r.width - r.gap - (r.width - r.gap) * o) +
								"; \n                                                        height: " +
								(r.height - r.gap - (r.height - r.gap) * o) +
								"; \n                                                        depth: " +
								(r.depth - r.depth * n) +
								";\n                                                        bevelThickness: " +
								r.bevelThickness +
								";\n                                                        bevelSize: " +
								r.bevelSize +
								";\n                                                        "
							),
							this.buttonEntity.setAttribute("position", "0 0 0");
					} else
						this.buttonEntity.setAttribute(
							"geometry",
							"primitive: box; \n                                               width: " +
							(r.width - r.gap) +
							"; \n                                               height: " +
							(r.height - r.gap) +
							"; \n                                               depth: " +
							r.depth +
							";\n                                               "
						),
						this.buttonEntity.setAttribute("position", "0 0 " + r.depth / 2);
					if (
						(this.buttonEntity.setAttribute(
								"material",
								"shader: flat; \n                                                    opacity: 1; \n                                                    side:double; \n                                                    color: " +
								(e.toggleState ? e.activeColor : e.backgroundColor) +
								"\n                                                    "
							),
							this.textEntity)
					) {
						console.log("has textEntity: " + this.textEntity);
						var a = this.textEntity;
						a.parentNode.removeChild(a), this.setText(this.data.value);
					} else console.log("no textEntity!");
				},
				setActiveState: function(t) {
					(this.data.toggleState = t),
					t
						?
						(console.log("active, about to set active color"),
							this.buttonEntity.setAttribute(
								"material",
								"color",
								this.data.activeColor
							)) :
						(console.log("not active, about to set background color"),
							this.buttonEntity.setAttribute(
								"material",
								"color",
								this.data.backgroundColor
							));
				},
				setText: function(t) {
					var e = this.data,
						i = this.el,
						r = i.getAttribute("gui-item"),
						o = document.createElement("a-entity");
					(this.textEntity = o),
					o.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							e.fontColor +
							";                                                \n                                                font:" +
							e.fontFamily +
							";\n                                                fontSize:" +
							e.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							r.width / 1.05 +
							";\n                                                "
						),
						o.setAttribute("troika-text-material", "shader: flat;"),
						r.bevel ?
						o.setAttribute(
							"position",
							"0 0 " + (r.depth + r.bevelThickness / 2 + 0.05)
						) :
						o.setAttribute("position", "0 0 " + (r.depth / 2 + 0.05)),
						this.buttonEntity.appendChild(o);
				},
			}),
			AFRAME.registerPrimitive("a-gui-button", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "button"
					},
					"gui-button": {},
				},
				mappings: {
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					"key-code": "gui-interactable.keyCode",
					width: "gui-item.width",
					height: "gui-item.height",
					depth: "gui-item.depth",
					"base-depth": "gui-item.baseDepth",
					gap: "gui-item.gap",
					radius: "gui-item.radius",
					margin: "gui-item.margin",
					bevel: "gui-item.bevel",
					"bevel-segments": "gui-item.bevelSegments",
					steps: "gui-item.steps",
					"bevel-size": "gui-item.bevelSize",
					"bevel-offset": "gui-item.bevelOffset",
					"bevel-thickness": "gui-item.bevelThickness",
					on: "gui-button.on",
					value: "gui-button.value",
					"font-size": "gui-button.fontSize",
					"font-family": "gui-button.fontFamily",
					"font-color": "gui-button.fontColor",
					"border-color": "gui-button.borderColor",
					"focus-color": "gui-button.focusColor",
					"background-color": "gui-button.backgroundColor",
					"hover-color": "gui-button.hoverColor",
					"active-color": "gui-button.activeColor",
					toggle: "gui-button.toggle",
					"toggle-state": "gui-button.toggleState",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-circle-loader", {
				schema: {
					loaded: {
						type: "number",
						default: 0.5
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_grey
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					if (((this.guiItem = i), t.fontSize > 20)) {
						var r = t.fontSize / 750;
						t.fontSize = r;
					}
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.height + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; transparent: true; opacity: 1; side:back; color:" +
							t.backgroundColor +
							";"
						);
					var o = document.createElement("a-entity");
					o.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " + i.height / 2 + "; height: 0.02;"
						),
						o.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.backgroundColor
						),
						o.setAttribute("rotation", "90 0 0"),
						o.setAttribute("position", "0 0 0.01"),
						e.appendChild(o);
					var n = document.createElement("a-ring");
					n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.activeColor
						),
						n.setAttribute("radius-inner", "" + i.height / 3),
						n.setAttribute("radius-outer", "" + i.height / 2),
						n.setAttribute("theta-start", "90"),
						n.setAttribute("theta-length", "" + -360 * t.loaded),
						n.setAttribute("rotation", "0 0 0"),
						n.setAttribute("position", "0 0 0.04"),
						(n.id = "loader_ring"),
						e.appendChild(n),
						this.setText(t.loaded);
				},
				play: function() {},
				update: function(t) {
					this.data, this.el;
					if (this.textEntity) {
						console.log("has textEntity: " + this.textEntity);
						var e = this.textEntity;
						e.parentNode.removeChild(e), this.setText(this.data.loaded);
					} else console.log("no textEntity!");
				},
				setText: function(t) {
					var e = document.createElement("a-entity");
					(this.textEntity = e),
					e.setAttribute(
							"troika-text",
							"value: " +
							Math.round(100 * t) +
							"; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						e.setAttribute("position", "0 0 0.05"),
						this.el.appendChild(e);
				},
			}),
			AFRAME.registerPrimitive("a-gui-circle-loader", {
				defaultComponents: {
					"gui-item": {
						type: "circle-loader"
					},
					"gui-circle-loader": {},
				},
				mappings: {
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					loaded: "gui-circle-loader.loaded",
					"font-size": "gui-circle-loader.fontSize",
					"font-family": "gui-circle-loader.fontFamily",
					"font-color": "gui-circle-loader.fontColor",
					"background-color": "gui-circle-loader.backgroundColor",
					"active-color": "gui-circle-loader.activeColor",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-circle-timer", {
				schema: {
					countDown: {
						type: "number",
						default: 10
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_grey
					},
					borderColor: {
						type: "string",
						default: key_grey
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					this.guiItem = i;
					var r = e.getAttribute("gui-interactable");
					if (
						(console.log(
								"in timer callback, guiInteractable: " + JSON.stringify(r)
							),
							t.fontSize > 20)
					) {
						var o = t.fontSize / 750;
						t.fontSize = o;
					}
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.height + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; transparent: true; opacity: 1; side:back; color:" +
							t.backgroundColor +
							";"
						);
					var n = document.createElement("a-entity");
					n.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " + i.height / 2 + "; height: 0.02;"
						),
						n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.backgroundColor
						),
						n.setAttribute("rotation", "90 0 0"),
						n.setAttribute("position", "0 0 0.01"),
						e.appendChild(n);
					var a = document.createElement("a-ring");
					a.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						a.setAttribute("radius-inner", "" + i.height / 3),
						a.setAttribute("radius-outer", "" + i.height / 2),
						a.setAttribute("theta-start", "-1"),
						a.setAttribute("theta-length", "3"),
						a.setAttribute("position", "0 0 0.04"),
						e.appendChild(a);
					var s = document.createElement("a-ring");
					s.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						s.setAttribute("radius-inner", "" + i.height / 3),
						s.setAttribute("radius-outer", "" + i.height / 2),
						s.setAttribute("theta-start", "89"),
						s.setAttribute("theta-length", "3"),
						s.setAttribute("position", "0 0 0.04"),
						e.appendChild(s);
					var l = document.createElement("a-ring");
					l.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						l.setAttribute("radius-inner", "" + i.height / 3),
						l.setAttribute("radius-outer", "" + i.height / 2),
						l.setAttribute("theta-start", "179"),
						l.setAttribute("theta-length", "3"),
						l.setAttribute("position", "0 0 0.04"),
						e.appendChild(l);
					var u = document.createElement("a-ring");
					u.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						u.setAttribute("radius-inner", "" + i.height / 3),
						u.setAttribute("radius-outer", "" + i.height / 2),
						u.setAttribute("theta-start", "269"),
						u.setAttribute("theta-length", "3"),
						u.setAttribute("position", "0 0 0.04"),
						e.appendChild(u);
					var d = document.createElement("a-ring");
					d.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.activeColor
						),
						d.setAttribute("radius-inner", "" + i.height / 3),
						d.setAttribute("radius-outer", "" + i.height / 2),
						d.setAttribute("theta-start", "0"),
						d.setAttribute("theta-length", "0"),
						d.setAttribute("rotation", "0 180 90"),
						d.setAttribute("position", "0 0 0.03"),
						e.appendChild(d),
						(this.timerRing = d);
					this.initCount = t.countDown;
					this.setText(t.countDown);
				},
				update: function(t) {
					var e = this.data,
						i = this.el;
					if (0 !== Object.keys(t).length && e.countDown !== t.countDown) {
						i.getObject3D("mesh").material.color = e.color;
						var r = e.countDown,
							o = this.initCount,
							n = (Math.round((100 * (o - r)) / o) / 100) * 360;
						this.timerRing.setAttribute("theta-length", n),
							this.textEntity.setAttribute(
								"troika-text",
								"value: " + e.countDown + ";"
							),
							1 == r && console.log("fire callback on the last second");
					}
				},
				setText: function(t) {
					var e = document.createElement("a-entity");
					(this.textEntity = e),
					e.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						e.setAttribute("position", "0 0 0.05"),
						this.el.appendChild(e);
				},
				callback: function() {
					var t = this.el.getAttribute("gui-interactable"),
						e = t.clickAction;
					console.log("in timer callback, guiInteractable: " + JSON.stringify(t)),
						console.log("in button, clickActionFunctionName: " + e);
					var i = window[e];
					"function" == typeof i && i();
				},
			}),
			AFRAME.registerPrimitive("a-gui-circle-timer", {
				defaultComponents: {
					"gui-item": {
						type: "circle-timer"
					},
					"gui-circle-timer": {},
				},
				mappings: {
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					"count-down": "gui-circle-timer.countDown",
					"font-size": "gui-circle-timer.fontSize",
					"font-family": "gui-circle-timer.fontFamily",
					"font-color": "gui-circle-timer.fontColor",
					"border-color": "gui-circle-timer.borderColor",
					"background-color": "gui-circle-timer.backgroundColor",
					"active-color": "gui-circle-timer.activeColor",
					callback: "gui-interactable.clickAction",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-cursor", {
				schema: {
					color: {
						type: "string",
						default: key_white
					},
					hoverColor: {
						type: "string",
						default: key_white
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
					distance: {
						type: "number",
						default: -1
					},
					design: {
						type: "string",
						default: "dot"
					},
				},
				init: function() {
					var t = (this.cursor = this.el.getAttribute("cursor")),
						e = (this.fuse = t.fuse),
						i = t.fuseTimeout,
						r = this.el,
						o = this.data,
						n = 200,
						a = i - n;
					if (
						(AFRAME.utils.entity.setComponentProperty(
								r,
								"raycaster.interval",
								"500"
							),
							console.log("fuse: " + e + ", fuseTimeout: " + i),
							"dot" == o.design)
					) {
						r.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.000001; radiusOuter:0.025"
							),
							r.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							r.setAttribute("position", "0 0 " + o.distance),
							r.setAttribute(
								"animation__radiusInnerIn",
								"property: geometry.radiusInner; from: 0.000001; to:0.0225; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__radiusOuterIn",
								"property: geometry.radiusOuter; from: 0.025; to:0.0275; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__colorIn",
								"property: material.color; from: " +
								o.color +
								"; to:" +
								o.hoverColor +
								"; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__radiusInnerOut",
								"property: geometry.radiusInner; from: 0.0225; to:0.000001; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.setAttribute(
								"animation__radiusOuterOut",
								"property: geometry.radiusOuter; from: 0.0275; to:0.025; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.setAttribute(
								"animation__colorOut",
								"property: material.color; from: " +
								o.hoverColor +
								"; to:" +
								o.color +
								"; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.setAttribute(
								"animation__scale",
								"property: scale; from: 1 1 1; to:1.25 1.25 1.25; dur:200; easing:easeInQuad; startEvents: click"
							);
						var s = document.createElement("a-entity");
						if (
							(s.setAttribute(
									"geometry",
									"primitive: ring; radiusInner:0.0275; radiusOuter:0.03; thetaLength:360"
								),
								s.setAttribute(
									"material",
									"color: #000000; shader: flat; opacity:0.25;"
								),
								s.setAttribute("position", "0 0 0"),
								s.setAttribute(
									"animation__radiusInnerIn",
									"property: geometry.radiusInner; from: 0.0275; to:0.03; dur:" +
									n +
									"; easing:linear; startEvents: hovergui"
								),
								s.setAttribute(
									"animation__radiusOuterIn",
									"property: geometry.radiusOuter; from: 0.03; to:0.0325; dur:" +
									n +
									"; easing:linear; startEvents: hovergui"
								),
								s.setAttribute(
									"animation__radiusInnerOut",
									"property: geometry.radiusInner; from: 0.03; to:0.0275; dur:" +
									n +
									"; easing:linear; startEvents: leavegui"
								),
								s.setAttribute(
									"animation__radiusOuterOut",
									"property: geometry.radiusOuter; from: 0.0325; to:0.03; dur:" +
									n +
									"; easing:linear; startEvents: leavegui"
								),
								r.appendChild(s),
								(this.cursorShadow = s),
								e)
						) {
							var l = document.createElement("a-entity");
							l.setAttribute(
									"geometry",
									"primitive: ring; radiusInner:0.03; radiusOuter:0.0375; thetaLength:0"
								),
								l.setAttribute(
									"material",
									"color: " + o.activeColor + "; shader: flat; opacity:1;"
								),
								l.setAttribute("position", "0 0 0"),
								l.setAttribute(
									"animation",
									"property: geometry.thetaLength; from: 0; to:360; dur:" +
									a +
									"; delay: " +
									n +
									"; easing:linear; autoplay:false;"
								),
								r.appendChild(l),
								(this.fuseLoader = l);
						}
					} else if ("ring" == o.design) {
						r.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.0225; radiusOuter:0.0275"
							),
							r.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							r.setAttribute("position", "0 0 " + o.distance),
							r.setAttribute(
								"animation__radiusInnerIn",
								"property: geometry.radiusInner; from: 0.0225; to:0.025; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__radiusOuterIn",
								"property: geometry.radiusOuter; from: 0.0275; to:0.0325; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__colorIn",
								"property: material.color; from: " +
								o.color +
								"; to:" +
								o.hoverColor +
								"; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__radiusInnerOut",
								"property: geometry.radiusInner; from: 0.025; to:0.0225; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.setAttribute(
								"animation__radiusOuterOut",
								"property: geometry.radiusOuter; from: 0.0325; to:0.0275; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.setAttribute(
								"animation__colorOut",
								"property: material.color; from: " +
								o.hoverColor +
								"; to:" +
								o.color +
								"; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.setAttribute(
								"animation__scale",
								"property: scale; from: 1 1 1; to:1.25 1.25 1.25; dur:200; easing:easeInQuad; startEvents: click"
							);
						var s = document.createElement("a-entity");
						if (
							(s.setAttribute(
									"geometry",
									"primitive: ring; radiusInner:0.03; radiusOuter:0.0325; thetaLength:360"
								),
								s.setAttribute(
									"material",
									"color: #000000; shader: flat; opacity:0.25;"
								),
								s.setAttribute("position", "0 0 0"),
								s.setAttribute(
									"animation__radiusInnerIn",
									"property: geometry.radiusInner; from: 0.03; to:0.0325; dur:" +
									n +
									"; easing:linear; startEvents: hovergui"
								),
								s.setAttribute(
									"animation__radiusOuterIn",
									"property: geometry.radiusOuter; from: 0.0325; to:0.0375; dur:" +
									n +
									"; easing:linear; startEvents: hovergui"
								),
								s.setAttribute(
									"animation__radiusInnerOut",
									"property: geometry.radiusInner; from: 0.0325; to:0.03; dur:" +
									n +
									"; easing:linear; startEvents: leavegui"
								),
								s.setAttribute(
									"animation__radiusOuterOut",
									"property: geometry.radiusOuter; from: 0.0375; to:0.0325; dur:" +
									n +
									"; easing:linear; startEvents: leavegui"
								),
								r.appendChild(s),
								(this.cursorShadow = s),
								e)
						) {
							var l = document.createElement("a-entity");
							l.setAttribute(
									"geometry",
									"primitive: ring; radiusInner:0.035; radiusOuter:0.0425; thetaLength:0"
								),
								l.setAttribute(
									"material",
									"color: " + o.activeColor + "; shader: flat; opacity:1;"
								),
								l.setAttribute("position", "0 0 0"),
								l.setAttribute(
									"animation",
									"property: geometry.thetaLength; from: 0; to:360; dur:" +
									a +
									"; delay: " +
									n +
									"; easing:linear; autoplay:false;"
								),
								r.appendChild(l),
								(this.fuseLoader = l);
						}
					} else if ("reticle" == o.design) {
						r.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180;"
							),
							r.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							r.setAttribute("position", "0 0 " + o.distance),
							r.setAttribute(
								"animation__opacityIn",
								"property: material.opacity; from: 1; to: 0; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__opacityOut",
								"property: material.opacity; from: 0; to: 1; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							);
						var u = document.createElement("a-entity");
						u.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180; thetaStart:180;"
							),
							u.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							u.setAttribute("position", "0 0 0"),
							u.setAttribute(
								"animation__opacityIn",
								"property: material.opacity; from: 0.25; to: 0; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							u.setAttribute(
								"animation__opacityOut",
								"property: material.opacity; from: 0; to: 0.25; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.appendChild(u),
							(this.cursorCenter = u);
						var s = document.createElement("a-entity");
						s.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.0125; radiusOuter:0.0145"
							),
							s.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							s.setAttribute("position", "0 0 0"),
							s.setAttribute(
								"animation__colorIn",
								"property: material.color; from: #000000; to: " +
								o.color +
								"; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							s.setAttribute(
								"animation__opacityIn",
								"property: material.opacity; from: 0.25; to: 1; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							s.setAttribute(
								"animation__colorOut",
								"property: material.color; from: " +
								o.color +
								"; to: #000000; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							s.setAttribute(
								"animation__opacityOut",
								"property: material.opacity; from: 1; to: 0.25; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							),
							r.appendChild(s),
							(this.cursorShadow = s);
						var d = document.createElement("a-entity");
						d.setAttribute(
								"geometry",
								"primitive: plane; width:0.005; height:0.005;"
							),
							d.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							d.setAttribute("position", "-0.0325 0.0325 0"),
							r.appendChild(d),
							(this.cursorShadowTL = d);
						var c = document.createElement("a-entity");
						c.setAttribute(
								"geometry",
								"primitive: plane; width:0.005; height:0.005;"
							),
							c.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							c.setAttribute("position", "-0.0325 -0.0325 0"),
							r.appendChild(c),
							(this.cursorShadowBL = c);
						var h = document.createElement("a-entity");
						h.setAttribute(
								"geometry",
								"primitive: plane; width:0.005; height:0.005;"
							),
							h.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							h.setAttribute("position", "0.0325 0.0325 0"),
							r.appendChild(h),
							(this.cursorShadowTR = h);
						var f = document.createElement("a-entity");
						f.setAttribute(
								"geometry",
								"primitive: plane; width:0.005; height:0.005;"
							),
							f.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							f.setAttribute("position", "0.0325 -0.0325 0"),
							r.appendChild(f),
							(this.cursorShadowBR = f);
						var p = document.createElement("a-entity");
						p.setAttribute(
								"geometry",
								"primitive: plane; width:0.015; height:0.0035;"
							),
							p.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							p.setAttribute("position", "-0.03 0.0375 0"),
							r.appendChild(p),
							(this.cursorBoundTL = p);
						var g = document.createElement("a-entity");
						g.setAttribute(
								"geometry",
								"primitive: plane; width:0.0035; height:0.015;"
							),
							g.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							g.setAttribute("position", "-0.0375 0.03 0"),
							r.appendChild(g),
							(this.cursorBoundTL2 = g);
						var m = document.createElement("a-entity");
						m.setAttribute(
								"geometry",
								"primitive: plane; width:0.015; height:0.0035;"
							),
							m.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							m.setAttribute("position", "0.03 0.0375 0"),
							r.appendChild(m),
							(this.cursorBoundTR = m);
						var v = document.createElement("a-entity");
						v.setAttribute(
								"geometry",
								"primitive: plane; width:0.0035; height:0.015;"
							),
							v.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							v.setAttribute("position", "0.0375 0.03 0"),
							r.appendChild(v),
							(this.cursorBoundTR2 = v);
						var b = document.createElement("a-entity");
						b.setAttribute(
								"geometry",
								"primitive: plane; width:0.015; height:0.0035;"
							),
							b.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							b.setAttribute("position", "-0.03 -0.0375 0"),
							r.appendChild(b),
							(this.cursorBoundBL = b);
						var y = document.createElement("a-entity");
						y.setAttribute(
								"geometry",
								"primitive: plane; width:0.0035; height:0.015;"
							),
							y.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							y.setAttribute("position", "-0.0375 -0.03 0"),
							r.appendChild(y),
							(this.cursorBoundBL2 = y);
						var A = document.createElement("a-entity");
						A.setAttribute(
								"geometry",
								"primitive: plane; width:0.015; height:0.0035;"
							),
							A.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							A.setAttribute("position", "0.03 -0.0375 0"),
							r.appendChild(A),
							(this.cursorBoundBR = A);
						var w = document.createElement("a-entity");
						if (
							(w.setAttribute(
									"geometry",
									"primitive: plane; width:0.0035; height:0.015;"
								),
								w.setAttribute(
									"material",
									"color: " + o.color + "; shader: flat; opacity:1;"
								),
								w.setAttribute("position", "0.0375 -0.03 0"),
								r.appendChild(w),
								(this.cursorBoundBR2 = w),
								e)
						) {
							var l = document.createElement("a-entity");
							l.setAttribute(
									"geometry",
									"primitive: plane; width:0.000001; height:0.01;"
								),
								l.setAttribute(
									"material",
									"color: " + o.activeColor + "; shader: flat; opacity:1;"
								),
								l.setAttribute("position", "0 -0.05 0"),
								l.setAttribute(
									"animation",
									"property: geometry.width; from: 0; to: 0.075; dur:" +
									a +
									"; delay:" +
									n +
									"; easing:linear; autoplay:false;"
								),
								r.appendChild(l),
								(this.fuseLoader = l);
						}
					} else if ("cross" == o.design) {
						r.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.035; radiusOuter:0.0375"
							),
							r.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							r.setAttribute("position", "0 0 " + o.distance),
							r.setAttribute(
								"animation__radiusInnerIn",
								"property: geometry.radiusInner; from: 0.035; to: 0.0315; dur:" +
								n +
								"; easing:linear; startEvents: hovergui"
							),
							r.setAttribute(
								"animation__radiusInnerOut",
								"property: geometry.radiusInner; from: 0.0315; to: 0.035; dur:" +
								n +
								"; easing:linear; startEvents: leavegui"
							);
						var s = document.createElement("a-entity");
						s.setAttribute(
								"geometry",
								"primitive: ring; radiusInner:0.0375; radiusOuter:0.04; thetaLength:360"
							),
							s.setAttribute(
								"material",
								"color: #000000; shader: flat; opacity:0.25;"
							),
							s.setAttribute("position", "0 0 0"),
							r.appendChild(s),
							(this.cursorShadow = s);
						var k = document.createElement("a-entity");
						k.setAttribute(
								"geometry",
								"primitive: plane; width:0.0035; height:0.01875"
							),
							k.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							k.setAttribute("position", "0 0.028125 0"),
							k.setAttribute(
								"animation__widthIn",
								"property: geometry.width; from: 0.0035; to: 0.007; dur:" +
								a +
								"; easing:linear; startEvents: hovergui"
							),
							k.setAttribute(
								"animation__widthOut",
								"property: geometry.width; from: 0.007; to: 0.0035; dur:" +
								a +
								"; easing:linear; startEvents: leavegui"
							),
							r.appendChild(k),
							(this.cursorVerticalTop = k);
						var C = document.createElement("a-entity");
						C.setAttribute(
								"geometry",
								"primitive: plane; width:0.0035; height:0.01875"
							),
							C.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							C.setAttribute("position", "0 -0.028125 0"),
							C.setAttribute(
								"animation__widthIn",
								"property: geometry.width; from: 0.0035; to: 0.007; dur:" +
								a +
								"; easing:linear; startEvents: hovergui"
							),
							C.setAttribute(
								"animation__widthOut",
								"property: geometry.width; from: 0.007; to: 0.0035; dur:" +
								a +
								"; easing:linear; startEvents: leavegui"
							),
							r.appendChild(C),
							(this.cursorVerticalBottom = C);
						var x = document.createElement("a-entity");
						x.setAttribute(
								"geometry",
								"primitive: plane; width:0.01875; height:0.0035"
							),
							x.setAttribute(
								"material",
								"color: " + o.color + "; shader: flat; opacity:1;"
							),
							x.setAttribute("position", "-0.028125 0 0"),
							x.setAttribute(
								"animation__heightIn",
								"property: geometry.height; from: 0.0035; to: 0.007; dur:" +
								a +
								"; easing:linear; startEvents: hovergui"
							),
							x.setAttribute(
								"animation__heightOut",
								"property: geometry.height; from: 0.007; to: 0.0035; dur:" +
								a +
								"; easing:linear; startEvents: leavegui"
							),
							r.appendChild(x),
							(this.cursorHorizontalLeft = x);
						var S = document.createElement("a-entity");
						if (
							(S.setAttribute(
									"geometry",
									"primitive: plane; width:0.01875; height:0.0035"
								),
								S.setAttribute(
									"material",
									"color: " + o.color + "; shader: flat; opacity:1;"
								),
								S.setAttribute("position", "0.028125 0 0"),
								S.setAttribute(
									"animation__heightIn",
									"property: geometry.height; from: 0.0035; to: 0.007; dur:" +
									a +
									"; easing:linear; startEvents: hovergui"
								),
								S.setAttribute(
									"animation__heightOut",
									"property: geometry.height; from: 0.007; to: 0.0035; dur:" +
									a +
									"; easing:linear; startEvents: leavegui"
								),
								r.appendChild(S),
								(this.cursorHorizontalRight = S),
								e)
						) {
							var l = document.createElement("a-entity");
							l.setAttribute(
									"geometry",
									"primitive: ring; radiusInner:0.0415; radiusOuter:0.0485; thetaLength:0"
								),
								l.setAttribute(
									"material",
									"color: " + o.activeColor + "; shader: flat; opacity:1;"
								),
								l.setAttribute("position", "0 0 0"),
								l.setAttribute(
									"animation",
									"property: geometry.thetaLength; from: 0; to: 360; dur:" +
									a +
									"; delay:" +
									n +
									"; easing:linear; autoplay:false;"
								),
								r.appendChild(l),
								(this.fuseLoader = l);
						}
					}
					r.addEventListener("mouseenter", function() {
							console.log("in gui-cursor mousenter, el: " + r),
								r.emit("hovergui"),
								"dot" == o.design || "ring" == o.design ?
								s.emit("hovergui") :
								"cross" == o.design ?
								(s.emit("hovergui"),
									k.emit("hovergui"),
									C.emit("hovergui"),
									x.emit("hovergui"),
									S.emit("hovergui")) :
								"reticle" == o.design &&
								(centerHoverAniOpacity.emit("hovergui"),
									cursorHoverAniColor.emit("hovergui"),
									cursorHoverAniOpacity.emit("hovergui"));
						}),
						r.addEventListener("mouseleave", function() {
							console.log("in gui-cursor mouseleave, el: " + r),
								r.emit("leavegui"),
								"dot" == o.design || "ring" == o.design ?
								s.emit("leavegui") :
								"cross" == o.design ?
								(k.emit("leavegui"),
									C.emit("leavegui"),
									x.emit("leavegui"),
									S.emit("leavegui")) :
								"reticle" == o.design &&
								(centerHoverAniOpacity.emit("leavegui"),
									cursorHoverAniColor.emit("leavegui"),
									cursorHoverAniOpacity.emit("leavegui")),
								e &&
								(l.object3D.el.components.animation.animation.pause(),
									l.object3D.el.components.animation.animation.seek(0)),
								r.setAttribute("scale", "1 1 1");
						}),
						e &&
						r.addEventListener("fusing", function() {
							l.object3D.el.components.animation.animation.play();
						}),
						r.addEventListener("stateremoved", function(t) {
							console.log("evt.detail " + t.detail),
								"cursor-fusing" === t.detail.state || "cursor-fusing" === t.detail ?
								"dot" == o.design || "ring" == o.design || "cross" == o.design ?
								e &&
								(l.object3D.el.components.animation.animation.pause(),
									l.object3D.el.components.animation.animation.seek(0),
									AFRAME.utils.entity.setComponentProperty(
										l,
										"geometry.thetaLength",
										"0"
									)) :
								"reticle" == o.design &&
								e &&
								(l.object3D.el.components.animation.animation.pause(),
									l.object3D.el.components.animation.animation.seek(0),
									AFRAME.utils.entity.setComponentProperty(
										l,
										"geometry.width",
										"0.000001"
									)) :
								("cursor-hovering" !== t.detail.state &&
									"cursor-hovering" !== t.detail) ||
								("dot" == o.design || "ring" == o.design ?
									(AFRAME.utils.entity.setComponentProperty(
											this,
											"scale",
											"1 1 1"
										),
										e &&
										AFRAME.utils.entity.setComponentProperty(
											l,
											"geometry.thetaLength",
											"0"
										)) :
									"cross" == o.design ?
									e &&
									AFRAME.utils.entity.setComponentProperty(
										l,
										"geometry.thetaLength",
										"0"
									) :
									"reticle" == o.design &&
									e &&
									AFRAME.utils.entity.setComponentProperty(
										l,
										"geometry.width",
										"0.000001"
									));
						});
				},
				update: function() {},
				tick: function() {},
				remove: function() {},
				pause: function() {},
				play: function() {},
			}),
			AFRAME.registerPrimitive("a-gui-cursor", {
				defaultComponents: {
					cursor: {},
					"gui-cursor": {}
				},
				mappings: {
					fuse: "cursor.fuse",
					"fuse-timeout": "cursor.fuseTimeout",
					color: "gui-cursor.color",
					"hover-color": "gui-cursor.hoverColor",
					"active-color": "gui-cursor.activeColor",
					distance: "gui-cursor.distance",
					design: "gui-cursor.design",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		var r = function(t, e) {
			new MutationObserver(function(t, i) {
				t.forEach(function(t) {
					console.log(t), t.addedNodes.length && e(t.target, t.addedNodes);
				});
			}).observe(t, {
				childList: !0
			});
		};
		AFRAME.registerComponent("gui-flex-container", {
				schema: {
					flexDirection: {
						type: "string",
						default: "row"
					},
					justifyContent: {
						type: "string",
						default: "flexStart"
					},
					alignItems: {
						type: "string",
						default: "flexStart"
					},
					itemPadding: {
						type: "number",
						default: 0
					},
					opacity: {
						type: "number",
						default: 0
					},
					isTopContainer: {
						type: "boolean",
						default: !1
					},
					panelColor: {
						type: "string",
						default: key_grey
					},
					panelRounded: {
						type: "number",
						default: 0.05
					},
					styles: {
						fontFamily: {
							type: "string",
							default: "Helvetica"
						},
						fontColor: {
							type: "string",
							default: key_offwhite
						},
						borderColor: {
							type: "string",
							default: key_offwhite
						},
						backgroundColor: {
							type: "string",
							default: key_grey
						},
						hoverColor: {
							type: "string",
							default: key_grey_dark
						},
						activeColor: {
							type: "string",
							default: key_orange
						},
						handleColor: {
							type: "string",
							default: key_offwhite
						},
					},
				},
				init: function() {
					console.log(
						"in aframe-gui-component init for: " + this.el.getAttribute("id")
					);
					var t = this.el.getAttribute("gui-item");
					this.data.isTopContainer ?
						this.setBackground() :
						this.el.setAttribute(
							"rounded",
							"height: " +
							t.height +
							"; width: " +
							t.width +
							"; opacity: " +
							this.data.opacity +
							"; color: " +
							this.data.panelColor +
							"; radius:" +
							this.data.panelRounded +
							"; depthWrite:false; polygonOffset:true; polygonOffsetFactor: 1;"
						),
						(this.children = this.el.getChildEntities());
					var e = 0,
						i = 0;
					if ("row" == this.data.flexDirection) {
						if ("flexStart" == this.data.justifyContent) e = 0;
						else if (
							"center" == this.data.justifyContent ||
							"flexEnd" == this.data.justifyContent
						) {
							for (var o = 0, n = 0; n < this.children.length; n++) {
								var a = this.children[n],
									s = a.getAttribute("gui-item");
								o = o + s.margin.w + s.width + s.margin.y;
							}
							"center" == this.data.justifyContent ?
								(e = 0.5 * (t.width - o)) :
								"flexEnd" == this.data.justifyContent && (e = t.width - o);
						}
						"center" == this.data.alignItems ?
							(i = t.height) :
							"flexStart" == this.data.alignItems ?
							(i = 0) :
							"flexEnd" == this.data.alignItems && (i = t.height);
					} else if ("column" == this.data.flexDirection) {
						if ("flexStart" == this.data.justifyContent) i = 0;
						else if (
							"center" == this.data.justifyContent ||
							"flexEnd" == this.data.justifyContent
						) {
							for (var l = 0, n = 0; n < this.children.length; n++) {
								var a = this.children[n],
									s = a.getAttribute("gui-item");
								l = l + s.margin.x + s.height + s.margin.z;
							}
							"center" == this.data.justifyContent ?
								(i = 0.5 * (t.height - l)) :
								"flexEnd" == this.data.justifyContent && (i = t.height - l);
						}
						"flexStart" == this.data.alignItems ?
							(e = 0) :
							"center" == this.data.alignItems ?
							(e = 0.5 * t.width) :
							"flexEnd" == this.data.alignItems && (e = 0);
					}
					for (var n = 0; n < this.children.length; n++) {
						var a = this.children[n],
							u = 0,
							d = 0,
							s = a.getAttribute("gui-item");
						if (s) {
							"row" == this.data.flexDirection ?
								("center" == this.data.alignItems ?
									(d = 0) :
									"flexStart" == this.data.alignItems ?
									(d = 0.5 * t.height - s.margin.x - s.height) :
									"flexEnd" == this.data.alignItems &&
									(d = 0.5 * -t.height + s.margin.z + s.height),
									(u = 0.5 * -t.width + e + s.margin.w + 0.5 * s.width),
									(e = e + s.margin.w + s.width + s.margin.y)) :
								"column" == this.data.flexDirection &&
								("center" == this.data.alignItems ?
									(u = 0) :
									"flexStart" == this.data.alignItems ?
									(u = 0.5 * -t.width + s.margin.w + 0.5 * s.width) :
									"flexEnd" == this.data.alignItems &&
									(u = 0.5 * t.width - s.margin.y - 0.5 * s.width),
									(d = 0.5 * t.height - i - -s.margin.x - 0.5 * s.height),
									(i = i + s.margin.x + s.height + s.margin.z)),
								a.setAttribute("position", u + " " + d + " " + 0.01),
								a.setAttribute(
									"geometry",
									"primitive: plane; height: " +
									s.height +
									"; width: " +
									s.width +
									";"
								);
							var c = a.components["gui-flex-container"];
							c && c.setBackground();
						}
					}
					r(this.el, function(t, e) {
						e[0];
						e[0].addEventListener("loaded", function(e) {
							t.components["gui-flex-container"].init();
						});
					});
				},
				update: function() {},
				tick: function() {},
				remove: function() {},
				pause: function() {},
				play: function() {},
				getElementSize: function() {},
				setBackground: function() {
					if (this.data.opacity > 0) {
						console.log(
							"panel position: " +
							JSON.stringify(this.el.getAttribute("position"))
						);
						var t = this.el.getAttribute("gui-item"),
							e = document.createElement("a-entity");
						e.setAttribute(
								"rounded",
								"height: " +
								t.height +
								"; width: " +
								t.width +
								"; opacity: " +
								this.data.opacity +
								"; color: " +
								this.data.panelColor +
								"; radius:" +
								this.data.panelRounded +
								"; depthWrite:false; polygonOffset:true; polygonOffsetFactor: 2;"
							),
							console.log(
								"about to set panel background color to: : " +
								this.data.panelColor
							),
							e.setAttribute(
								"position",
								this.el.getAttribute("position").x +
								" " +
								this.el.getAttribute("position").y +
								" " +
								(this.el.getAttribute("position").z - 0.0125)
							),
							e.setAttribute(
								"rotation",
								this.el.getAttribute("rotation").x +
								" " +
								this.el.getAttribute("rotation").y +
								" " +
								this.el.getAttribute("rotation").z
							),
							this.el.parentNode.insertBefore(e, this.el);
					}
				},
			}),
			AFRAME.registerPrimitive("a-gui-flex-container", {
				defaultComponents: {
					"gui-item": {
						type: "flex-container"
					},
					"gui-flex-container": {},
				},
				mappings: {
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					"flex-direction": "gui-flex-container.flexDirection",
					"justify-content": "gui-flex-container.justifyContent",
					"align-items": "gui-flex-container.alignItems",
					"item-padding": "gui-flex-container.itemPadding",
					opacity: "gui-flex-container.opacity",
					"is-top-container": "gui-flex-container.isTopContainer",
					"panel-color": "gui-flex-container.panelColor",
					"panel-rounded": "gui-flex-container.panelRounded",
					"font-family": "gui-flex-container.styles.fontFamily",
					"font-color": "gui-flex-container.styles.fontColor",
					"border-color": "gui-flex-container.styles.borderColor",
					"background-color": "gui-flex-container.styles.backgroundColor",
					"hover-color": "gui-flex-container.styles.hoverColor",
					"active-color": "gui-flex-container.styles.activeColor",
					"handle-color": "gui-flex-container.styles.handleColor",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-icon-button", {
				schema: {
					on: {
						default: "click"
					},
					toggle: {
						type: "boolean",
						default: !1
					},
					toggleState: {
						type: "boolean",
						default: !1
					},
					icon: {
						type: "string",
						default: "f0f3"
					},
					iconActive: {
						type: "string",
						default: ""
					},
					iconFontSize: {
						type: "number",
						default: 0.4
					},
					iconFont: {
						type: "string",
						default: "assets/fonts/fa-regular-400.ttf",
					},
					fontColor: {
						type: "string",
						default: key_offwhite
					},
					borderColor: {
						type: "string",
						default: key_offwhite
					},
					backgroundColor: {
						type: "string",
						default: key_grey
					},
					hoverColor: {
						type: "string",
						default: key_grey_dark
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					this.guiItem = i;
					var r =
						((this.toggleState = t.toggle), e.getAttribute("gui-interactable"));
					if (((this.guiInteractable = r), t.iconFontSize > 20)) {
						var o = t.iconFontSize / 750;
						t.iconFontSize = o;
					}
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.width + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; transparent: true; opacity: 0.0; alphaTest: 0.5; side:double; color:" +
							t.backgroundColor +
							";"
						);
					var n = document.createElement("a-entity");
					n.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " + i.height / 2 + "; height: 0.02;"
						),
						n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						n.setAttribute("rotation", "90 0 0"),
						n.setAttribute("position", "0 0 0.01"),
						e.appendChild(n);
					var a = document.createElement("a-entity");
					a.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " + i.height / 2.05 + "; height: 0.04;"
						),
						a.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.backgroundColor
						),
						a.setAttribute("rotation", "90 0 0"),
						a.setAttribute("position", "0 0 0.02"),
						e.appendChild(a),
						(this.buttonEntity = a),
						this.setIcon(t.icon),
						e.addEventListener("mouseenter", function(e) {
							a.removeAttribute("animation__leave"),
								t.toggle ||
								a.setAttribute(
									"animation__enter",
									"property: material.color; from: " +
									t.backgroundColor +
									"; to:" +
									t.hoverColor +
									"; dur:200;"
								);
						}),
						e.addEventListener("mouseleave", function(e) {
							t.toggle ||
								(a.removeAttribute("animation__click"),
									a.setAttribute(
										"animation__leave",
										"property: material.color; from: " +
										t.hoverColor +
										"; to:" +
										t.backgroundColor +
										"; dur:200; easing: easeOutQuad;"
									)),
								a.removeAttribute("animation__enter");
						}),
						e.addEventListener(t.on, function(i) {
							if (t.toggle) {
								var o = e.components["gui-button"];
								o.setActiveState(!o.data.toggleState);
							} else a.setAttribute("animation__click", "property: material.color; from: " + t.activeColor + "; to:" + t.backgroundColor + "; dur:400; easing: easeOutQuad;");
							var n = r.clickAction,
								s = window[n];
							"function" == typeof s && s(i);
						}),
						e.setAttribute("role", "button");
				},
				play: function() {},
				update: function(t) {
					console.log("In button update, toggle: " + this.toggleState);
					this.data, this.el;
					if (this.iconEntity) {
						console.log("has iconEntity: " + this.iconEntity);
						var e = this.iconEntity;
						e.parentNode.removeChild(e), this.setIcon(this.data.icon);
					} else console.log("no iconEntity!");
				},
				setActiveState: function(t) {
					(this.data.toggleState = t),
					t
						?
						(console.log("active, about to set active color"),
							this.buttonEntity.setAttribute(
								"material",
								"color",
								this.data.activeColor
							)) :
						(console.log("not active, about to set background color"),
							this.buttonEntity.setAttribute(
								"material",
								"color",
								this.data.backgroundColor
							));
				},
				setIcon: function(t) {
					var e = parseInt(t, 16),
						i = String.fromCharCode(e),
						r = document.createElement("a-entity");
					(this.iconEntity = r),
					r.setAttribute(
							"troika-text",
							"value:" +
							i +
							"; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                lineHeight:" +
							this.guiItem.height +
							";\n                                                maxWidth:" +
							this.guiItem.width +
							";\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.iconFont +
							";\n                                                fontSize:" +
							this.data.iconFontSize +
							";\n                                                depthOffset:1;\n                                                "
						),
						r.setAttribute("position", "0 0 0.05"),
						this.el.appendChild(r);
				},
			}),
			AFRAME.registerPrimitive("a-gui-icon-button", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "icon-button"
					},
					"gui-icon-button": {},
				},
				mappings: {
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					"key-code": "gui-interactable.keyCode",
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					on: "gui-icon-button.on",
					"font-color": "gui-icon-button.fontColor",
					"font-family": "gui-icon-button.fontFamily",
					"border-color": "gui-icon-button.borderColor",
					"background-color": "gui-icon-button.backgroundColor",
					"hover-color": "gui-icon-button.hoverColor",
					"active-color": "gui-icon-button.activeColor",
					icon: "gui-icon-button.icon",
					"icon-active": "gui-icon-button.iconActive",
					"icon-font": "gui-icon-button.iconFont",
					"icon-font-size": "gui-icon-button.iconFontSize",
					toggle: "gui-icon-button.toggle",
					"toggle-state": "gui-icon-button.toggleState",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-icon-label-button", {
				schema: {
					on: {
						default: "click"
					},
					toggle: {
						type: "boolean",
						default: !1
					},
					toggleState: {
						type: "boolean",
						default: !1
					},
					icon: {
						type: "string",
						default: "f0f3"
					},
					iconActive: {
						type: "string",
						default: ""
					},
					iconFontSize: {
						type: "number",
						default: 0.35
					},
					iconFont: {
						type: "string",
						default: "assets/fonts/fa-regular-400.ttf",
					},
					value: {
						type: "string",
						default: ""
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_offwhite
					},
					borderColor: {
						type: "string",
						default: key_offwhite
					},
					backgroundColor: {
						type: "string",
						default: key_grey
					},
					hoverColor: {
						type: "string",
						default: key_grey_dark
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					this.guiItem = i;
					var r =
						((this.toggleState = t.toggle), e.getAttribute("gui-interactable"));
					if (((this.guiInteractable = r), t.iconFontSize > 20)) {
						var o = t.iconFontSize / 750;
						t.iconFontSize = o;
					}
					if (t.fontSize > 20) {
						var o = t.fontSize / 750;
						t.fontSize = o;
					}
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.width + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; side:front; color:" + t.backgroundColor + ";"
						);
					var n = document.createElement("a-entity");
					n.setAttribute(
							"geometry",
							"primitive: box; width: " +
							i.width +
							"; height: " +
							i.height +
							"; depth: 0.02;"
						),
						n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						n.setAttribute("rotation", "0 0 0"),
						n.setAttribute("position", "0 0 0.01"),
						e.appendChild(n);
					var a = document.createElement("a-entity");
					a.setAttribute(
							"geometry",
							"primitive: box; width: " +
							(i.width - 0.025) +
							"; height: " +
							(i.height - 0.025) +
							"; depth: 0.04;"
						),
						a.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							(t.toggleState ? t.activeColor : t.backgroundColor)
						),
						a.setAttribute("rotation", "0 0 0"),
						a.setAttribute("position", "0 0 0.02"),
						e.appendChild(a),
						(this.buttonEntity = a),
						this.setIcon(t.icon),
						"" != t.value && this.setText(t.value),
						e.addEventListener("mouseenter", function(e) {
							a.removeAttribute("animation__leave"),
								t.toggle ||
								a.setAttribute(
									"animation__enter",
									"property: material.color; from: " +
									t.backgroundColor +
									"; to:" +
									t.hoverColor +
									"; dur:200;"
								);
						}),
						e.addEventListener("mouseleave", function(e) {
							t.toggle ||
								(a.removeAttribute("animation__click"),
									a.setAttribute(
										"animation__leave",
										"property: material.color; from: " +
										t.hoverColor +
										"; to:" +
										t.backgroundColor +
										"; dur:200; easing: easeOutQuad;"
									)),
								a.removeAttribute("animation__enter");
						}),
						e.addEventListener(t.on, function(i) {
							if (t.toggle) {
								var o = e.components["gui-button"];
								o.setActiveState(!o.data.toggleState);
							} else a.setAttribute("animation__click", "property: material.color; from: " + t.activeColor + "; to:" + t.backgroundColor + "; dur:400; easing: easeOutQuad;");
							var n = r.clickAction,
								s = window[n];
							"function" == typeof s && s(i);
						}),
						e.setAttribute("role", "button");
				},
				play: function() {},
				update: function(t) {
					console.log("In button update, toggle: " + this.toggleState);
					this.data, this.el;
					if (this.iconEntity) {
						console.log("has iconEntity: " + this.iconEntity);
						var e = this.iconEntity;
						e.parentNode.removeChild(e), this.setIcon(this.data.icon);
					} else console.log("no iconEntity!");
					if (this.textEntity) {
						console.log("has textEntity: " + this.textEntity);
						var e = this.textEntity;
						e.parentNode.removeChild(e), this.setText(this.data.value);
					} else console.log("no textEntity!");
				},
				setActiveState: function(t) {
					(this.data.toggleState = t),
					t
						?
						(console.log("active, about to set active color"),
							this.buttonEntity.setAttribute(
								"material",
								"color",
								this.data.activeColor
							)) :
						(console.log("not active, about to set background color"),
							this.buttonEntity.setAttribute(
								"material",
								"color",
								this.data.backgroundColor
							));
				},
				setIcon: function(t) {
					var e = parseInt(t, 16),
						i = String.fromCharCode(e),
						r = document.createElement("a-entity"),
						o = 0;
					"" != this.data.value &&
						(o = 0.5 * -this.guiItem.width + 0.5 * this.guiItem.height),
						(this.iconEntity = r),
						r.setAttribute(
							"troika-text",
							"value:" +
							i +
							"; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.iconFont +
							";\n                                                fontSize:" +
							this.data.iconFontSize +
							";\n                                                depthOffset:1;\n                                                "
						),
						r.setAttribute("position", o + " 0 0.05"),
						this.el.appendChild(r);
				},
				setText: function(t) {
					var e = this.guiItem.height - 0.5 * this.guiItem.width,
						i = document.createElement("a-entity");
					(this.textEntity = i),
					i.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						i.setAttribute("position", e + " 0 0.05"),
						this.el.appendChild(i);
				},
			}),
			AFRAME.registerPrimitive("a-gui-icon-label-button", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "icon-label-button"
					},
					"gui-icon-label-button": {},
				},
				mappings: {
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					"key-code": "gui-interactable.keyCode",
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					on: "gui-icon-label-button.on",
					"font-color": "gui-icon-label-button.fontColor",
					"font-family": "gui-icon-label-button.fontFamily",
					"font-size": "gui-icon-label-button.fontSize",
					"border-color": "gui-icon-label-button.borderColor",
					"background-color": "gui-icon-label-button.backgroundColor",
					"hover-color": "gui-icon-label-button.hoverColor",
					"active-color": "gui-icon-label-button.activeColor",
					icon: "gui-icon-label-button.icon",
					"icon-active": "gui-icon-label-button.iconActive",
					"icon-font": "gui-icon-label-button.iconFont",
					"icon-font-size": "gui-icon-label-button.iconFontSize",
					value: "gui-icon-label-button.value",
					toggle: "gui-icon-label-button.toggle",
					"toggle-state": "gui-icon-label-button.toggleState",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-input", {
				schema: {
					align: {
						type: "string",
						default: "left"
					},
					on: {
						default: "click"
					},
					value: {
						type: "string",
						default: ""
					},
					toggle: {
						type: "boolean",
						default: !1
					},
					toggleState: {
						type: "boolean",
						default: !1
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_grey_dark
					},
					borderColor: {
						type: "string",
						default: key_grey_dark
					},
					borderHoverColor: {
						type: "string",
						default: key_grey
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					hoverColor: {
						type: "string",
						default: key_white
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					this.guiItem = i;
					var r =
						((this.toggleState = t.toggle), e.getAttribute("gui-interactable"));
					if (((this.guiInteractable = r), t.fontSize > 20)) {
						var o = t.fontSize / 750;
						t.fontSize = o;
					}
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.width + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; transparent: false; side:front; color:" +
							t.backgroundColor +
							";"
						);
					var n = document.createElement("a-entity");
					n.setAttribute(
							"geometry",
							"primitive: box; width: " + i.width + "; height: 0.05; depth: 0.02;"
						),
						n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						n.setAttribute("position", "0 -" + (i.height / 2 - 0.025) + " 0.01"),
						e.appendChild(n);
					var a = document.createElement("a-entity");
					a.setAttribute(
							"geometry",
							"primitive: box; width: " + i.width + "; height: 0.05; depth: 0.02;"
						),
						a.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						a.setAttribute("position", "0 " + (i.height / 2 - 0.025) + " 0.01"),
						e.appendChild(a);
					var s = document.createElement("a-entity");
					s.setAttribute(
							"geometry",
							"primitive: box; width: 0.05; height: " + i.height + "; depth: 0.02;"
						),
						s.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						s.setAttribute("position", "-" + (i.width / 2 - 0.025) + " 0 0.01"),
						e.appendChild(s);
					var l = document.createElement("a-entity");
					l.setAttribute(
							"geometry",
							"primitive: box; width: 0.05; height: " + i.height + "; depth: 0.02;"
						),
						l.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.borderColor
						),
						l.setAttribute("position", i.width / 2 - 0.025 + " 0 0.01"),
						e.appendChild(l),
						this.setText(t.value),
						e.setAttribute("role", "input"),
						e.addEventListener("mouseenter", function(i) {
							e.setAttribute("material", "color", t.hoverColor),
								n.setAttribute("material", "color", t.borderHoverColor),
								a.setAttribute("material", "color", t.borderHoverColor),
								s.setAttribute("material", "color", t.borderHoverColor),
								l.setAttribute("material", "color", t.borderHoverColor);
						}),
						e.addEventListener("mouseleave", function(i) {
							e.setAttribute("material", "color", t.backgroundColor),
								n.setAttribute("material", "color", t.borderColor),
								a.setAttribute("material", "color", t.borderColor),
								s.setAttribute("material", "color", t.borderColor),
								l.setAttribute("material", "color", t.borderColor);
						}),
						e.addEventListener(t.on, function(t) {
							console.log("I was clicked at: ", t.detail.intersection.point);
							var i = e.getAttribute("gui-interactable");
							console.log("guiInteractable: " + i);
							var r = i.clickAction;
							console.log("clickActionFunctionName: " + r);
							var o = window[r];
							"function" == typeof o && o(t);
						});
				},
				setText: function(t) {
					var e = 0.25 * this.guiItem.height - 0.5 * this.guiItem.width,
						i = document.createElement("a-entity");
					(this.textEntity = i),
					i.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						i.setAttribute("position", e + " 0 0.05"),
						this.el.appendChild(i);
				},
				play: function() {},
				update: function(t) {
					var e = this.data;
					this.el;
					this.textEntity.setAttribute("troika-text", "value: " + e.value + ";");
				},
				appendText: function(t) {
					var e = this.data.value + t;
					this.el.setAttribute("gui-input", "text", e);
				},
				delete: function() {
					if (this.data.value && this.data.value.length > 0) {
						var t = this.data.value.slice(0, -1);
						this.el.setAttribute("gui-input", "text", t);
					}
				},
			}),
			AFRAME.registerPrimitive("a-gui-input", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "input"
					},
					"gui-input": {},
				},
				mappings: {
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					value: "gui-input.value",
					"font-size": "gui-input.fontSize",
					"font-family": "gui-input.fontFamily",
					"font-color": "gui-input.fontColor",
					"background-color": "gui-input.backgroundColor",
					"hover-color": "gui-input.hoverColor",
					"border-color": "gui-input.borderColor",
					"border-hover-color": "gui-input.borderHoverColor",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-interactable", {
			schema: {
				clickAction: {
					type: "string"
				},
				hoverAction: {
					type: "string"
				},
				keyCode: {
					type: "number",
					default: -1
				},
				key: {
					type: "string"
				},
			},
			init: function() {
				var t = this.data,
					e = this.el;
				t.keyCode > 0 &&
					window.addEventListener(
						"keydown",
						function(i) {
							i.key == t.key ?
								e.emit("click") :
								i.keyCode == t.keyCode && e.emit("click"),
								i.preventDefault();
						},
						!0
					);
			},
			update: function() {},
			tick: function() {},
			remove: function() {},
			pause: function() {},
			play: function() {},
			setClickAction: function(t) {
				this.data.clickAction = t;
			},
		});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-item", {
			schema: {
				type: {
					type: "string"
				},
				width: {
					type: "number",
					default: 1
				},
				height: {
					type: "number",
					default: 1
				},
				baseDepth: {
					type: "number",
					default: 0.01
				},
				depth: {
					type: "number",
					default: 0.02
				},
				gap: {
					type: "number",
					default: 0.025
				},
				radius: {
					type: "number",
					default: 0
				},
				margin: {
					type: "vec4",
					default: {
						x: 0,
						y: 0,
						z: 0,
						w: 0
					}
				},
				bevel: {
					type: "boolean",
					default: !1
				},
				bevelSegments: {
					type: "number",
					default: 5
				},
				steps: {
					type: "number",
					default: 2
				},
				bevelSize: {
					type: "number",
					default: 0.1
				},
				bevelOffset: {
					type: "number",
					default: 0
				},
				bevelThickness: {
					type: "number",
					default: 0.1
				},
			},
			init: function() {},
			update: function() {},
			tick: function() {},
			remove: function() {},
			pause: function() {},
			play: function() {},
		});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-label", {
				schema: {
					value: {
						type: "string",
						default: ""
					},
					align: {
						type: "string",
						default: "center"
					},
					anchor: {
						type: "string",
						default: "center"
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					lineHeight: {
						type: "number",
						default: 0.2
					},
					letterSpacing: {
						type: "number",
						default: 0
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_grey_dark
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					opacity: {
						type: "number",
						default: 1
					},
					textDepth: {
						type: "number",
						default: 0.01
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					if (
						((this.guiItem = i),
							e.setAttribute(
								"geometry",
								"primitive: plane; height: " +
								i.height +
								"; width: " +
								i.width +
								";"
							),
							e.setAttribute(
								"material",
								"shader: flat; side:front; color:" +
								t.backgroundColor +
								"; transparent: true; opacity: " +
								t.opacity +
								"; alphaTest: 0.5;"
							),
							t.fontSize > 20)
					) {
						var r = t.fontSize / 750;
						t.fontSize = r;
					}
					this.setText(t.value);
				},
				update: function(t) {
					this.data, this.el;
					if (this.textEntity) {
						console.log("has textEntity: " + this.textEntity);
						var e = this.textEntity;
						e.parentNode.removeChild(e), this.setText(this.data.value);
					} else console.log("no textEntity!");
				},
				setText: function(t) {
					var e = document.createElement("a-entity");
					(this.textEntity = e),
					e.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align: " +
							this.data.align +
							"; \n                                                anchor: " +
							this.data.anchor +
							"; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                lineHeight: " +
							this.data.lineHeight +
							";\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						e.setAttribute("position", "0 0 " + this.data.textDepth),
						this.el.appendChild(e);
				},
			}),
			AFRAME.registerPrimitive("a-gui-label", {
				defaultComponents: {
					"gui-item": {
						type: "label"
					},
					"gui-label": {}
				},
				mappings: {
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					align: "gui-label.align",
					anchor: "gui-label.anchor",
					value: "gui-label.value",
					"font-size": "gui-label.fontSize",
					"line-height": "gui-label.lineHeight",
					"letter-spacing": "gui-label.letterSpacing",
					"font-color": "gui-label.fontColor",
					"font-family": "gui-label.fontFamily",
					"background-color": "gui-label.backgroundColor",
					opacity: "gui-label.opacity",
					"text-depth": "gui-label.textDepth",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-progressbar", {
				schema: {
					backgroundColor: {
						type: "string",
						default: key_grey
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.width + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; opacity: 1;  color: " +
							t.backgroundColor +
							"; side:front;"
						);
					var r = document.createElement("a-entity");
					r.setAttribute(
							"geometry",
							"primitive: box; width: 0.04; height: " + i.height + "; depth: 0.02;"
						),
						r.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " + t.activeColor
						),
						r.setAttribute("position", -i.width / 2 + " 0 0.01"),
						(r.id = "progress_meter"),
						e.appendChild(r);
				},
				update: function() {},
				tick: function() {},
				remove: function() {},
				pause: function() {},
				play: function() {},
			}),
			AFRAME.registerPrimitive("a-gui-progressbar", {
				defaultComponents: {
					"gui-item": {
						type: "progressbar"
					},
					"gui-progressbar": {},
				},
				mappings: {
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					"background-color": "gui-progressbar.backgroundColor",
					"active-color": "gui-progressbar.activeColor",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-radio", {
				schema: {
					on: {
						default: "click"
					},
					value: {
						type: "string",
						default: ""
					},
					active: {
						type: "boolean",
						default: !0
					},
					toggle: {
						type: "boolean",
						default: !1
					},
					toggleState: {
						type: "boolean",
						default: !1
					},
					checked: {
						type: "boolean",
						default: !1
					},
					radiosizecoef: {
						type: "number",
						default: 1
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_grey_dark
					},
					borderColor: {
						type: "string",
						default: key_white
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					hoverColor: {
						type: "string",
						default: key_grey_light
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
					handleColor: {
						type: "string",
						default: key_grey
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					this.guiItem = i;
					var r =
						((this.toggleState = t.toggle), e.getAttribute("gui-interactable"));
					if (((this.guiInteractable = r), t.fontSize > 20)) {
						var o = t.fontSize / 750;
						t.fontSize = o;
					}
					e.setAttribute(
							"material",
							"shader: flat; depthTest:true;transparent: false; opacity: 1;  color: " +
							this.data.backgroundColor +
							"; side:front;"
						),
						e.setAttribute(
							"geometry",
							"primitive: plane; height: " +
							i.height +
							"; width: " +
							i.height +
							";"
						);
					var n = 0.5 * -i.width + 0.5 * i.height,
						a = document.createElement("a-cylinder");
					a.setAttribute("radius", 0.2 * i.height * t.radiosizecoef),
						a.setAttribute("height", "0.01"),
						a.setAttribute("rotation", "90 0 0"),
						a.setAttribute(
							"material",
							"color:" + t.handleColor + "; shader: flat;"
						),
						a.setAttribute("position", n + " 0 0"),
						e.appendChild(a);
					var s = document.createElement("a-torus");
					s.setAttribute("radius", 0.19 * i.height * t.radiosizecoef),
						s.setAttribute("radius-tubular", "0.01"),
						s.setAttribute("rotation", "90 0 0"),
						s.setAttribute(
							"material",
							"color:" + t.borderColor + "; shader: flat;"
						),
						a.appendChild(s);
					var l = document.createElement("a-cylinder");
					l.setAttribute("radius", 0.18 * i.height * t.radiosizecoef),
						l.setAttribute("height", "0.02"),
						l.setAttribute("rotation", "0 0 0"),
						l.setAttribute(
							"material",
							"color:" + t.handleColor + "; shader: flat;"
						),
						a.appendChild(l),
						this.setText(t.value),
						this.updateToggle(t.active),
						e.setAttribute("checked", t.active),
						e.addEventListener("mouseenter", function(e) {
							s.removeAttribute("animation__leave"),
								s.setAttribute(
									"animation__enter",
									"property: material.color; from: " +
									t.borderColor +
									"; to:" +
									t.hoverColor +
									"; dur:200;"
								);
						}),
						e.addEventListener("mouseleave", function(e) {
							s.removeAttribute("animation__enter"),
								s.setAttribute(
									"animation__leave",
									"property: material.color; from: " +
									t.hoverColor +
									"; to:" +
									t.borderColor +
									"; dur:200; easing: easeOutQuad;"
								);
						}),
						e.addEventListener(t.on, function(i) {
							(t.checked = !t.checked),
							t.checked ?
								(l.removeAttribute("animation__colorOut"),
									l.removeAttribute("animation__rotationOut"),
									l.removeAttribute("animation__position1Out"),
									l.removeAttribute("animation__position2Out"),
									l.setAttribute(
										"animation__colorIn",
										"property: material.color; from: " +
										t.handleColor +
										"; to:" +
										t.activeColor +
										"; dur:500; easing:easeInOutCubic;"
									),
									l.setAttribute(
										"animation__rotationIn",
										"property: rotation; from: 0 0 0; to:-180 0 0; dur:500; easing:easeInOutCubic;"
									),
									l.setAttribute(
										"animation__position1In",
										"property: position; from: 0 0 0; to:0 0.3 0; dur:200; easing:easeInOutCubic;"
									),
									l.setAttribute(
										"animation__position2In",
										"property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; delay:300;"
									)) :
								(l.removeAttribute("animation__colorIn"),
									l.removeAttribute("animation__rotationIn"),
									l.removeAttribute("animation__position1In"),
									l.removeAttribute("animation__position2In"),
									l.setAttribute(
										"animation__colorOut",
										"property: material.color; from: " +
										t.activeColor +
										"; to:" +
										t.handleColor +
										"; dur:500; easing:easeInOutCubic;"
									),
									l.setAttribute(
										"animation__rotationOut",
										"property: rotation; from: -180 0 0; to:0 0 0; dur:500; easing:easeInOutCubic;"
									),
									l.setAttribute(
										"animation__position1Out",
										"property: position; from: 0 0 0; to:0 0.3 0; dur:200; easing:easeInOutCubic; "
									),
									l.setAttribute(
										"animation__position2Out",
										"property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; delay:300;"
									));
							var r = e.getAttribute("gui-interactable"),
								o = r.clickAction,
								n = window[o];
							"function" == typeof n && n(i);
						}),
						e.setAttribute("role", "radio");
				},
				update: function() {
					var t = this.data;
					this.el;
					if ((this.updateToggle(t.active), this.textEntity)) {
						console.log("has textEntity: " + this.textEntity);
						var e = this.textEntity;
						e.parentNode.removeChild(e), this.setText(this.data.value);
					} else console.log("no textEntity!");
				},
				updateToggle: function(t) {},
				setText: function(t) {
					var e = this.guiItem.height - 0.5 * this.guiItem.width,
						i = document.createElement("a-entity");
					(this.textEntity = i),
					i.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						i.setAttribute("position", e + " 0 0.05"),
						this.el.appendChild(i);
				},
			}),
			AFRAME.registerPrimitive("a-gui-radio", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "radio"
					},
					"gui-radio": {},
				},
				mappings: {
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					"key-code": "gui-interactable.keyCode",
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					on: "gui-radio.on",
					value: "gui-radio.value",
					active: "gui-radio.active",
					checked: "gui-radio.checked",
					"font-color": "gui-radio.fontColor",
					"font-size": "gui-radio.fontSize",
					"font-family": "gui-radio.fontFamily",
					"border-color": "gui-radio.borderColor",
					"background-color": "gui-radio.backgroundColor",
					"hover-color": "gui-radio.hoverColor",
					"active-color": "gui-radio.activeColor",
					"handle-color": "gui-radio.handleColor",
					radiosizecoef: "gui-radio.radiosizecoef",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("rounded", {
				schema: {
					enabled: {
						default: !0
					},
					width: {
						type: "number",
						default: 1
					},
					height: {
						type: "number",
						default: 1
					},
					radius: {
						type: "number",
						default: 0.3
					},
					topLeftRadius: {
						type: "number",
						default: -1
					},
					topRightRadius: {
						type: "number",
						default: -1
					},
					bottomLeftRadius: {
						type: "number",
						default: -1
					},
					bottomRightRadius: {
						type: "number",
						default: -1
					},
					depthWrite: {
						default: !0
					},
					polygonOffset: {
						default: !1
					},
					polygonOffsetFactor: {
						type: "number",
						default: 0
					},
					color: {
						type: "color",
						default: "#F0F0F0"
					},
					opacity: {
						type: "number",
						default: 1
					},
				},
				init: function() {
					(this.rounded = new THREE.Mesh(
						this.draw(),
						new THREE.MeshStandardMaterial({
							color: new THREE.Color(this.data.color),
						})
					)),
					this.updateOpacity(),
						this.el.setObject3D("mesh", this.rounded);
				},
				update: function() {
					this.data.enabled ?
						this.rounded &&
						((this.rounded.visible = !0),
							(this.rounded.geometry = this.draw()),
							(this.rounded.material.color = new THREE.Color(this.data.color)),
							this.updateOpacity()) :
						(this.rounded.visible = !1);
				},
				updateOpacity: function() {
					this.data.opacity < 0 && (this.data.opacity = 0),
						this.data.opacity > 1 && (this.data.opacity = 1),
						this.data.opacity < 1 ?
						((this.rounded.material.transparent = !0),
							(this.rounded.material.opacity = this.data.opacity),
							(this.rounded.material.alphaTest = 0)) :
						(this.rounded.material.transparent = !1);
				},
				tick: function() {},
				remove: function() {
					this.rounded &&
						(this.el.object3D.remove(this.rounded), (this.rounded = null));
				},
				draw: function() {
					function t(t, e, i, r, o, n, a, s, l) {
						n || (n = 1e-5),
							a || (a = 1e-5),
							s || (s = 1e-5),
							l || (l = 1e-5),
							t.moveTo(e, i + n),
							t.lineTo(e, i + o - n),
							t.quadraticCurveTo(e, i + o, e + n, i + o),
							t.lineTo(e + r - a, i + o),
							t.quadraticCurveTo(e + r, i + o, e + r, i + o - a),
							t.lineTo(e + r, i + l),
							t.quadraticCurveTo(e + r, i, e + r - l, i),
							t.lineTo(e + s, i),
							t.quadraticCurveTo(e, i, e, i + s);
					}
					var e = new THREE.Shape(),
						i = [
							this.data.radius,
							this.data.radius,
							this.data.radius,
							this.data.radius,
						];
					return (
						-1 != this.data.topLeftRadius && (i[0] = this.data.topLeftRadius),
						-1 != this.data.topRightRadius && (i[1] = this.data.topRightRadius),
						-1 != this.data.bottomLeftRadius &&
						(i[2] = this.data.bottomLeftRadius),
						-1 != this.data.bottomRightRadius &&
						(i[3] = this.data.bottomRightRadius),
						t(
							e,
							-this.data.width / 2,
							-this.data.height / 2,
							this.data.width,
							this.data.height,
							i[0],
							i[1],
							i[2],
							i[3]
						),
						new THREE.ShapeBufferGeometry(e)
					);
				},
				pause: function() {},
				play: function() {},
			}),
			AFRAME.registerPrimitive("a-rounded", {
				defaultComponents: {
					rounded: {}
				},
				mappings: {
					enabled: "rounded.enabled",
					width: "rounded.width",
					height: "rounded.height",
					radius: "rounded.radius",
					"depth-write": "rounded.depthWrite",
					"polygon-offset": "rounded.polygonOffset",
					"polygon-offset-factor": "rounded.polygonOffsetFactor",
					"top-left-radius": "rounded.topLeftRadius",
					"top-right-radius": "rounded.topRightRadius",
					"bottom-left-radius": "rounded.bottomLeftRadius",
					"bottom-right-radius": "rounded.bottomRightRadius",
					color: "rounded.color",
					opacity: "rounded.opacity",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-slider", {
				schema: {
					activeColor: {
						type: "string",
						default: key_orange
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					borderColor: {
						type: "string",
						default: key_grey
					},
					handleColor: {
						type: "string",
						default: key_white
					},
					handleInnerDepth: {
						type: "number",
						default: 0.02
					},
					handleInnerRadius: {
						type: "number",
						default: 0.13
					},
					handleOuterDepth: {
						type: "number",
						default: 0.04
					},
					handleOuterRadius: {
						type: "number",
						default: 0.17
					},
					hoverColor: {
						type: "string",
						default: key_grey_light
					},
					leftRightPadding: {
						type: "number",
						default: 0.25
					},
					percent: {
						type: "number",
						default: 0.5
					},
					sliderBarHeight: {
						type: "number",
						default: 0.05
					},
					sliderBarDepth: {
						type: "number",
						default: 0.03
					},
					topBottomPadding: {
						type: "number",
						default: 0.125
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item"),
						r = i.width - 2 * t.leftRightPadding;
					i.height, t.topBottomPadding;
					e.setAttribute(
							"geometry",
							"primitive: plane; height: " + i.height + "; width: " + i.height + ";"
						),
						e.setAttribute(
							"material",
							"shader: flat; opacity: 1;  color: " +
							t.backgroundColor +
							"; side:front;"
						);
					var o = document.createElement("a-entity");
					o.setAttribute(
							"geometry",
							"primitive: box; width: " +
							t.percent * r +
							"; height: " +
							t.sliderBarHeight +
							"; depth: " +
							t.sliderBarDepth +
							";"
						),
						o.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							t.activeColor +
							";"
						),
						o.setAttribute(
							"position",
							t.percent - 0.5 * r + " 0 " + (t.sliderBarDepth - 0.01)
						),
						e.appendChild(o);
					var n = document.createElement("a-entity");
					n.setAttribute(
							"geometry",
							"primitive: box; width: " +
							(r - t.percent * r) +
							"; height: " +
							t.sliderBarHeight +
							"; depth: " +
							t.sliderBarDepth +
							";"
						),
						n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							t.borderColor +
							";"
						),
						n.setAttribute(
							"position",
							t.percent * r * 0.5 + " 0 " + (t.sliderBarDepth - 0.01)
						),
						e.appendChild(n);
					var a = document.createElement("a-entity");
					a.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " +
							t.handleOuterRadius +
							"; height: " +
							t.handleOuterDepth +
							";"
						),
						a.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							t.borderColor +
							";"
						),
						a.setAttribute("rotation", "90 0 0"),
						a.setAttribute(
							"position",
							t.percent * r - 0.5 * r + " 0 " + (t.handleOuterDepth - 0.01)
						),
						e.appendChild(a);
					var s = document.createElement("a-entity");
					s.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " +
							t.handleInnerRadius +
							"; height: " +
							t.handleInnerDepth +
							";"
						),
						s.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							t.handleColor +
							";"
						),
						s.setAttribute("position", "0 " + t.handleInnerDepth + " 0"),
						a.appendChild(s),
						e.addEventListener("mouseenter", function() {
							s.setAttribute("material", "color", t.hoverColor);
						}),
						e.addEventListener("mouseleave", function() {
							s.setAttribute("material", "color", t.handleColor);
						}),
						e.addEventListener("click", function(i) {
							console.log("I was clicked at: ", i.detail.intersection.point);
							var r = e.object3D.worldToLocal(i.detail.intersection.point);
							console.log("local coordinates: ", r),
								console.log("current percent: " + t.percent);
							var s = 2;
							r.x <= -s / 2 ?
								(t.percent = 0) :
								r.x >= s / 2 ?
								(t.percent = 1) :
								(t.percent = (r.x + s / 2) / s),
								console.log("handle container: " + a),
								o.setAttribute(
									"geometry",
									"primitive: box; width: " +
									2 * t.percent +
									"; height: 0.05; depth: 0.03;"
								),
								o.setAttribute("position", t.percent - 1 + " 0 0.02"),
								n.setAttribute(
									"geometry",
									"primitive: box; width: " +
									(2 - 2 * t.percent) +
									"; height: 0.05; depth: 0.03;"
								),
								n.setAttribute("position", 1 * t.percent + " 0 0.02"),
								a.setAttribute("position", 2 * t.percent - 1 + " 0 0.03");
							var l = e.getAttribute("gui-interactable");
							console.log("guiInteractable: " + l);
							var u = l.clickAction;
							console.log("clickActionFunctionName: " + u);
							var d = window[u];
							"function" == typeof d && d(i, t.percent);
						});
				},
				update: function() {},
				tick: function() {},
				remove: function() {},
				pause: function() {},
				play: function() {},
			}),
			AFRAME.registerPrimitive("a-gui-slider", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "slider"
					},
					"gui-slider": {},
				},
				mappings: {
					"active-color": "gui-slider.activeColor",
					"background-color": "gui-slider.backgroundColor",
					"border-color": "gui-slider.borderColor",
					"handle-color": "gui-slider.handleColor",
					"handle-inner-depth": "gui-slider.handleInnerDepth",
					"handle-inner-radius": "gui-slider.handleInnerRadius",
					"handle-outer-depth": "gui-slider.handleOuterDepth",
					"handle-outer-radius": "gui-slider.handleOuterRadius",
					height: "gui-item.height",
					"hover-color": "gui-slider.hoverColor",
					"key-code": "gui-interactable.keyCode",
					"left-right-padding": "gui-slider.leftRightPadding",
					margin: "gui-item.margin",
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					percent: "gui-slider.percent",
					"slider-bar-depth": "gui-slider.sliderBarDepth",
					"slider-bar-height": "gui-slider.sliderBarHeight",
					"top-bottom-padding": "gui-slider.topBottomPadding",
					width: "gui-item.width",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-toggle", {
				schema: {
					on: {
						default: "click"
					},
					value: {
						type: "string",
						default: ""
					},
					toggle: {
						type: "boolean",
						default: !1
					},
					toggleState: {
						type: "boolean",
						default: !1
					},
					active: {
						type: "boolean",
						default: !0
					},
					checked: {
						type: "boolean",
						default: !1
					},
					borderWidth: {
						type: "number",
						default: 1
					},
					fontSize: {
						type: "number",
						default: 0.2
					},
					fontFamily: {
						type: "string",
						default: ""
					},
					fontColor: {
						type: "string",
						default: key_grey_dark
					},
					borderColor: {
						type: "string",
						default: key_grey
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					hoverColor: {
						type: "string",
						default: key_grey_light
					},
					activeColor: {
						type: "string",
						default: key_orange
					},
					handleColor: {
						type: "string",
						default: key_offwhite
					},
				},
				init: function() {
					var t = this.data,
						e = this.el,
						i = e.getAttribute("gui-item");
					this.guiItem = i;
					var r =
						((this.toggleState = t.toggle), e.getAttribute("gui-interactable"));
					if (((this.guiInteractable = r), t.fontSize > 20)) {
						var o = t.fontSize / 750;
						t.fontSize = o;
					}
					e.setAttribute(
							"material",
							"shader: flat; depthTest:true;transparent: false; opacity: 1;  color: " +
							this.data.backgroundColor +
							"; side:front;"
						),
						e.setAttribute(
							"geometry",
							"primitive: plane; height: " +
							i.height +
							"; width: " +
							i.height +
							";"
						);
					var n = i.height / 1.75,
						a = 0.5 * -i.width + i.height / 2,
						s = document.createElement("a-box");
					s.setAttribute("width", n),
						s.setAttribute("height", 0.5 * i.height),
						s.setAttribute("depth", "0.01"),
						s.setAttribute(
							"material",
							"color:" + t.borderColor + "; shader: flat;"
						),
						s.setAttribute("position", a + " 0 0"),
						e.appendChild(s);
					var l = i.height / 5,
						u = 0.5 * -i.height + 2 * l,
						d = 0.5 * i.height - 2 * l,
						c = document.createElement("a-box");
					c.setAttribute("width", "" + l),
						c.setAttribute("height", 0.4 * i.height),
						c.setAttribute("depth", "0.02"),
						c.setAttribute("material", "color:" + t.handleColor),
						c.setAttribute("position", u + " 0 0.02"),
						s.appendChild(c),
						this.setText(t.value),
						this.updateToggle(t.active),
						e.addEventListener("mouseenter", function(e) {
							c.removeAttribute("animation__leave"),
								c.setAttribute(
									"animation__enter",
									"property: material.color; from: " +
									t.handleColor +
									"; to:" +
									t.hoverColor +
									"; dur:200;"
								);
						}),
						e.addEventListener("mouseleave", function(e) {
							c.removeAttribute("animation__enter"),
								c.setAttribute(
									"animation__leave",
									"property: material.color; from: " +
									t.hoverColor +
									"; to:" +
									t.handleColor +
									"; dur:200; easing: easeOutQuad;"
								);
						}),
						e.addEventListener("check", function(e) {
							t.checked || (t.checked = !0);
						}),
						e.addEventListener("uncheck", function(e) {
							t.checked && (t.checked = !1);
						}),
						e.addEventListener(t.on, function(i) {
							console.log("I was clicked at: ", i.detail.intersection.point),
								(t.checked = !t.checked),
								t.checked ?
								(s.removeAttribute("animation__colorOut"),
									c.removeAttribute("animation__positionOut"),
									s.setAttribute(
										"animation__colorIn",
										"property: material.color; from: " +
										t.borderColor +
										"; to:" +
										t.activeColor +
										"; dur:200; easing:easeInOutCubic;"
									),
									c.setAttribute(
										"animation__positionIn",
										"property: position; from: " +
										u +
										" 0 0.02; to:" +
										d +
										" 0 0.02; dur:200; easing:easeInOutCubic;"
									)) :
								(s.removeAttribute("animation__colorIn"),
									c.removeAttribute("animation__positionIn"),
									s.setAttribute(
										"animation__colorOut",
										"property: material.color; from: " +
										t.activeColor +
										"; to:" +
										t.borderColor +
										"; dur:200; easing:easeInOutCubic;"
									),
									c.setAttribute(
										"animation__positionOut",
										"property: position; from: " +
										d +
										" 0 0.02; to:" +
										u +
										" 0 0.02; dur:200; easing:easeInOutCubic;"
									));
							var r = e.getAttribute("gui-interactable");
							console.log("guiInteractable: " + r);
							var o = r.clickAction;
							console.log("clickActionFunctionName: " + o);
							var n = window[o];
							"function" == typeof n && n(i);
						});
				},
				update: function() {
					var t = this.data;
					this.el;
					if ((this.updateToggle(t.active), this.textEntity)) {
						console.log("has textEntity: " + this.textEntity);
						var e = this.textEntity;
						e.parentNode.removeChild(e), this.setText(this.data.value);
					} else console.log("no textEntity!");
				},
				updateToggle: function(t) {},
				setText: function(t) {
					var e = this.guiItem.height - 0.5 * this.guiItem.width,
						i = document.createElement("a-entity");
					(this.textEntity = i),
					i.setAttribute(
							"troika-text",
							"value: " +
							t +
							"; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:" +
							this.data.fontColor +
							";\n                                                font:" +
							this.data.fontFamily +
							";\n                                                fontSize:" +
							this.data.fontSize +
							";\n                                                depthOffset:1;\n                                                maxWidth:" +
							this.guiItem.width / 1.05 +
							";\n                                                "
						),
						i.setAttribute("position", e + " 0 0.05"),
						this.el.appendChild(i);
				},
			}),
			AFRAME.registerPrimitive("a-gui-toggle", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "toggle"
					},
					"gui-toggle": {},
				},
				mappings: {
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					"key-code": "gui-interactable.keyCode",
					width: "gui-item.width",
					height: "gui-item.height",
					margin: "gui-item.margin",
					on: "gui-toggle.on",
					active: "gui-toggle.active",
					checked: "gui-toggle.checked",
					value: "gui-toggle.value",
					"font-color": "gui-toggle.fontColor",
					"font-family": "gui-toggle.fontFamily",
					"font-size": "gui-toggle.fontSize",
					"border-width": "gui-toggle.borderWidth",
					"border-color": "gui-toggle.borderColor",
					"background-color": "gui-toggle.backgroundColor",
					"hover-color": "gui-toggle.hoverColor",
					"active-color": "gui-toggle.activeColor",
					"handle-color": "gui-toggle.handleColor",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		AFRAME.registerComponent("gui-vertical-slider", {
				schema: {
					activeColor: {
						type: "string",
						default: key_orange
					},
					backgroundColor: {
						type: "string",
						default: key_offwhite
					},
					borderColor: {
						type: "string",
						default: key_grey
					},
					handleColor: {
						type: "string",
						default: key_white
					},
					handleInnerDepth: {
						type: "number",
						default: 0.02
					},
					handleInnerRadius: {
						type: "number",
						default: 0.13
					},
					handleOuterDepth: {
						type: "number",
						default: 0.04
					},
					handleOuterRadius: {
						type: "number",
						default: 0.17
					},
					hoverColor: {
						type: "string",
						default: key_grey_light
					},
					hoverFontSize: {
						type: "number",
						default: 100
					},
					hoverHeight: {
						type: "number",
						default: 0.35
					},
					hoverPercent: {
						type: "number"
					},
					hoverWidth: {
						type: "number",
						default: 0.7
					},
					hoverMargin: {
						type: "vec4",
						default: {
							x: 0,
							y: 0,
							z: 0,
							w: 0
						}
					},
					leftRightPadding: {
						type: "number",
						default: 0.125
					},
					percent: {
						type: "number",
						default: 0.5
					},
					opacity: {
						type: "number",
						default: 1
					},
					outputFontSize: {
						type: "string",
						default: "0.2"
					},
					outputFunction: {
						type: "string"
					},
					outputHeight: {
						type: "number",
						default: 1
					},
					outputMargin: {
						type: "vec4",
						default: {
							x: 0,
							y: 0,
							z: 0,
							w: 0
						}
					},
					outputTextDepth: {
						type: "number",
						default: 0.25
					},
					outputWidth: {
						type: "number",
						default: 1
					},
					sliderBarDepth: {
						type: "number",
						default: 0.03
					},
					sliderBarWidth: {
						type: "number",
						default: 0.08
					},
					topBottomPadding: {
						type: "number",
						default: 0.25
					},
				},
				init: function() {
					var t = this,
						e = this.data,
						i = this.el,
						r = i.getAttribute("gui-item"),
						o = (r.width, e.leftRightPadding, r.height - 2 * e.topBottomPadding);
					(this.sliderHeight = o),
					i.setAttribute(
							"geometry",
							"primitive: plane; height: " +
							r.height +
							"; width: " +
							r.width +
							";"
						),
						i.setAttribute(
							"material",
							"shader: flat; opacity: " +
							e.opacity +
							";  alphaTest: 0.5; color: " +
							e.backgroundColor +
							"; side:front;"
						),
						console.log(
							"**** in vertical slider init, percent: " +
							e.percent +
							", sliderHeight: " +
							o
						);
					var n = document.createElement("a-entity");
					n.setAttribute(
							"geometry",
							"primitive: box; height: " +
							e.percent * o +
							"; width: " +
							e.sliderBarWidth +
							"; depth: " +
							e.sliderBarDepth +
							";"
						),
						n.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							e.activeColor +
							";"
						),
						n.setAttribute(
							"position",
							"0 " +
							(e.percent * o - 0.5 * o - e.percent * o * 0.5) +
							" " +
							(e.sliderBarDepth - 0.01)
						),
						(this.sliderActiveBar = n),
						i.appendChild(n);
					var a = document.createElement("a-entity");
					a.setAttribute(
							"geometry",
							"primitive: box; height: " +
							(o - e.percent * o) +
							"; width: " +
							e.sliderBarWidth +
							"; depth: " +
							e.sliderBarDepth +
							";"
						),
						a.setAttribute(
							"material",
							"shader: flat; opacity: 1; alphaTest: 0.5; side:double; color:" +
							e.borderColor +
							";"
						),
						a.setAttribute(
							"position",
							"0 " + e.percent * o * 0.5 + " " + (e.sliderBarDepth - 0.01)
						),
						(this.sliderBar = a),
						i.appendChild(a);
					var s = document.createElement("a-entity");
					s.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " +
							e.handleOuterRadius +
							"; height: " +
							e.handleOuterDepth +
							";"
						),
						s.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							e.activeColor +
							";"
						),
						s.setAttribute("rotation", "90 0 0"),
						s.setAttribute(
							"position",
							"0 " + (e.percent * o - 0.5 * o) + " " + (e.handleOuterDepth - 0.01)
						),
						(this.handleContainer = s),
						i.appendChild(s);
					var l = document.createElement("a-entity");
					l.setAttribute(
							"geometry",
							"primitive: cylinder; radius: " +
							e.handleInnerRadius +
							"; height: " +
							e.handleInnerDepth +
							";"
						),
						l.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							e.handleColor +
							";"
						),
						l.setAttribute("position", "0 " + e.handleInnerDepth + " 0"),
						s.appendChild(l);
					var u = document.createElement("a-gui-label");
					u.setAttribute("width", "" + 1.4 * r.width * e.outputWidth),
						u.setAttribute("height", "" + 0.7 * r.width),
						u.setAttribute("value", "0.0"),
						u.setAttribute("opacity", "1.0"),
						u.setAttribute("position", 1.4 * r.width + " 0 " + e.sliderBarDepth),
						u.setAttribute("rotation", "-90 0 0"),
						u.setAttribute("font-color", e.activeColor),
						u.setAttribute("font-size", 240 * r.width + "px"),
						u.setAttribute("font-weight", "bold"),
						u.setAttribute("text-depth", e.outputTextDepth),
						(this.valueLabel = u),
						s.appendChild(u);
					var d = document.createElement("a-entity");
					d.setAttribute(
							"geometry",
							"primitive: box; height: 0.02; width: " +
							0.5 * r.width +
							"; depth: " +
							e.sliderBarDepth +
							";"
						),
						d.setAttribute(
							"material",
							"shader: flat; opacity: 1; side:double; color: " +
							e.activeColor +
							";"
						),
						d.setAttribute(
							"position",
							0.5 * -r.width + " 0 " + (e.sliderBarDepth - 0.01)
						),
						d.setAttribute("visible", "false"),
						(this.hoverIndicator = d),
						i.appendChild(d);
					var c = document.createElement("a-gui-label");
					c.setAttribute("width", "" + r.width * e.hoverWidth),
						c.setAttribute("height", "" + r.width * e.hoverHeight),
						c.setAttribute("value", ""),
						c.setAttribute("opacity", "0.5"),
						c.setAttribute(
							"position",
							-r.width * e.hoverWidth + " 0 " + e.sliderBarDepth
						),
						c.setAttribute("font-color", e.borderColor),
						c.setAttribute("font-size", r.width * e.hoverFontSize + "px"),
						c.setAttribute("text-depth", e.outputTextDepth),
						(this.hoverLabel = c),
						d.appendChild(c),
						i.addEventListener("mouseenter", function() {
							l.setAttribute("material", "color", e.hoverColor);
						}),
						i.addEventListener("mouseleave", function() {
							l.setAttribute("material", "color", e.handleColor);
						}),
						i.addEventListener("click", function(t) {
							var r = i.object3D.worldToLocal(t.detail.intersection.point);
							console.log("click local coordinates: ", r),
								console.log("current percent: " + e.percent);
							var n = null;
							(n = r.y <= -o / 2 ? 0 : r.y >= o / 2 ? 1 : (r.y + o / 2) / o),
							console.log("new percent: " + n),
								i.setAttribute("gui-vertical-slider", "percent", String(n)),
								i.setAttribute("gui-vertical-slider", "hoverPercent", String(n)),
								console.log("handle container: " + s);
							var a = i.getAttribute("gui-interactable");
							console.log("guiInteractable: " + a);
							var l = a.clickAction;
							console.log("clickActionFunctionName: " + l);
							var u = window[l];
							"function" == typeof u && u(e.percent);
						}),
						this.el.addEventListener("raycaster-intersected", function(e) {
							t.raycaster = e.detail.el;
						}),
						this.el.addEventListener(
							"raycaster-intersected-cleared",
							function(e) {
								(t.raycaster = null),
								t.hoverIndicator.setAttribute("visible", !1),
									t.hoverLabel.setAttribute("visible", !1);
							}
						);
				},
				update: function(t) {
					var e = this.data,
						i = this.el,
						r = i.getAttribute("gui-item"),
						o = (r.width, e.leftRightPadding, r.height - 2 * e.topBottomPadding);
					if (
						e.percent != t.percent &&
						this.sliderActiveBar &&
						this.sliderBar &&
						this.handleContainer
					) {
						var o = r.height - 2 * e.topBottomPadding;
						this.sliderActiveBar.setAttribute(
								"geometry",
								"primitive: box; height: " +
								e.percent * o +
								"; width: " +
								e.sliderBarWidth +
								"; depth: " +
								e.sliderBarDepth +
								";"
							),
							this.sliderActiveBar.setAttribute(
								"position",
								"0 " +
								(e.percent * o - 0.5 * o - e.percent * o * 0.5) +
								" " +
								(e.sliderBarDepth - 0.01)
							),
							this.sliderBar.setAttribute(
								"geometry",
								"primitive: box; width: " +
								e.sliderBarWidth +
								"; height: " +
								(o - e.percent * o) +
								"; depth: " +
								e.sliderBarDepth +
								";"
							),
							this.sliderBar.setAttribute(
								"position",
								"0 " + e.percent * o * 0.5 + " " + (e.sliderBarDepth - 0.01)
							),
							this.handleContainer.setAttribute(
								"position",
								"0 " +
								(e.percent * o - 0.5 * o) +
								" " +
								(e.handleOuterDepth - 0.01)
							);
						var n = this.getOutputValue(!1);
						n && this.valueLabel.setAttribute("value", n),
							this.hoverIndicator.setAttribute("visible", !1),
							this.hoverLabel.setAttribute("visible", !1);
					} else if (
						e.hoverPercent != t.hoverPercent &&
						e.hoverPercent != e.percent &&
						this.hoverIndicator
					) {
						var a = this.getOutputValue(!0);
						a && this.hoverLabel.setAttribute("value", a),
							this.hoverIndicator.setAttribute(
								"position",
								"0 " +
								(e.hoverPercent * o - 0.5 * o) +
								" " +
								(e.sliderBarDepth - 0.01)
							),
							this.hoverIndicator.setAttribute("visible", !0),
							this.hoverLabel.setAttribute("visible", !0);
					}
				},
				tick: function() {
					if (this.raycaster) {
						var t = this.el,
							e = (this.data, this.sliderHeight),
							i =
							(this.handleContainer,
								this.raycaster.components.raycaster.getIntersection(t));
						if (i) {
							if (this.previousLocalY && this.previousLocalY == i.point.y)
								return (
									this.hoverIndicator.setAttribute("visible", !1),
									void this.hoverLabel.setAttribute("visible", !1)
								);
							var r = this.el.object3D;
							r.updateMatrixWorld();
							var o = new THREE.Vector3(),
								n = new THREE.Quaternion(),
								a = new THREE.Vector3();
							r.matrixWorld.decompose(o, n, a);
							var s = new THREE.Vector3();
							(s.x = i.point.x - o.x),
							(s.y = i.point.y - o.y),
							(s.z = i.point.z - o.z),
							(this.previousLocalY = s.y);
							var l = null;
							(l = s.y <= -e / 2 ? 0 : s.y >= e / 2 ? 1 : (s.y + e / 2) / e) !=
							this.data.hoverPercent &&
								t.setAttribute("gui-vertical-slider", "hoverPercent", String(l));
							var u = t.getAttribute("gui-interactable"),
								d = u.hoverAction,
								c = window[d];
							"function" == typeof c && c(l);
						}
					}
				},
				remove: function() {},
				pause: function() {},
				play: function() {},
				getOutputValue: function(t) {
					var e = window[this.data.outputFunction];
					if ("function" == typeof e) {
						return e(t ? this.data.hoverPercent : this.data.percent);
					}
					return null;
				},
			}),
			AFRAME.registerPrimitive("a-gui-vertical-slider", {
				defaultComponents: {
					"gui-interactable": {},
					"gui-item": {
						type: "slider"
					},
					"gui-vertical-slider": {},
				},
				mappings: {
					"active-color": "gui-vertical-slider.activeColor",
					"background-color": "gui-vertical-slider.backgroundColor",
					"border-color": "gui-vertical-slider.borderColor",
					"handle-color": "gui-vertical-slider.handleColor",
					"handle-inner-depth": "gui-vertical-slider.handleInnerDepth",
					"handle-inner-radius": "gui-vertical-slider.handleInnerRadius",
					"handle-outer-depth": "gui-vertical-slider.handleOuterDepth",
					"handle-outer-radius": "gui-vertical-slider.handleOuterRadius",
					height: "gui-item.height",
					"hover-color": "gui-vertical-slider.hoverColor",
					"hover-font-size": "gui-vertical-slider.hoverFontSize",
					"hover-height": "gui-vertical-slider.hoverHeight",
					"hover-margin": "gui-vertical-slider.hoverMargin",
					"hover-percent": "gui-vertical-slider.hoverPercent",
					"hover-width": "gui-vertical-slider.hoverWidth",
					"key-code": "gui-interactable.keyCode",
					"left-right-padding": "gui-vertical-slider.leftRightPadding",
					margin: "gui-item.margin",
					onclick: "gui-interactable.clickAction",
					onhover: "gui-interactable.hoverAction",
					opacity: "gui-vertical-slider.opacity",
					"output-font-size": "gui-vertical-slider.outputFontSize",
					"output-function": "gui-vertical-slider.outputFunction",
					"output-height": "gui-vertical-slider.outputHeight",
					"output-margin": "gui-vertical-slider.outputMargin",
					"output-text-depth": "gui-vertical-slider.outputTextDepth",
					"output-width": "gui-vertical-slider.outputWidth",
					percent: "gui-vertical-slider.percent",
					"slider-bar-depth": "gui-vertical-slider.sliderBarDepth",
					"slider-bar-width": "gui-vertical-slider.sliderBarWidth",
					"top-bottom-padding": "gui-vertical-slider.topBottomPadding",
					width: "gui-item.width",
				},
			});
	},
	function(t, e, i) {
		"use strict";
		var r = document.querySelector("#cursor");
		r &&
			r.addEventListener("stateremoved", function(t) {
				"cursor-fusing" === t.detail.state &&
					(AFRAME.utils.entity.setComponentProperty(
							this,
							"geometry.thetaLength",
							360
						),
						AFRAME.utils.entity.setComponentProperty(
							this,
							"material.color",
							key_white
						),
						AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1"));
			});
	},
	function(t, e, i) {
		"use strict";
		window.nearestPow2 = function(t) {
			Math.pow(2, Math.round(Math.log(t) / Math.log(2)));
		};
	},
	function(t, e, i) {
		"use strict";
		(window.normalYPosition = 1.5),
		(window.hiddenYPosition = 1e3),
		(window.key_orange = "#ed5b21"),
		(window.key_orange_light = "#ef8c60"),
		(window.key_grey = "#22252a"),
		(window.key_grey_dark = "#2c3037"),
		(window.key_grey_light = "#606876"),
		(window.key_offwhite = "#d3d3d4"),
		(window.key_white = "#fff"),
		(window.icon_font = {
			alert: "",
			"alert-circled": "",
			"android-add": "",
			"android-add-circle": "",
			"android-alarm-clock": "",
			"android-alert": "",
			"android-apps": "",
			"android-archive": "",
			"android-arrow-back": "",
			"android-arrow-down": "",
			"android-arrow-dropdown": "",
			"android-arrow-dropdown-circle": "",
			"android-arrow-dropleft": "",
			"android-arrow-dropleft-circle": "",
			"android-arrow-dropright": "",
			"android-arrow-dropright-circle": "",
			"android-arrow-dropup": "",
			"android-arrow-dropup-circle": "",
			"android-arrow-forward": "",
			"android-arrow-up": "",
			"android-attach": "",
			"android-bar": "",
			"android-bicycle": "",
			"android-boat": "",
			"android-bookmark": "",
			"android-bulb": "",
			"android-bus": "",
			"android-calendar": "",
			"android-call": "",
			"android-camera": "",
			"android-cancel": "",
			"android-car": "",
			"android-cart": "",
			"android-chat": "",
			"android-checkbox": "",
			"android-checkbox-blank": "",
			"android-checkbox-outline": "",
			"android-checkbox-outline-blank": "",
			"android-checkmark-circle": "",
			"android-clipboard": "",
			"android-close": "",
			"android-cloud": "",
			"android-cloud-circle": "",
			"android-cloud-done": "",
			"android-cloud-outline": "",
			"android-color-palette": "",
			"android-compass": "",
			"android-contact": "",
			"android-contacts": "",
			"android-contract": "",
			"android-create": "",
			"android-delete": "",
			"android-desktop": "",
			"android-document": "",
			"android-done": "",
			"android-done-all": "",
			"android-download": "",
			"android-drafts": "",
			"android-exit": "",
			"android-expand": "",
			"android-favorite": "",
			"android-favorite-outline": "",
			"android-film": "",
			"android-folder": "",
			"android-folder-open": "",
			"android-funnel": "",
			"android-globe": "",
			"android-hand": "",
			"android-hangout": "",
			"android-happy": "",
			"android-home": "",
			"android-image": "",
			"android-laptop": "",
			"android-list": "",
			"android-locate": "",
			"android-lock": "",
			"android-mail": "",
			"android-map": "",
			"android-menu": "",
			"android-microphone": "",
			"android-microphone-off": "",
			"android-more-horizontal": "",
			"android-more-vertical": "",
			"android-navigate": "",
			"android-notifications": "",
			"android-notifications-none": "",
			"android-notifications-off": "",
			"android-open": "",
			"android-options": "",
			"android-people": "",
			"android-person": "",
			"android-person-add": "",
			"android-phone-landscape": "",
			"android-phone-portrait": "",
			"android-pin": "",
			"android-plane": "",
			"android-playstore": "",
			"android-print": "",
			"android-radio-button-off": "",
			"android-radio-button-on": "",
			"android-refresh": "",
			"android-remove": "",
			"android-remove-circle": "",
			"android-restaurant": "",
			"android-sad": "",
			"android-search": "",
			"android-send": "",
			"android-settings": "",
			"android-share": "",
			"android-share-alt": "",
			"android-star": "",
			"android-star-half": "",
			"android-star-outline": "",
			"android-stopwatch": "",
			"android-subway": "",
			"android-sunny": "",
			"android-sync": "",
			"android-textsms": "",
			"android-time": "",
			"android-train": "",
			"android-unlock": "",
			"android-upload": "",
			"android-volume-down": "",
			"android-volume-mute": "",
			"android-volume-off": "",
			"android-volume-up": "",
			"android-walk": "",
			"android-warning": "",
			"android-watch": "",
			"android-wifi": "",
			aperture: "",
			archive: "",
			"arrow-down-a": "",
			"arrow-down-b": "",
			"arrow-down-c": "",
			"arrow-expand": "",
			"arrow-graph-down-left": "",
			"arrow-graph-down-right": "",
			"arrow-graph-up-left": "",
			"arrow-graph-up-right": "",
			"arrow-left-a": "",
			"arrow-left-b": "",
			"arrow-left-c": "",
			"arrow-move": "",
			"arrow-resize": "",
			"arrow-return-left": "",
			"arrow-return-right": "",
			"arrow-right-a": "",
			"arrow-right-b": "",
			"arrow-right-c": "",
			"arrow-shrink": "",
			"arrow-swap": "",
			"arrow-up-a": "",
			"arrow-up-b": "",
			"arrow-up-c": "",
			asterisk: "",
			at: "",
			backspace: "",
			"backspace-outline": "",
			bag: "",
			"battery-charging": "",
			"battery-empty": "",
			"battery-full": "",
			"battery-half": "",
			"battery-low": "",
			beaker: "",
			beer: "",
			bluetooth: "",
			bonfire: "",
			bookmark: "",
			bowtie: "",
			briefcase: "",
			bug: "",
			calculator: "",
			calendar: "",
			camera: "",
			card: "",
			cash: "",
			chatbox: "",
			"chatbox-working": "",
			chatboxes: "",
			chatbubble: "",
			"chatbubble-working": "",
			chatbubbles: "",
			checkmark: "",
			"checkmark-circled": "",
			"checkmark-round": "",
			"chevron-down": "",
			"chevron-left": "",
			"chevron-right": "",
			"chevron-up": "",
			clipboard: "",
			clock: "",
			close: "",
			"close-circled": "",
			"close-round": "",
			"closed-captioning": "",
			cloud: "",
			code: "",
			"code-download": "",
			"code-working": "",
			coffee: "",
			compass: "",
			compose: "",
			"connection-bars": "",
			contrast: "",
			crop: "",
			cube: "",
			disc: "",
			document: "",
			"document-text": "",
			drag: "",
			earth: "",
			easel: "",
			edit: "",
			egg: "",
			eject: "",
			email: "",
			"email-unread": "",
			"erlenmeyer-flask": "",
			"erlenmeyer-flask-bubbles": "",
			eye: "",
			"eye-disabled": "",
			female: "",
			filing: "",
			"film-marker": "",
			fireball: "",
			flag: "",
			flame: "",
			flash: "",
			"flash-off": "",
			folder: "",
			fork: "",
			"fork-repo": "",
			forward: "",
			funnel: "",
			"gear-a": "",
			"gear-b": "",
			grid: "",
			hammer: "",
			happy: "",
			"happy-outline": "",
			headphone: "",
			heart: "",
			"heart-broken": "",
			help: "",
			"help-buoy": "",
			"help-circled": "",
			home: "",
			icecream: "",
			image: "",
			images: "",
			information: "",
			"information-circled": "",
			ionic: "",
			"ios-alarm": "",
			"ios-alarm-outline": "",
			"ios-albums": "",
			"ios-albums-outline": "",
			"ios-americanfootball": "",
			"ios-americanfootball-outline": "",
			"ios-analytics": "",
			"ios-analytics-outline": "",
			"ios-arrow-back": "",
			"ios-arrow-down": "",
			"ios-arrow-forward": "",
			"ios-arrow-left": "",
			"ios-arrow-right": "",
			"ios-arrow-thin-down": "",
			"ios-arrow-thin-left": "",
			"ios-arrow-thin-right": "",
			"ios-arrow-thin-up": "",
			"ios-arrow-up": "",
			"ios-at": "",
			"ios-at-outline": "",
			"ios-barcode": "",
			"ios-barcode-outline": "",
			"ios-baseball": "",
			"ios-baseball-outline": "",
			"ios-basketball": "",
			"ios-basketball-outline": "",
			"ios-bell": "",
			"ios-bell-outline": "",
			"ios-body": "",
			"ios-body-outline": "",
			"ios-bolt": "",
			"ios-bolt-outline": "",
			"ios-book": "",
			"ios-book-outline": "",
			"ios-bookmarks": "",
			"ios-bookmarks-outline": "",
			"ios-box": "",
			"ios-box-outline": "",
			"ios-briefcase": "",
			"ios-briefcase-outline": "",
			"ios-browsers": "",
			"ios-browsers-outline": "",
			"ios-calculator": "",
			"ios-calculator-outline": "",
			"ios-calendar": "",
			"ios-calendar-outline": "",
			"ios-camera": "",
			"ios-camera-outline": "",
			"ios-cart": "",
			"ios-cart-outline": "",
			"ios-chatboxes": "",
			"ios-chatboxes-outline": "",
			"ios-chatbubble": "",
			"ios-chatbubble-outline": "",
			"ios-checkmark": "",
			"ios-checkmark-empty": "",
			"ios-checkmark-outline": "",
			"ios-circle-filled": "",
			"ios-circle-outline": "",
			"ios-clock": "",
			"ios-clock-outline": "",
			"ios-close": "",
			"ios-close-empty": "",
			"ios-close-outline": "",
			"ios-cloud": "",
			"ios-cloud-download": "",
			"ios-cloud-download-outline": "",
			"ios-cloud-outline": "",
			"ios-cloud-upload": "",
			"ios-cloud-upload-outline": "",
			"ios-cloudy": "",
			"ios-cloudy-night": "",
			"ios-cloudy-night-outline": "",
			"ios-cloudy-outline": "",
			"ios-cog": "",
			"ios-cog-outline": "",
			"ios-color-filter": "",
			"ios-color-filter-outline": "",
			"ios-color-wand": "",
			"ios-color-wand-outline": "",
			"ios-compose": "",
			"ios-compose-outline": "",
			"ios-contact": "",
			"ios-contact-outline": "",
			"ios-copy": "",
			"ios-copy-outline": "",
			"ios-crop": "",
			"ios-crop-strong": "",
			"ios-download": "",
			"ios-download-outline": "",
			"ios-drag": "",
			"ios-email": "",
			"ios-email-outline": "",
			"ios-eye": "",
			"ios-eye-outline": "",
			"ios-fastforward": "",
			"ios-fastforward-outline": "",
			"ios-filing": "",
			"ios-filing-outline": "",
			"ios-film": "",
			"ios-film-outline": "",
			"ios-flag": "",
			"ios-flag-outline": "",
			"ios-flame": "",
			"ios-flame-outline": "",
			"ios-flask": "",
			"ios-flask-outline": "",
			"ios-flower": "",
			"ios-flower-outline": "",
			"ios-folder": "",
			"ios-folder-outline": "",
			"ios-football": "",
			"ios-football-outline": "",
			"ios-game-controller-a": "",
			"ios-game-controller-a-outline": "",
			"ios-game-controller-b": "",
			"ios-game-controller-b-outline": "",
			"ios-gear": "",
			"ios-gear-outline": "",
			"ios-glasses": "",
			"ios-glasses-outline": "",
			"ios-grid-view": "",
			"ios-grid-view-outline": "",
			"ios-heart": "",
			"ios-heart-outline": "",
			"ios-help": "",
			"ios-help-empty": "",
			"ios-help-outline": "",
			"ios-home": "",
			"ios-home-outline": "",
			"ios-infinite": "",
			"ios-infinite-outline": "",
			"ios-information": "",
			"ios-information-empty": "",
			"ios-information-outline": "",
			"ios-ionic-outline": "",
			"ios-keypad": "",
			"ios-keypad-outline": "",
			"ios-lightbulb": "",
			"ios-lightbulb-outline": "",
			"ios-list": "",
			"ios-list-outline": "",
			"ios-location": "",
			"ios-location-outline": "",
			"ios-locked": "",
			"ios-locked-outline": "",
			"ios-loop": "",
			"ios-loop-strong": "",
			"ios-medical": "",
			"ios-medical-outline": "",
			"ios-medkit": "",
			"ios-medkit-outline": "",
			"ios-mic": "",
			"ios-mic-off": "",
			"ios-mic-outline": "",
			"ios-minus": "",
			"ios-minus-empty": "",
			"ios-minus-outline": "",
			"ios-monitor": "",
			"ios-monitor-outline": "",
			"ios-moon": "",
			"ios-moon-outline": "",
			"ios-more": "",
			"ios-more-outline": "",
			"ios-musical-note": "",
			"ios-musical-notes": "",
			"ios-navigate": "",
			"ios-navigate-outline": "",
			"ios-nutrition": "",
			"ios-nutrition-outline": "",
			"ios-paper": "",
			"ios-paper-outline": "",
			"ios-paperplane": "",
			"ios-paperplane-outline": "",
			"ios-partlysunny": "",
			"ios-partlysunny-outline": "",
			"ios-pause": "",
			"ios-pause-outline": "",
			"ios-paw": "",
			"ios-paw-outline": "",
			"ios-people": "",
			"ios-people-outline": "",
			"ios-person": "",
			"ios-person-outline": "",
			"ios-personadd": "",
			"ios-personadd-outline": "",
			"ios-photos": "",
			"ios-photos-outline": "",
			"ios-pie": "",
			"ios-pie-outline": "",
			"ios-pint": "",
			"ios-pint-outline": "",
			"ios-play": "",
			"ios-play-outline": "",
			"ios-plus": "",
			"ios-plus-empty": "",
			"ios-plus-outline": "",
			"ios-pricetag": "",
			"ios-pricetag-outline": "",
			"ios-pricetags": "",
			"ios-pricetags-outline": "",
			"ios-printer": "",
			"ios-printer-outline": "",
			"ios-pulse": "",
			"ios-pulse-strong": "",
			"ios-rainy": "",
			"ios-rainy-outline": "",
			"ios-recording": "",
			"ios-recording-outline": "",
			"ios-redo": "",
			"ios-redo-outline": "",
			"ios-refresh": "",
			"ios-refresh-empty": "",
			"ios-refresh-outline": "",
			"ios-reload": "",
			"ios-reverse-camera": "",
			"ios-reverse-camera-outline": "",
			"ios-rewind": "",
			"ios-rewind-outline": "",
			"ios-rose": "",
			"ios-rose-outline": "",
			"ios-search": "",
			"ios-search-strong": "",
			"ios-settings": "",
			"ios-settings-strong": "",
			"ios-shuffle": "",
			"ios-shuffle-strong": "",
			"ios-skipbackward": "",
			"ios-skipbackward-outline": "",
			"ios-skipforward": "",
			"ios-skipforward-outline": "",
			"ios-snowy": "",
			"ios-speedometer": "",
			"ios-speedometer-outline": "",
			"ios-star": "",
			"ios-star-half": "",
			"ios-star-outline": "",
			"ios-stopwatch": "",
			"ios-stopwatch-outline": "",
			"ios-sunny": "",
			"ios-sunny-outline": "",
			"ios-telephone": "",
			"ios-telephone-outline": "",
			"ios-tennisball": "",
			"ios-tennisball-outline": "",
			"ios-thunderstorm": "",
			"ios-thunderstorm-outline": "",
			"ios-time": "",
			"ios-time-outline": "",
			"ios-timer": "",
			"ios-timer-outline": "",
			"ios-toggle": "",
			"ios-toggle-outline": "",
			"ios-trash": "",
			"ios-trash-outline": "",
			"ios-undo": "",
			"ios-undo-outline": "",
			"ios-unlocked": "",
			"ios-unlocked-outline": "",
			"ios-upload": "",
			"ios-upload-outline": "",
			"ios-videocam": "",
			"ios-videocam-outline": "",
			"ios-volume-high": "",
			"ios-volume-low": "",
			"ios-wineglass": "",
			"ios-wineglass-outline": "",
			"ios-world": "",
			"ios-world-outline": "",
			ipad: "",
			iphone: "",
			ipod: "",
			jet: "",
			key: "",
			knife: "",
			laptop: "",
			leaf: "",
			levels: "",
			lightbulb: "",
			link: "",
			"load-a": "",
			"load-b": "",
			"load-c": "",
			"load-d": "",
			location: "",
			"lock-combination": "",
			locked: "",
			"log-in": "",
			"log-out": "",
			loop: "",
			magnet: "",
			male: "",
			man: "",
			map: "",
			medkit: "",
			merge: "",
			"mic-a": "",
			"mic-b": "",
			"mic-c": "",
			minus: "",
			"minus-circled": "",
			"minus-round": "",
			"model-s": "",
			monitor: "",
			more: "",
			mouse: "",
			"music-note": "",
			navicon: "",
			"navicon-round": "",
			navigate: "",
			network: "",
			"no-smoking": "",
			nuclear: "",
			outlet: "",
			paintbrush: "",
			paintbucket: "",
			"paper-airplane": "",
			paperclip: "",
			pause: "",
			person: "",
			"person-add": "",
			"person-stalker": "",
			"pie-graph": "",
			pin: "",
			pinpoint: "",
			pizza: "",
			plane: "",
			planet: "",
			play: "",
			playstation: "",
			plus: "",
			"plus-circled": "",
			"plus-round": "",
			podium: "",
			pound: "",
			power: "",
			pricetag: "",
			pricetags: "",
			printer: "",
			"pull-request": "",
			"qr-scanner": "",
			quote: "",
			"radio-waves": "",
			record: "",
			refresh: "",
			reply: "",
			"reply-all": "",
			"ribbon-a": "",
			"ribbon-b": "",
			sad: "",
			"sad-outline": "",
			scissors: "",
			search: "",
			settings: "",
			share: "",
			shuffle: "",
			"skip-backward": "",
			"skip-forward": "",
			"social-android": "",
			"social-android-outline": "",
			"social-angular": "",
			"social-angular-outline": "",
			"social-apple": "",
			"social-apple-outline": "",
			"social-bitcoin": "",
			"social-bitcoin-outline": "",
			"social-buffer": "",
			"social-buffer-outline": "",
			"social-chrome": "",
			"social-chrome-outline": "",
			"social-codepen": "",
			"social-codepen-outline": "",
			"social-css3": "",
			"social-css3-outline": "",
			"social-designernews": "",
			"social-designernews-outline": "",
			"social-dribbble": "",
			"social-dribbble-outline": "",
			"social-dropbox": "",
			"social-dropbox-outline": "",
			"social-euro": "",
			"social-euro-outline": "",
			"social-facebook": "",
			"social-facebook-outline": "",
			"social-foursquare": "",
			"social-foursquare-outline": "",
			"social-freebsd-devil": "",
			"social-github": "",
			"social-github-outline": "",
			"social-google": "",
			"social-google-outline": "",
			"social-googleplus": "",
			"social-googleplus-outline": "",
			"social-hackernews": "",
			"social-hackernews-outline": "",
			"social-html5": "",
			"social-html5-outline": "",
			"social-instagram": "",
			"social-instagram-outline": "",
			"social-javascript": "",
			"social-javascript-outline": "",
			"social-linkedin": "",
			"social-linkedin-outline": "",
			"social-markdown": "",
			"social-nodejs": "",
			"social-octocat": "",
			"social-pinterest": "",
			"social-pinterest-outline": "",
			"social-python": "",
			"social-reddit": "",
			"social-reddit-outline": "",
			"social-rss": "",
			"social-rss-outline": "",
			"social-sass": "",
			"social-skype": "",
			"social-skype-outline": "",
			"social-snapchat": "",
			"social-snapchat-outline": "",
			"social-tumblr": "",
			"social-tumblr-outline": "",
			"social-tux": "",
			"social-twitch": "",
			"social-twitch-outline": "",
			"social-twitter": "",
			"social-twitter-outline": "",
			"social-usd": "",
			"social-usd-outline": "",
			"social-vimeo": "",
			"social-vimeo-outline": "",
			"social-whatsapp": "",
			"social-whatsapp-outline": "",
			"social-windows": "",
			"social-windows-outline": "",
			"social-wordpress": "",
			"social-wordpress-outline": "",
			"social-yahoo": "",
			"social-yahoo-outline": "",
			"social-yen": "",
			"social-yen-outline": "",
			"social-youtube": "",
			"social-youtube-outline": "",
			"soup-can": "",
			"soup-can-outline": "",
			speakerphone: "",
			speedometer: "",
			spoon: "",
			star: "",
			"stats-bars": "",
			steam: "",
			stop: "",
			thermometer: "",
			thumbsdown: "",
			thumbsup: "",
			toggle: "",
			"toggle-filled": "",
			transgender: "",
			"trash-a": "",
			"trash-b": "",
			trophy: "",
			tshirt: "",
			"tshirt-outline": "",
			umbrella: "",
			university: "",
			unlocked: "",
			upload: "",
			usb: "",
			videocamera: "",
			"volume-high": "",
			"volume-low": "",
			"volume-medium": "",
			"volume-mute": "",
			wand: "",
			waterdrop: "",
			wifi: "",
			wineglass: "",
			woman: "",
			wrench: "",
			xbox: "",
		}),
		(window.getUniqueId = function(t) {
			return (
				t +
				"_" +
				new Date().getTime().toString() +
				Math.random().toString().replace(".", "")
			);
		}),
		(window.getTextWidth = function(t, e) {
			var i =
				getTextWidth.canvas ||
				(getTextWidth.canvas = document.createElement("canvas")),
				r = i.getContext("2d");
			return (r.font = e), r.measureText(t).width;
		}),
		(window.drawText = function(t, e, i, r, o, n) {
			var a =
				arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 1,
				s =
				arguments.length > 7 && void 0 !== arguments[7] ?
				arguments[7] :
				"center",
				l =
				arguments.length > 8 && void 0 !== arguments[8] ?
				arguments[8] :
				"middle",
				u =
				arguments.length > 9 && void 0 !== arguments[9] ?
				arguments[9] :
				"normal";
			(t.font = u + " " + r + " " + o),
			(t.fillStyle = n),
			(t.textAlign = s),
			(t.textBaseline = l),
			t.scale(a, a),
				t.clearRect(0, 0, e.width, e.height);
			var d = i + "";
			if (d.match("char#")) {
				var c = d.substring(d.indexOf("#") + 1);
				"left" == s
					?
					t.fillText(String.fromCharCode(c), e.height / 8, e.height / 2) :
					t.fillText(String.fromCharCode(c), e.width / 2, e.height / 2);
			} else
				"left" == s ?
				t.fillText(d, e.height / 8, e.height / 2) :
				t.fillText(d, e.width / 2, e.height / 2);
		}),
		(window.drawIcon = function(t, e, i, r, o) {
			var n =
				arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
			(t.font = i + " Ionicons"),
			(t.fillStyle = o),
			(t.textAlign = "center"),
			(t.textBaseline = "middle"),
			t.clearRect(0, 0, e.width, e.height),
				t.scale(n, n),
				icon_font[r] ?
				t.fillText(icon_font[r], e.width / 2, e.height / 2) :
				t.fillText("?", e.width / 2, e.height / 2);
		});
	},
	function(t, e, i) {
		"use strict";
		(function(t) {
			function e(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			}

			function i(t, e) {
				if (!t)
					throw new ReferenceError(
						"this hasn't been initialised - super() hasn't been called"
					);
				return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
			}

			function r(t, e) {
				if ("function" != typeof e && null !== e)
					throw new TypeError(
						"Super expression must either be null or a function, not " +
						typeof e
					);
				(t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						enumerable: !1,
						writable: !0,
						configurable: !0,
					},
				})),
				e &&
					(Object.setPrototypeOf ?
						Object.setPrototypeOf(t, e) :
						(t.__proto__ = e));
			}
			var o = function t(e, i, r) {
					null === e && (e = Function.prototype);
					var o = Object.getOwnPropertyDescriptor(e, i);
					if (void 0 === o) {
						var n = Object.getPrototypeOf(e);
						return null === n ? void 0 : t(n, i, r);
					}
					if ("value" in o) return o.value;
					var a = o.get;
					if (void 0 !== a) return a.call(r);
				},
				n = (function() {
					function t(t, e) {
						for (var i = 0; i < e.length; i++) {
							var r = e[i];
							(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
								Object.defineProperty(t, r.key, r);
						}
					}
					return function(e, i, r) {
						return i && t(e.prototype, i), r && t(e, r), e;
					};
				})(),
				a = (function() {
					function t(t, e) {
						var i = [],
							r = !0,
							o = !1,
							n = void 0;
						try {
							for (
								var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) &&
								(i.push(a.value), !e || i.length !== e); r = !0
							);
						} catch (t) {
							(o = !0), (n = t);
						} finally {
							try {
								!r && s.return && s.return();
							} finally {
								if (o) throw n;
							}
						}
						return i;
					}
					return function(e, i) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e)) return t(e, i);
						throw new TypeError(
							"Invalid attempt to destructure non-iterable instance"
						);
					};
				})(),
				s =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
				function(t) {
					return typeof t;
				} :
				function(t) {
					return t &&
						"function" == typeof Symbol &&
						t.constructor === Symbol &&
						t !== Symbol.prototype ?
						"symbol" :
						typeof t;
				};
			!(function(t, l) {
				function u(t) {
					return t &&
						"object" === (void 0 === t ? "undefined" : s(t)) &&
						"default" in t ?
						t :
						{
							default: t
						};
				}

				function d(t) {
					if (t && t.__esModule) return t;
					var e = Object.create(null);
					return (
						t &&
						Object.keys(t).forEach(function(i) {
							if ("default" !== i) {
								var r = Object.getOwnPropertyDescriptor(t, i);
								Object.defineProperty(
									e,
									i,
									r.get ?
									r :
									{
										enumerable: !0,
										get: function() {
											return t[i];
										},
									}
								);
							}
						}),
						(e.default = t),
						Object.freeze(e)
					);
				}

				function c() {
					function t(t, e) {
						function r() {
							var i = d > 0 ? t : e;
							if (v(i))
								try {
									var r = i(u);
									r === o && l();
									var a = n(r);
									a ? a.call(r, o.resolve, o.reject) : o.resolve(r);
								} catch (t) {
									o.reject(t);
								}
							else o[d > 0 ? "resolve" : "reject"](u);
						}
						var o = c();
						return h.push(r), d && i(), o;
					}

					function e(t, r) {
						p++;
						var o = 0;
						try {
							r === b && l();
							var s = t > 0 && n(r);
							s
								?
								s.call(
									r,
									a(function(t) {
										o++, e(1, t);
									}),
									a(function(t) {
										o++, e(-1, t);
									})
								) :
								((d = t), (u = r), i());
						} catch (t) {
							d || o || e(-1, t);
						}
					}

					function i() {
						f || (setTimeout(r, 0), (f = 1));
					}

					function r() {
						var t = h;
						(f = 0), (h = []), t.forEach(o);
					}

					function o(t) {
						t();
					}

					function n(t) {
						var e =
							t &&
							(v(t) || "object" === (void 0 === t ? "undefined" : s(t))) &&
							t.then;
						return v(e) && e;
					}

					function a(t) {
						var e = 0;
						return function() {
							for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];
							e++ || t.apply(this, i);
						};
					}

					function l() {
						throw new TypeError("Chaining cycle detected");
					}
					var u,
						d = 0,
						h = [],
						f = 0,
						p = 0,
						g = a(function(t) {
							p || e(1, t);
						}),
						m = a(function(t) {
							p || e(-1, t);
						}),
						v = function(t) {
							return "function" == typeof t;
						},
						b = {
							then: t,
							resolve: g,
							reject: m
						};
					return b;
				}

				function h() {
					var t,
						e,
						i = new Promise(function(i, r) {
							(t = i), (e = r);
						});
					return {
						then: i.then.bind(i),
						resolve: t,
						reject: e
					};
				}

				function f() {
					function t(e, o) {
						var n = e.id,
							a = e.name,
							s = e.dependencies;
						void 0 === s && (s = []);
						var l = e.init;
						void 0 === l && (l = function() {});
						var u = e.getTransferables;
						if ((void 0 === u && (u = null), !r[n]))
							try {
								(s = s.map(function(e) {
									return (
										e &&
										e.isWorkerModule &&
										(t(e, function(t) {
												if (t instanceof Error) throw t;
											}),
											(e = r[e.id].value)),
										e
									);
								})),
								(l = i("<" + a + ">.init", l)),
								u && (u = i("<" + a + ">.getTransferables", u));
								var d = null;
								"function" == typeof l
									?
									(d = l.apply(void 0, s)) :
									console.error(
										"worker module init function failed to rehydrate"
									),
									(r[n] = {
										id: n,
										value: d,
										getTransferables: u
									}),
									o(d);
							} catch (t) {
								(t && t.noLog) || console.error(t), o(t);
							}
					}

					function e(t, e) {
						function i(t) {
							try {
								var i = r[n].getTransferables && r[n].getTransferables(t);
								(i && Array.isArray(i) && i.length) || (i = void 0), e(t, i);
							} catch (t) {
								console.error(t), e(t);
							}
						}
						var o,
							n = t.id,
							a = t.args;
						(r[n] && "function" == typeof r[n].value) ||
						e(
							new Error(
								"Worker module " +
								n +
								": not found or its 'init' did not return a function"
							)
						);
						try {
							var s = (o = r[n]).value.apply(o, a);
							s && "function" == typeof s.then ?
								s.then(i, function(t) {
									return e(t instanceof Error ? t : new Error("" + t));
								}) :
								i(s);
						} catch (t) {
							e(t);
						}
					}

					function i(t, e) {
						var i = void 0;
						self.troikaDefine = function(t) {
							return (i = t);
						};
						var r = URL.createObjectURL(
							new Blob(
								[
									"/** " +
									t.replace(/\*/g, "") +
									" **/\n\ntroikaDefine(\n" +
									e +
									"\n)",
								], {
									type: "application/javascript"
								}
							)
						);
						try {
							importScripts(r);
						} catch (t) {
							console.error(t);
						}
						return URL.revokeObjectURL(r), delete self.troikaDefine, i;
					}
					var r = Object.create(null);
					self.addEventListener("message", function(i) {
						var r = i.data,
							o = r.messageId,
							n = r.action,
							a = r.data;
						try {
							"registerModule" === n &&
								t(a, function(t) {
									t instanceof Error
										?
										postMessage({
											messageId: o,
											success: !1,
											error: t.message,
										}) :
										postMessage({
											messageId: o,
											success: !0,
											result: {
												isCallable: "function" == typeof t
											},
										});
								}),
								"callModule" === n &&
								e(a, function(t, e) {
									t instanceof Error
										?
										postMessage({
											messageId: o,
											success: !1,
											error: t.message,
										}) :
										postMessage({
												messageId: o,
												success: !0,
												result: t
											},
											e || void 0
										);
								});
						} catch (t) {
							postMessage({
								messageId: o,
								success: !1,
								error: t.stack
							});
						}
					});
				}

				function p(t) {
					var e = function t() {
						for (var e = [], i = arguments.length; i--;) e[i] = arguments[i];
						return t._getInitResult().then(function(t) {
							if ("function" == typeof t) return t.apply(void 0, e);
							throw new Error(
								"Worker module function was called but `init` did not return a callable function"
							);
						});
					};
					return (
						(e._getInitResult = function() {
							var i = t.dependencies,
								r = t.init;
							i = Array.isArray(i) ?
								i.map(function(t) {
									return t && t._getInitResult ? t._getInitResult() : t;
								}) :
								[];
							var o = L.all(i).then(function(t) {
								return r.apply(null, t);
							});
							return (
								(e._getInitResult = function() {
									return o;
								}),
								o
							);
						}),
						e
					);
				}

				function g(t) {
					function e() {
						for (var t = [], i = arguments.length; i--;) t[i] = arguments[i];
						return (
							l || (l = b(n, "registerModule", e.workerModuleData)),
							l.then(function(e) {
								if (e.isCallable) return b(n, "callModule", {
									id: a,
									args: t
								});
								throw new Error(
									"Worker module function was called but `init` did not return a callable function"
								);
							})
						);
					}
					if (!((t && "function" == typeof t.init) || W))
						throw new Error("requires `options.init` function");
					var i = t.dependencies,
						r = t.init,
						o = t.getTransferables,
						n = t.workerId;
					if (!z()) return p(t);
					null == n && (n = "#default");
					var a = "workerModule" + ++B,
						s = t.name || a,
						l = null;
					return (
						(i =
							i &&
							i.map(function(t) {
								return (
									"function" != typeof t ||
									t.workerModuleData ||
									((W = !0),
										(t = g({
											workerId: n,
											name: "<" + s + "> function dependency: " + t.name,
											init: "function(){return (\n" + m(t) + "\n)}",
										})),
										(W = !1)),
									t && t.workerModuleData && (t = t.workerModuleData),
									t
								);
							})),
						(e.workerModuleData = {
							isWorkerModule: !0,
							id: a,
							name: s,
							dependencies: i,
							init: m(r),
							getTransferables: o && m(o),
						}),
						e
					);
				}

				function m(t) {
					var e = t.toString();
					return (
						!/^function/.test(e) &&
						/^\w+\s*\(/.test(e) &&
						(e = "function " + e),
						e
					);
				}

				function v(t) {
					var e = j[t];
					if (!e) {
						var i = m(f);
						(e = j[t] =
							new Worker(
								URL.createObjectURL(
									new Blob(
										[
											"/** Worker Module Bootstrap: " +
											t.replace(/\*/g, "") +
											" **/\n\n;(" +
											i +
											")()",
										], {
											type: "application/javascript"
										}
									)
								)
							)),
						(e.onmessage = function(t) {
							var e = t.data,
								i = e.messageId,
								r = V[i];
							if (!r)
								throw new Error(
									"WorkerModule response with empty or unknown messageId"
								);
							delete V[i], V.count--, r(e);
						});
					}
					return e;
				}

				function b(t, e, i) {
					var r = L(),
						o = ++G;
					return (
						(V[o] = function(t) {
							t.success ?
								r.resolve(t.result) :
								r.reject(
									new Error("Error in worker " + e + " call: " + t.error)
								);
						}),
						V._count++,
						V.count > 1e3 &&
						console.warn(
							"Large number of open WorkerModule requests, some may not be returning"
						),
						v(t).postMessage({
							messageId: o,
							action: e,
							data: i
						}),
						r
					);
				}

				function y(e) {
					function i(e, i) {
						var r = t.ShaderChunk[i];
						return r ? y(r) : e;
					}
					var r = /^[ \t]*#include +<([\w\d.\/]+)>/gm;
					return e.replace(r, i);
				}

				function A(e, i) {
					var r = x(i),
						o = Y.get(e);
					if ((o || Y.set(e, (o = Object.create(null))), o[r]))
						return new o[r]();
					var n = "_onBeforeCompile" + r,
						a = function(t) {
							e.onBeforeCompile.call(this, t);
							var o = r + "|||" + t.vertexShader + "|||" + t.fragmentShader,
								a = Q[o];
							if (!a) {
								var s = w(t, i, r);
								a = Q[o] = s;
							}
							(t.vertexShader = a.vertexShader),
							(t.fragmentShader = a.fragmentShader),
							X(t.uniforms, this.uniforms),
								i.timeUniform &&
								(t.uniforms[i.timeUniform] = {
									get value() {
										return Date.now() - q;
									},
								}),
								this[n] && this[n](t);
						},
						s = function() {
							return l(i.chained ? e : e.clone());
						},
						l = function(o) {
							var n = Object.create(o, u);
							return (
								Object.defineProperty(n, "baseMaterial", {
									value: e
								}),
								Object.defineProperty(n, "id", {
									value: $++
								}),
								(n.uuid = t.MathUtils.generateUUID()),
								(n.uniforms = X({}, o.uniforms, i.uniforms)),
								(n.defines = X({}, o.defines, i.defines)),
								(n.defines["TROIKA_DERIVED_MATERIAL_" + r] = ""),
								(n.extensions = X({}, o.extensions, i.extensions)),
								(n._listeners = void 0),
								n
							);
						},
						u = {
							constructor: {
								value: s
							},
							isDerivedMaterial: {
								value: !0
							},
							customProgramCacheKey: {
								value: function() {
									return r;
								},
							},
							onBeforeCompile: {
								get: function() {
									return a;
								},
								set: function(t) {
									this[n] = t;
								},
							},
							copy: {
								writable: !0,
								configurable: !0,
								value: function(i) {
									return (
										e.copy.call(this, i),
										e.isShaderMaterial ||
										e.isDerivedMaterial ||
										(X(this.extensions, i.extensions),
											X(this.defines, i.defines),
											X(this.uniforms, t.UniformsUtils.clone(i.uniforms))),
										this
									);
								},
							},
							clone: {
								writable: !0,
								configurable: !0,
								value: function() {
									var t = new e.constructor();
									return l(t).copy(this);
								},
							},
							getDepthMaterial: {
								writable: !0,
								configurable: !0,
								value: function() {
									var r = this._depthMaterial;
									return (
										r ||
										((r = this._depthMaterial =
												A(
													e.isDerivedMaterial ?
													e.getDepthMaterial() :
													new t.MeshDepthMaterial({
														depthPacking: t.RGBADepthPacking,
													}),
													i
												)),
											(r.defines.IS_DEPTH_MATERIAL = ""),
											(r.uniforms = this.uniforms)),
										r
									);
								},
							},
							getDistanceMaterial: {
								writable: !0,
								configurable: !0,
								value: function() {
									var r = this._distanceMaterial;
									return (
										r ||
										((r = this._distanceMaterial =
												A(
													e.isDerivedMaterial ?
													e.getDistanceMaterial() :
													new t.MeshDistanceMaterial(),
													i
												)),
											(r.defines.IS_DISTANCE_MATERIAL = ""),
											(r.uniforms = this.uniforms)),
										r
									);
								},
							},
							dispose: {
								writable: !0,
								configurable: !0,
								value: function() {
									var t = this._depthMaterial,
										i = this._distanceMaterial;
									t && t.dispose(), i && i.dispose(), e.dispose.call(this);
								},
							},
						};
					return (o[r] = s), new s();
				}

				function w(t, e, i) {
					var r = t.vertexShader,
						o = t.fragmentShader,
						n = e.vertexDefs,
						a = e.vertexMainIntro,
						s = e.vertexMainOutro,
						l = e.vertexTransform,
						u = e.fragmentDefs,
						d = e.fragmentMainIntro,
						c = e.fragmentMainOutro,
						h = e.fragmentColorTransform,
						f = e.customRewriter,
						p = e.timeUniform;
					if (
						((n = n || ""),
							(a = a || ""),
							(s = s || ""),
							(u = u || ""),
							(d = d || ""),
							(c = c || ""),
							(l || f) && (r = y(r)),
							(h || f) &&
							((o = o.replace(
									/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,
									"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"
								)),
								(o = y(o))),
							f)
					) {
						var g = f({
							vertexShader: r,
							fragmentShader: o
						});
						(r = g.vertexShader), (o = g.fragmentShader);
					}
					if (h) {
						var m = [];
						(o = o.replace(
							/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,
							function(t) {
								return m.push(t), "";
							}
						)),
						(c = h + "\n" + m.join("\n") + "\n" + c);
					}
					if (p) {
						var v = "\nuniform float " + p + ";\n";
						(n = v + n), (u = v + u);
					}
					return (
						l &&
						((n =
								n +
								"\nvec3 troika_position_" +
								i +
								";\nvec3 troika_normal_" +
								i +
								";\nvec2 troika_uv_" +
								i +
								";\nvoid troikaVertexTransform" +
								i +
								"(inout vec3 position, inout vec3 normal, inout vec2 uv) {\n  " +
								l +
								"\n}\n"),
							(a =
								"\ntroika_position_" +
								i +
								" = vec3(position);\ntroika_normal_" +
								i +
								" = vec3(normal);\ntroika_uv_" +
								i +
								" = vec2(uv);\ntroikaVertexTransform" +
								i +
								"(troika_position_" +
								i +
								", troika_normal_" +
								i +
								", troika_uv_" +
								i +
								");\n" +
								a +
								"\n"),
							(r = r.replace(
								/\b(position|normal|uv)\b/g,
								function(t, e, r, o) {
									return /\battribute\s+vec[23]\s+$/.test(o.substr(0, r)) ?
										e :
										"troika_" + e + "_" + i;
								}
							))),
						(r = k(r, i, n, a, s)),
						(o = k(o, i, u, d, c)), {
							vertexShader: r,
							fragmentShader: o
						}
					);
				}

				function k(t, e, i, r, o) {
					return (
						(r || o || i) &&
						((t = t.replace(
								N,
								"\n" + i + "\nvoid troikaOrigMain" + e + "() {"
							)),
							(t +=
								"\nvoid main() {\n  " +
								r +
								"\n  troikaOrigMain" +
								e +
								"();\n  " +
								o +
								"\n}")),
						t
					);
				}

				function C(t, e) {
					return "uniforms" === t ?
						void 0 :
						"function" == typeof e ?
						e.toString() :
						e;
				}

				function x(t) {
					var e = JSON.stringify(t, C),
						i = Z.get(e);
					return null == i && Z.set(e, (i = ++K)), i;
				}

				function S(t, e) {
					function i(t, e, i, r, o, n, a) {
						var s = 1 - a;
						return {
							x: s * s * t + 2 * s * a * i + a * a * o,
							y: s * s * e + 2 * s * a * r + a * a * n,
						};
					}

					function r(t, e, i, r, o, n, a, s, l) {
						var u = 1 - l;
						return {
							x: u * u * u * t +
								3 * u * u * l * i +
								3 * u * l * l * o +
								l * l * l * a,
							y: u * u * u * e +
								3 * u * u * l * r +
								3 * u * l * l * n +
								l * l * l * s,
						};
					}

					function o(e, o) {
						function l(t) {
							return g + (y * t) / o;
						}

						function u(t) {
							return m + (A * t) / o;
						}
						var d = new Uint8Array(o * o),
							c = e.xMax - e.xMin,
							h = e.yMax - e.yMin,
							f = Math.max(c, h),
							p = (Math.max(c, h) / o) * (a * o + 0.5),
							g = e.xMin - p,
							m = e.yMin - p,
							v = e.xMax + p,
							b = e.yMax + p,
							y = v - g,
							A = b - m,
							w = Math.max(y, A);
						if (e.pathCommandCount) {
							var k = t(e),
								C = void 0,
								x = void 0,
								S = void 0,
								_ = void 0;
							e.forEachPathCommand(function(t, e, o, n, a, l, u) {
								switch (t) {
									case "M":
										(S = C = e), (_ = x = o);
										break;
									case "L":
										(e === S && o === _) ||
										k.addLineSegment(S, _, (S = e), (_ = o));
										break;
									case "Q":
										for (var d = {
												x: S,
												y: _
											}, c = 1; c < s; c++) {
											var h = i(S, _, e, o, n, a, c / (s - 1));
											k.addLineSegment(d.x, d.y, h.x, h.y), (d = h);
										}
										(S = n), (_ = a);
										break;
									case "C":
										for (var f = {
												x: S,
												y: _
											}, p = 1; p < s; p++) {
											var g = r(S, _, e, o, n, a, l, u, p / (s - 1));
											k.addLineSegment(f.x, f.y, g.x, g.y), (f = g);
										}
										(S = l), (_ = u);
										break;
									case "Z":
										(S === C && _ === x) || k.addLineSegment(S, _, C, x);
								}
							});
							for (var U = 0; U < o; U++)
								for (var E = 0; E < o; E++) {
									var T = k.findNearestSignedDistance(
											l(U + 0.5),
											u(E + 0.5),
											f
										),
										F = Math.pow(1 - Math.abs(T) / w, n) / 2;
									T < 0 && (F = 1 - F),
										(F = Math.max(0, Math.min(255, Math.round(255 * F)))),
										(d[E * o + U] = F);
								}
						}
						return {
							textureData: d,
							renderingBounds: [g, m, v, b]
						};
					}
					var n = e.sdfExponent,
						a = e.sdfMargin,
						s = 16;
					return o;
				}

				function _(t, e, i) {
					function r(e, i) {
						function r() {
							var o = function(t) {
								console.error(
										"Failure loading font " +
										e +
										(e === h ? "" : "; trying fallback"),
										t
									),
									e !== h && ((e = h), r());
							};
							try {
								var n = new XMLHttpRequest();
								n.open("get", e, !0),
									(n.responseType = "arraybuffer"),
									(n.onload = function() {
										if (n.status >= 400) o(new Error(n.statusText));
										else if (n.status > 0)
											try {
												var e = t(n.response);
												i(e);
											} catch (t) {
												o(t);
											}
									}),
									(n.onerror = o),
									n.send();
							} catch (t) {
								o(t);
							}
						}
						r();
					}

					function o(t, e) {
						t || (t = h);
						var i = p[t];
						i
							?
							i.pending ?
							i.pending.push(e) :
							e(i) :
							((p[t] = {
									pending: [e]
								}),
								r(t, function(e) {
									var i = p[t].pending;
									(p[t] = e),
									i.forEach(function(t) {
										return t(e);
									});
								}));
					}

					function n(t, e, i) {
						t || (t = h);
						var r = t + "@" + e,
							n = f[r];
						n
							?
							i(n) :
							o(t, function(t) {
								(n =
									f[r] || (f[r] = {
										fontObj: t,
										glyphs: {},
										glyphCount: 0
									})),
								i(n);
							});
					}

					function s(t, i) {
						var r = t.text,
							o = void 0 === r ? "" : r,
							a = t.font,
							s = void 0 === a ? h : a,
							l = t.sdfGlyphSize,
							f = void 0 === l ? 64 : l,
							p = t.fontSize,
							m = void 0 === p ? 1 : p,
							v = t.letterSpacing,
							b = void 0 === v ? 0 : v,
							y = t.lineHeight,
							A = void 0 === y ? "normal" : y,
							w = t.maxWidth,
							k = void 0 === w ? g : w,
							C = t.textAlign,
							x = void 0 === C ? "left" : C,
							S = t.textIndent,
							_ = void 0 === S ? 0 : S,
							U = t.whiteSpace,
							E = void 0 === U ? "normal" : U,
							T = t.overflowWrap,
							F = void 0 === T ? "normal" : T,
							I = t.anchorX,
							O = void 0 === I ? 0 : I,
							D = t.anchorY,
							R = void 0 === D ? 0 : D,
							M = t.includeCaretPositions,
							P = void 0 !== M && M,
							L = t.chunkedBoundsSize,
							z = void 0 === L ? 8192 : L,
							B = t.colorRanges,
							G = void 0 === B ? null : B,
							W =
							arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
							j = d(),
							V = {
								total: 0,
								fontLoad: 0,
								layout: 0,
								sdf: {},
								sdfTotal: 0
							};
						o.indexOf("\r") > -1 &&
							(console.warn(
									"FontProcessor.process: got text with \\r chars; normalizing to \\n"
								),
								(o = o.replace(/\r\n/g, "\n").replace(/\r/g, "\n"))),
							(m = +m),
							(b = +b),
							(k = +k),
							(A = A || "normal"),
							(_ = +_),
							n(s, f, function(t) {
								var r = t.fontObj,
									n = isFinite(k),
									a = null,
									s = null,
									l = null,
									h = null,
									p = null,
									v = null,
									y = null,
									w = 0,
									C = 0,
									S = "nowrap" !== E,
									U = r.ascender,
									T = r.descender,
									I = r.unitsPerEm;
								V.fontLoad = d() - j;
								var D = d(),
									M = m / I;
								"normal" === A && (A = (U - T) / I), (A *= m);
								var L = (A - (U - T) * M) / 2,
									B = -(U * M + L),
									H = Math.min(A, (U - T) * M),
									N = ((U + T) / 2) * M - H / 2,
									X = _,
									q = new c(),
									Y = [q];
								r.forEachGlyph(o, m, b, function(t, e, i) {
										var r = o.charAt(i),
											a = t.advanceWidth * M,
											s = q.count,
											l = void 0;
										if (
											("isEmpty" in t ||
												((t.isWhitespace = !!r && /\s/.test(r)),
													(t.isEmpty = t.xMin === t.xMax || t.yMin === t.yMax)),
												t.isWhitespace || t.isEmpty || C++,
												S && n && !t.isWhitespace && e + a + X > k && s)
										) {
											if (q.glyphAt(s - 1).glyphObj.isWhitespace)
												(l = new c()), (X = -e);
											else
												for (var u = s; u--;) {
													if (0 === u && "break-word" === F) {
														(l = new c()), (X = -e);
														break;
													}
													if (q.glyphAt(u).glyphObj.isWhitespace) {
														l = q.splitAt(u + 1);
														var d = l.glyphAt(0).x;
														X -= d;
														for (var h = l.count; h--;) l.glyphAt(h).x -= d;
														break;
													}
												}
											l && ((q.isSoftWrapped = !0), (q = l), Y.push(q), (w = k));
										}
										var f = q.glyphAt(q.count);
										(f.glyphObj = t),
										(f.x = e + X),
										(f.width = a),
										(f.charIndex = i),
										"\n" === r &&
											((q = new c()), Y.push(q), (X = -(e + a + b * m) + _));
									}),
									Y.forEach(function(t) {
										for (var e = t.count; e--;) {
											var i = t.glyphAt(e),
												r = i.glyphObj,
												o = i.x,
												n = i.width;
											if (!r.isWhitespace)
												return (
													(t.width = o + n), void(t.width > w && (w = t.width))
												);
										}
									});
								var Q = 0,
									$ = 0;
								if (
									(O &&
										("number" == typeof O ?
											(Q = -O) :
											"string" == typeof O &&
											(Q = -w *
												("left" === O ?
													0 :
													"center" === O ?
													0.5 :
													"right" === O ?
													1 :
													u(O)))),
										R)
								)
									if ("number" == typeof R) $ = -R;
									else if ("string" == typeof R) {
									var K = Y.length * A;
									$ =
										"top" === R ?
										0 :
										"top-baseline" === R ?
										-B :
										"middle" === R ?
										K / 2 :
										"bottom" === R ?
										K :
										"bottom-baseline" === R ?
										K - L + T * M :
										u(R) * K;
								}
								if (!W) {
									(s = new Float32Array(4 * C)),
									(l = new Float32Array(C)),
									(v = [g, g, -g, -g]),
									(y = []);
									var Z = B;
									P && (p = new Float32Array(3 * o.length)),
										G && (h = new Uint8Array(3 * C));
									var J = 0,
										tt = -1,
										et = -1,
										it = void 0,
										rt = void 0;
									Y.forEach(function(i) {
										var r = i.count,
											n = i.width;
										if (r > 0) {
											var u = 0,
												c = 0;
											if ("center" === x) u = (w - n) / 2;
											else if ("right" === x) u = w - n;
											else if ("justify" === x && i.isSoftWrapped) {
												for (var m = 0, b = r; b--;)
													if (!i.glyphAt(b).glyphObj.isWhitespace) {
														for (; b--;)
															i.glyphAt(b).glyphObj,
															i.glyphAt(b).glyphObj.isWhitespace && m++;
														break;
													}
												c = (w - n) / m;
											}
											for (var k = 0; k < r; k++) {
												var C = i.glyphAt(k),
													S = C.glyphObj;
												if (
													(u && (C.x += u),
														0 !== c &&
														S.isWhitespace &&
														((u += c), (C.width += c)),
														P)
												) {
													var _ = C.charIndex;
													for (
														p[3 * _] = C.x + Q,
														p[3 * _ + 1] = C.x + C.width + Q,
														p[3 * _ + 2] = Z + N + $; _ - tt > 1;

													)
														(p[3 * (tt + 1)] = p[3 * tt + 1]),
														(p[3 * (tt + 1) + 1] = p[3 * tt + 1]),
														(p[3 * (tt + 1) + 2] = p[3 * tt + 2]),
														tt++;
													tt = _;
												}
												if (G)
													for (var U = C.charIndex; U > et;)
														et++, G.hasOwnProperty(et) && (rt = G[et]);
												if (!S.isWhitespace && !S.isEmpty) {
													var E = J++,
														T = t.glyphs[S.index];
													if (!T) {
														var F = d(),
															I = e(S, f);
														(V.sdf[o.charAt(C.charIndex)] = d() - F),
														(I.atlasIndex = t.glyphCount++),
														a || (a = []),
															a.push(I),
															(T = t.glyphs[S.index] = {
																atlasIndex: I.atlasIndex,
																glyphObj: S,
																renderingBounds: I.renderingBounds,
															});
													}
													var O = T.renderingBounds,
														D = 4 * E,
														R = C.x + Q,
														L = Z + $;
													(s[D] = R + O[0] * M),
													(s[D + 1] = L + O[1] * M),
													(s[D + 2] = R + O[2] * M),
													(s[D + 3] = L + O[3] * M);
													var B = R + S.xMin * M,
														W = L + S.yMin * M,
														j = R + S.xMax * M,
														H = L + S.yMax * M;
													B < v[0] && (v[0] = B),
														W < v[1] && (v[1] = W),
														j > v[2] && (v[2] = j),
														H > v[3] && (v[3] = H),
														E % z == 0 &&
														((it = {
																start: E,
																end: E,
																rect: [g, g, -g, -g],
															}),
															y.push(it)),
														it.end++;
													var X = it.rect;
													if (
														(B < X[0] && (X[0] = B),
															W < X[1] && (X[1] = W),
															j > X[2] && (X[2] = j),
															H > X[3] && (X[3] = H),
															(l[E] = T.atlasIndex),
															G)
													) {
														var q = 3 * E;
														(h[q] = (rt >> 16) & 255),
														(h[q + 1] = (rt >> 8) & 255),
														(h[q + 2] = 255 & rt);
													}
												}
											}
										}
										Z -= A;
									});
								}
								for (var ot in V.sdf) V.sdfTotal += V.sdf[ot];
								(V.layout = d() - D - V.sdfTotal),
								(V.total = d() - j),
								i({
									glyphBounds: s,
									glyphAtlasIndices: l,
									caretPositions: p,
									caretHeight: H,
									glyphColors: h,
									chunkedBounds: y,
									ascender: U * M,
									descender: T * M,
									lineHeight: A,
									topBaseline: B,
									blockBounds: [Q, $ - Y.length * A, Q + w, $],
									visibleBounds: v,
									newGlyphSDFs: a,
									timings: V,
								});
							});
					}

					function l(t, e) {
						s(
							t,
							function(t) {
								var i = a(t.blockBounds, 4),
									r = i[0],
									o = i[1],
									n = i[2],
									s = i[3];
								e({
									width: n - r,
									height: s - o
								});
							}, {
								metricsOnly: !0
							}
						);
					}

					function u(t) {
						var e = t.match(/^([\d.]+)%$/),
							i = e ? parseFloat(e[1]) : NaN;
						return isNaN(i) ? 0 : i / 100;
					}

					function d() {
						return (self.performance || Date).now();
					}

					function c() {
						this.data = [];
					}
					var h = i.defaultFontURL,
						f = Object.create(null),
						p = Object.create(null),
						g = 1 / 0;
					return (
						(c.prototype = {
							width: 0,
							isSoftWrapped: !1,
							get count() {
								return Math.ceil(this.data.length / 4);
							},
							glyphAt: function(t) {
								var e = c.flyweight;
								return (e.data = this.data), (e.index = t), e;
							},
							splitAt: function(t) {
								var e = new c();
								return (e.data = this.data.splice(4 * t)), e;
							},
						}),
						(c.flyweight = ["glyphObj", "x", "width", "charIndex"].reduce(
							function(t, e, i, r) {
								return (
									Object.defineProperty(t, e, {
										get: function() {
											return this.data[4 * this.index + i];
										},
										set: function(t) {
											this.data[4 * this.index + i] = t;
										},
									}),
									t
								);
							}, {
								data: null,
								index: 0
							}
						)), {
							process: s,
							measure: l,
							loadFont: o
						}
					);
				}

				function U() {
					function t() {
						n &&
							(a.sort(function(t, e) {
									return t.maxX - e.maxX;
								}),
								(n = !1));
					}

					function e(t, e, i, r) {
						var o = {
							x0: t,
							y0: e,
							x1: i,
							y1: r,
							minX: Math.min(t, i),
							minY: Math.min(e, r),
							maxX: Math.max(t, i),
							maxY: Math.max(e, r),
						};
						a.push(o), (n = !0);
					}

					function i(e, i) {
						t();
						for (var n = 1 / 0, s = 1 / 0, l = a.length; l--;) {
							var u = a[l];
							if (u.maxX + s <= e) break;
							if (e + s > u.minX && i - s < u.maxY && i + s > u.minY) {
								var d = o(e, i, u.x0, u.y0, u.x1, u.y1);
								d < n && ((n = d), (s = Math.sqrt(n)));
							}
						}
						return r(e, i) && (s = -s), s;
					}

					function r(e, i) {
						t();
						for (var r = !1, o = a.length; o--;) {
							var n = a[o];
							if (n.maxX <= e) break;
							if (n.minY < i && n.maxY > i) {
								n.y0 > i != n.y1 > i &&
									e < ((n.x1 - n.x0) * (i - n.y0)) / (n.y1 - n.y0) + n.x0 &&
									(r = !r);
							}
						}
						return r;
					}

					function o(t, e, i, r, o, n) {
						var a = o - i,
							s = n - r,
							l = a * a + s * s,
							u = l ?
							Math.max(0, Math.min(1, ((t - i) * a + (e - r) * s) / l)) :
							0,
							d = t - (i + u * a),
							c = e - (r + u * s);
						return d * d + c * c;
					}
					var n = !1,
						a = [];
					return {
						addLineSegment: e,
						findNearestSignedDistance: i
					};
				}

				function E() {
					var t = self,
						e = {};
					return (
						(e.parse = function(t) {
							var i = e._bin,
								r = new Uint8Array(t);
							if ("ttcf" == i.readASCII(r, 0, 4)) {
								var o = 4;
								i.readUshort(r, o), (o += 2), i.readUshort(r, o), (o += 2);
								var n = i.readUint(r, o);
								o += 4;
								for (var a = [], s = 0; s < n; s++) {
									var l = i.readUint(r, o);
									(o += 4), a.push(e._readFont(r, l));
								}
								return a;
							}
							return [e._readFont(r, 0)];
						}),
						(e._readFont = function(t, i) {
							var r = e._bin,
								o = i;
							r.readFixed(t, i);
							i += 4;
							var n = r.readUshort(t, i);
							i += 2;
							r.readUshort(t, i);
							i += 2;
							r.readUshort(t, i);
							i += 2;
							r.readUshort(t, i);
							i += 2;
							for (
								var a = [
										"cmap",
										"head",
										"hhea",
										"maxp",
										"hmtx",
										"name",
										"OS/2",
										"post",
										"loca",
										"glyf",
										"kern",
										"CFF ",
										"GPOS",
										"GSUB",
										"SVG ",
									],
									s = {
										_data: t,
										_offset: o
									},
									l = {},
									u = 0; u < n; u++
							) {
								var d = r.readASCII(t, i, 4);
								i += 4;
								r.readUint(t, i);
								i += 4;
								var c = r.readUint(t, i);
								i += 4;
								var h = r.readUint(t, i);
								(i += 4), (l[d] = {
									offset: c,
									length: h
								});
							}
							for (var u = 0; u < a.length; u++) {
								var f = a[u];
								l[f] &&
									(s[f.trim()] = e[f.trim()].parse(
										t,
										l[f].offset,
										l[f].length,
										s
									));
							}
							return s;
						}),
						(e._tabOffset = function(t, i, r) {
							for (
								var o = e._bin, n = o.readUshort(t, r + 4), a = r + 12, s = 0; s < n; s++
							) {
								var l = o.readASCII(t, a, 4);
								a += 4;
								o.readUint(t, a);
								a += 4;
								var u = o.readUint(t, a);
								a += 4;
								o.readUint(t, a);
								if (((a += 4), l == i)) return u;
							}
							return 0;
						}),
						(e._bin = {
							readFixed: function(t, e) {
								return (
									((t[e] << 8) | t[e + 1]) +
									((t[e + 2] << 8) | t[e + 3]) / 65540
								);
							},
							readF2dot14: function(t, i) {
								return e._bin.readShort(t, i) / 16384;
							},
							readInt: function(t, i) {
								var r = e._bin.t.uint8;
								return (
									(r[0] = t[i + 3]),
									(r[1] = t[i + 2]),
									(r[2] = t[i + 1]),
									(r[3] = t[i]),
									e._bin.t.int32[0]
								);
							},
							readInt8: function(t, i) {
								return (e._bin.t.uint8[0] = t[i]), e._bin.t.int8[0];
							},
							readShort: function(t, i) {
								var r = e._bin.t.uint8;
								return (r[1] = t[i]), (r[0] = t[i + 1]), e._bin.t.int16[0];
							},
							readUshort: function(t, e) {
								return (t[e] << 8) | t[e + 1];
							},
							readUshorts: function(t, i, r) {
								for (var o = [], n = 0; n < r; n++)
									o.push(e._bin.readUshort(t, i + 2 * n));
								return o;
							},
							readUint: function(t, i) {
								var r = e._bin.t.uint8;
								return (
									(r[3] = t[i]),
									(r[2] = t[i + 1]),
									(r[1] = t[i + 2]),
									(r[0] = t[i + 3]),
									e._bin.t.uint32[0]
								);
							},
							readUint64: function(t, i) {
								return (
									4294967296 * e._bin.readUint(t, i) + e._bin.readUint(t, i + 4)
								);
							},
							readASCII: function(t, e, i) {
								for (var r = "", o = 0; o < i; o++)
									r += String.fromCharCode(t[e + o]);
								return r;
							},
							readUnicode: function(t, e, i) {
								for (var r = "", o = 0; o < i; o++) {
									var n = (t[e++] << 8) | t[e++];
									r += String.fromCharCode(n);
								}
								return r;
							},
							_tdec: t.TextDecoder ? new t.TextDecoder() : null,
							readUTF8: function(t, i, r) {
								var o = e._bin._tdec;
								return o && 0 == i && r == t.length ?
									o.decode(t) :
									e._bin.readASCII(t, i, r);
							},
							readBytes: function(t, e, i) {
								for (var r = [], o = 0; o < i; o++) r.push(t[e + o]);
								return r;
							},
							readASCIIArray: function(t, e, i) {
								for (var r = [], o = 0; o < i; o++)
									r.push(String.fromCharCode(t[e + o]));
								return r;
							},
						}),
						(e._bin.t = {
							buff: new ArrayBuffer(8)
						}),
						(e._bin.t.int8 = new Int8Array(e._bin.t.buff)),
						(e._bin.t.uint8 = new Uint8Array(e._bin.t.buff)),
						(e._bin.t.int16 = new Int16Array(e._bin.t.buff)),
						(e._bin.t.uint16 = new Uint16Array(e._bin.t.buff)),
						(e._bin.t.int32 = new Int32Array(e._bin.t.buff)),
						(e._bin.t.uint32 = new Uint32Array(e._bin.t.buff)),
						(e._lctf = {}),
						(e._lctf.parse = function(t, i, r, o, n) {
							var a = e._bin,
								s = {},
								l = i;
							a.readFixed(t, i);
							i += 4;
							var u = a.readUshort(t, i);
							i += 2;
							var d = a.readUshort(t, i);
							i += 2;
							var c = a.readUshort(t, i);
							return (
								(i += 2),
								(s.scriptList = e._lctf.readScriptList(t, l + u)),
								(s.featureList = e._lctf.readFeatureList(t, l + d)),
								(s.lookupList = e._lctf.readLookupList(t, l + c, n)),
								s
							);
						}),
						(e._lctf.readLookupList = function(t, i, r) {
							var o = e._bin,
								n = i,
								a = [],
								s = o.readUshort(t, i);
							i += 2;
							for (var l = 0; l < s; l++) {
								var u = o.readUshort(t, i);
								i += 2;
								var d = e._lctf.readLookupTable(t, n + u, r);
								a.push(d);
							}
							return a;
						}),
						(e._lctf.readLookupTable = function(t, i, r) {
							var o = e._bin,
								n = i,
								a = {
									tabs: []
								};
							(a.ltype = o.readUshort(t, i)),
							(i += 2),
							(a.flag = o.readUshort(t, i)),
							(i += 2);
							var s = o.readUshort(t, i);
							i += 2;
							for (var l = 0; l < s; l++) {
								var u = o.readUshort(t, i);
								i += 2;
								var d = r(t, a.ltype, n + u);
								a.tabs.push(d);
							}
							return a;
						}),
						(e._lctf.numOfOnes = function(t) {
							for (var e = 0, i = 0; i < 32; i++) 0 != ((t >>> i) & 1) && e++;
							return e;
						}),
						(e._lctf.readClassDef = function(t, i) {
							var r = e._bin,
								o = [],
								n = r.readUshort(t, i);
							if (((i += 2), 1 == n)) {
								var a = r.readUshort(t, i);
								i += 2;
								var s = r.readUshort(t, i);
								i += 2;
								for (var l = 0; l < s; l++)
									o.push(a + l),
									o.push(a + l),
									o.push(r.readUshort(t, i)),
									(i += 2);
							}
							if (2 == n) {
								var u = r.readUshort(t, i);
								i += 2;
								for (var l = 0; l < u; l++)
									o.push(r.readUshort(t, i)),
									(i += 2),
									o.push(r.readUshort(t, i)),
									(i += 2),
									o.push(r.readUshort(t, i)),
									(i += 2);
							}
							return o;
						}),
						(e._lctf.getInterval = function(t, e) {
							for (var i = 0; i < t.length; i += 3) {
								var r = t[i],
									o = t[i + 1];
								t[i + 2];
								if (r <= e && e <= o) return i;
							}
							return -1;
						}),
						(e._lctf.readCoverage = function(t, i) {
							var r = e._bin,
								o = {};
							(o.fmt = r.readUshort(t, i)), (i += 2);
							var n = r.readUshort(t, i);
							return (
								(i += 2),
								1 == o.fmt && (o.tab = r.readUshorts(t, i, n)),
								2 == o.fmt && (o.tab = r.readUshorts(t, i, 3 * n)),
								o
							);
						}),
						(e._lctf.coverageIndex = function(t, i) {
							var r = t.tab;
							if (1 == t.fmt) return r.indexOf(i);
							if (2 == t.fmt) {
								var o = e._lctf.getInterval(r, i);
								if (-1 != o) return r[o + 2] + (i - r[o]);
							}
							return -1;
						}),
						(e._lctf.readFeatureList = function(t, i) {
							var r = e._bin,
								o = i,
								n = [],
								a = r.readUshort(t, i);
							i += 2;
							for (var s = 0; s < a; s++) {
								var l = r.readASCII(t, i, 4);
								i += 4;
								var u = r.readUshort(t, i);
								(i += 2),
								n.push({
									tag: l.trim(),
									tab: e._lctf.readFeatureTable(t, o + u),
								});
							}
							return n;
						}),
						(e._lctf.readFeatureTable = function(t, i) {
							var r = e._bin;
							r.readUshort(t, i);
							i += 2;
							var o = r.readUshort(t, i);
							i += 2;
							for (var n = [], a = 0; a < o; a++)
								n.push(r.readUshort(t, i + 2 * a));
							return n;
						}),
						(e._lctf.readScriptList = function(t, i) {
							var r = e._bin,
								o = i,
								n = {},
								a = r.readUshort(t, i);
							i += 2;
							for (var s = 0; s < a; s++) {
								var l = r.readASCII(t, i, 4);
								i += 4;
								var u = r.readUshort(t, i);
								(i += 2), (n[l.trim()] = e._lctf.readScriptTable(t, o + u));
							}
							return n;
						}),
						(e._lctf.readScriptTable = function(t, i) {
							var r = e._bin,
								o = i,
								n = {},
								a = r.readUshort(t, i);
							(i += 2), (n.default = e._lctf.readLangSysTable(t, o + a));
							var s = r.readUshort(t, i);
							i += 2;
							for (var l = 0; l < s; l++) {
								var u = r.readASCII(t, i, 4);
								i += 4;
								var d = r.readUshort(t, i);
								(i += 2), (n[u.trim()] = e._lctf.readLangSysTable(t, o + d));
							}
							return n;
						}),
						(e._lctf.readLangSysTable = function(t, i) {
							var r = e._bin,
								o = {};
							r.readUshort(t, i);
							(i += 2), (o.reqFeature = r.readUshort(t, i)), (i += 2);
							var n = r.readUshort(t, i);
							return (i += 2), (o.features = r.readUshorts(t, i, n)), o;
						}),
						(e.CFF = {}),
						(e.CFF.parse = function(t, i, r) {
							var o = e._bin;
							(t = new Uint8Array(t.buffer, i, r)), (i = 0);
							t[i];
							i++;
							t[i];
							i++;
							t[i];
							i++;
							t[i];
							i++;
							var n = [];
							i = e.CFF.readIndex(t, i, n);
							for (var a = [], s = 0; s < n.length - 1; s++)
								a.push(o.readASCII(t, i + n[s], n[s + 1] - n[s]));
							i += n[n.length - 1];
							var l = [];
							i = e.CFF.readIndex(t, i, l);
							for (var u = [], s = 0; s < l.length - 1; s++)
								u.push(e.CFF.readDict(t, i + l[s], i + l[s + 1]));
							i += l[l.length - 1];
							var d = u[0],
								c = [];
							i = e.CFF.readIndex(t, i, c);
							for (var h = [], s = 0; s < c.length - 1; s++)
								h.push(o.readASCII(t, i + c[s], c[s + 1] - c[s]));
							if (
								((i += c[c.length - 1]),
									e.CFF.readSubrs(t, i, d),
									d.CharStrings)
							) {
								i = d.CharStrings;
								var c = [];
								i = e.CFF.readIndex(t, i, c);
								for (var f = [], s = 0; s < c.length - 1; s++)
									f.push(o.readBytes(t, i + c[s], c[s + 1] - c[s]));
								d.CharStrings = f;
							}
							if (d.ROS) {
								i = d.FDArray;
								var p = [];
								(i = e.CFF.readIndex(t, i, p)), (d.FDArray = []);
								for (var s = 0; s < p.length - 1; s++) {
									var g = e.CFF.readDict(t, i + p[s], i + p[s + 1]);
									e.CFF._readFDict(t, g, h), d.FDArray.push(g);
								}
								(i += p[p.length - 1]), (i = d.FDSelect), (d.FDSelect = []);
								var m = t[i];
								if ((i++, 3 != m)) throw m;
								var v = o.readUshort(t, i);
								i += 2;
								for (var s = 0; s < v + 1; s++)
									d.FDSelect.push(o.readUshort(t, i), t[i + 2]), (i += 3);
							}
							return (
								d.Encoding &&
								(d.Encoding = e.CFF.readEncoding(
									t,
									d.Encoding,
									d.CharStrings.length
								)),
								d.charset &&
								(d.charset = e.CFF.readCharset(
									t,
									d.charset,
									d.CharStrings.length
								)),
								e.CFF._readFDict(t, d, h),
								d
							);
						}),
						(e.CFF._readFDict = function(t, i, r) {
							var o;
							i.Private &&
								((o = i.Private[1]),
									(i.Private = e.CFF.readDict(t, o, o + i.Private[0])),
									i.Private.Subrs &&
									e.CFF.readSubrs(t, o + i.Private.Subrs, i.Private));
							for (var n in i)
								-
								1 != [
									"FamilyName",
									"FontName",
									"FullName",
									"Notice",
									"version",
									"Copyright",
								].indexOf(n) && (i[n] = r[i[n] - 426 + 35]);
						}),
						(e.CFF.readSubrs = function(t, i, r) {
							var o = e._bin,
								n = [];
							i = e.CFF.readIndex(t, i, n);
							var a,
								s = n.length;
							(a = s < 1240 ? 107 : s < 33900 ? 1131 : 32768),
							(r.Bias = a),
							(r.Subrs = []);
							for (var l = 0; l < n.length - 1; l++)
								r.Subrs.push(o.readBytes(t, i + n[l], n[l + 1] - n[l]));
						}),
						(e.CFF.tableSE = [
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
							12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
							28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
							44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
							60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
							76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
							92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99,
							100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111,
							112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123,
							0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134,
							135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144,
							0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0,
						]),
						(e.CFF.glyphByUnicode = function(t, e) {
							for (var i = 0; i < t.charset.length; i++)
								if (t.charset[i] == e) return i;
							return -1;
						}),
						(e.CFF.glyphBySE = function(t, i) {
							return i < 0 || i > 255 ?
								-1 :
								e.CFF.glyphByUnicode(t, e.CFF.tableSE[i]);
						}),
						(e.CFF.readEncoding = function(t, i, r) {
							var o = (e._bin, [".notdef"]),
								n = t[i];
							if ((i++, 0 != n)) throw "error: unknown encoding format: " + n;
							var a = t[i];
							i++;
							for (var s = 0; s < a; s++) o.push(t[i + s]);
							return o;
						}),
						(e.CFF.readCharset = function(t, i, r) {
							var o = e._bin,
								n = [".notdef"],
								a = t[i];
							if ((i++, 0 == a))
								for (var s = 0; s < r; s++) {
									var l = o.readUshort(t, i);
									(i += 2), n.push(l);
								}
							else {
								if (1 != a && 2 != a) throw "error: format: " + a;
								for (; n.length < r;) {
									var l = o.readUshort(t, i);
									i += 2;
									var u = 0;
									1 == a ?
										((u = t[i]), i++) :
										((u = o.readUshort(t, i)), (i += 2));
									for (var s = 0; s <= u; s++) n.push(l), l++;
								}
							}
							return n;
						}),
						(e.CFF.readIndex = function(t, i, r) {
							var o = e._bin,
								n = o.readUshort(t, i) + 1;
							i += 2;
							var a = t[i];
							if ((i++, 1 == a))
								for (var s = 0; s < n; s++) r.push(t[i + s]);
							else if (2 == a)
								for (var s = 0; s < n; s++) r.push(o.readUshort(t, i + 2 * s));
							else if (3 == a)
								for (var s = 0; s < n; s++)
									r.push(16777215 & o.readUint(t, i + 3 * s - 1));
							else if (1 != n)
								throw "unsupported offset size: " + a + ", count: " + n;
							return (i += n * a) - 1;
						}),
						(e.CFF.getCharString = function(t, i, r) {
							var o = e._bin,
								n = t[i],
								a = t[i + 1],
								s = (t[i + 2], t[i + 3], t[i + 4], 1),
								l = null,
								u = null;
							n <= 20 && ((l = n), (s = 1)),
								12 == n && ((l = 100 * n + a), (s = 2)),
								21 <= n && n <= 27 && ((l = n), (s = 1)),
								28 == n && ((u = o.readShort(t, i + 1)), (s = 3)),
								29 <= n && n <= 31 && ((l = n), (s = 1)),
								32 <= n && n <= 246 && ((u = n - 139), (s = 1)),
								247 <= n &&
								n <= 250 &&
								((u = 256 * (n - 247) + a + 108), (s = 2)),
								251 <= n &&
								n <= 254 &&
								((u = 256 * -(n - 251) - a - 108), (s = 2)),
								255 == n && ((u = o.readInt(t, i + 1) / 65535), (s = 5)),
								(r.val = null != u ? u : "o" + l),
								(r.size = s);
						}),
						(e.CFF.readCharString = function(t, i, r) {
							for (var o = i + r, n = e._bin, a = []; i < o;) {
								var s = t[i],
									l = t[i + 1],
									u = (t[i + 2], t[i + 3], t[i + 4], 1),
									d = null,
									c = null;
								s <= 20 && ((d = s), (u = 1)),
									12 == s && ((d = 100 * s + l), (u = 2)),
									(19 != s && 20 != s) || ((d = s), (u = 2)),
									21 <= s && s <= 27 && ((d = s), (u = 1)),
									28 == s && ((c = n.readShort(t, i + 1)), (u = 3)),
									29 <= s && s <= 31 && ((d = s), (u = 1)),
									32 <= s && s <= 246 && ((c = s - 139), (u = 1)),
									247 <= s &&
									s <= 250 &&
									((c = 256 * (s - 247) + l + 108), (u = 2)),
									251 <= s &&
									s <= 254 &&
									((c = 256 * -(s - 251) - l - 108), (u = 2)),
									255 == s && ((c = n.readInt(t, i + 1) / 65535), (u = 5)),
									a.push(null != c ? c : "o" + d),
									(i += u);
							}
							return a;
						}),
						(e.CFF.readDict = function(t, i, r) {
							for (var o = e._bin, n = {}, a = []; i < r;) {
								var s = t[i],
									l = t[i + 1],
									u = (t[i + 2], t[i + 3], t[i + 4], 1),
									d = null,
									c = null;
								if (
									(28 == s && ((c = o.readShort(t, i + 1)), (u = 3)),
										29 == s && ((c = o.readInt(t, i + 1)), (u = 5)),
										32 <= s && s <= 246 && ((c = s - 139), (u = 1)),
										247 <= s &&
										s <= 250 &&
										((c = 256 * (s - 247) + l + 108), (u = 2)),
										251 <= s &&
										s <= 254 &&
										((c = 256 * -(s - 251) - l - 108), (u = 2)),
										255 == s)
								)
									throw (
										((c = o.readInt(t, i + 1) / 65535),
											(u = 5),
											"unknown number")
									);
								if (30 == s) {
									var h = [];
									for (u = 1;;) {
										var f = t[i + u];
										u++;
										var p = f >> 4,
											g = 15 & f;
										if ((15 != p && h.push(p), 15 != g && h.push(g), 15 == g))
											break;
									}
									for (
										var m = "",
											v = [
												0,
												1,
												2,
												3,
												4,
												5,
												6,
												7,
												8,
												9,
												".",
												"e",
												"e-",
												"reserved",
												"-",
												"endOfNumber",
											],
											b = 0; b < h.length; b++
									)
										m += v[h[b]];
									c = parseFloat(m);
								}
								if (s <= 21) {
									var y = [
										"version",
										"Notice",
										"FullName",
										"FamilyName",
										"Weight",
										"FontBBox",
										"BlueValues",
										"OtherBlues",
										"FamilyBlues",
										"FamilyOtherBlues",
										"StdHW",
										"StdVW",
										"escape",
										"UniqueID",
										"XUID",
										"charset",
										"Encoding",
										"CharStrings",
										"Private",
										"Subrs",
										"defaultWidthX",
										"nominalWidthX",
									];
									if (((d = y[s]), (u = 1), 12 == s)) {
										var y = [
											"Copyright",
											"isFixedPitch",
											"ItalicAngle",
											"UnderlinePosition",
											"UnderlineThickness",
											"PaintType",
											"CharstringType",
											"FontMatrix",
											"StrokeWidth",
											"BlueScale",
											"BlueShift",
											"BlueFuzz",
											"StemSnapH",
											"StemSnapV",
											"ForceBold",
											0,
											0,
											"LanguageGroup",
											"ExpansionFactor",
											"initialRandomSeed",
											"SyntheticBase",
											"PostScript",
											"BaseFontName",
											"BaseFontBlend",
											0,
											0,
											0,
											0,
											0,
											0,
											"ROS",
											"CIDFontVersion",
											"CIDFontRevision",
											"CIDFontType",
											"CIDCount",
											"UIDBase",
											"FDArray",
											"FDSelect",
											"FontName",
										];
										(d = y[l]), (u = 2);
									}
								}
								null != d ?
									((n[d] = 1 == a.length ? a[0] : a), (a = [])) :
									a.push(c),
									(i += u);
							}
							return n;
						}),
						(e.cmap = {}),
						(e.cmap.parse = function(t, i, r) {
							(t = new Uint8Array(t.buffer, i, r)), (i = 0);
							var o = e._bin,
								n = {};
							o.readUshort(t, i);
							i += 2;
							var a = o.readUshort(t, i);
							i += 2;
							var s = [];
							n.tables = [];
							for (var l = 0; l < a; l++) {
								var u = o.readUshort(t, i);
								i += 2;
								var d = o.readUshort(t, i);
								i += 2;
								var c = o.readUint(t, i);
								i += 4;
								var h = "p" + u + "e" + d,
									f = s.indexOf(c);
								if (-1 == f) {
									f = n.tables.length;
									var p;
									s.push(c);
									var g = o.readUshort(t, c);
									0 == g ?
										(p = e.cmap.parse0(t, c)) :
										4 == g ?
										(p = e.cmap.parse4(t, c)) :
										6 == g ?
										(p = e.cmap.parse6(t, c)) :
										12 == g ?
										(p = e.cmap.parse12(t, c)) :
										console.log("unknown format: " + g, u, d, c),
										n.tables.push(p);
								}
								if (null != n[h])
									throw "multiple tables for one platform+encoding";
								n[h] = f;
							}
							return n;
						}),
						(e.cmap.parse0 = function(t, i) {
							var r = e._bin,
								o = {};
							(o.format = r.readUshort(t, i)), (i += 2);
							var n = r.readUshort(t, i);
							i += 2;
							r.readUshort(t, i);
							(i += 2), (o.map = []);
							for (var a = 0; a < n - 6; a++) o.map.push(t[i + a]);
							return o;
						}),
						(e.cmap.parse4 = function(t, i) {
							var r = e._bin,
								o = i,
								n = {};
							(n.format = r.readUshort(t, i)), (i += 2);
							var a = r.readUshort(t, i);
							i += 2;
							r.readUshort(t, i);
							i += 2;
							var s = r.readUshort(t, i);
							i += 2;
							var l = s / 2;
							(n.searchRange = r.readUshort(t, i)),
							(i += 2),
							(n.entrySelector = r.readUshort(t, i)),
							(i += 2),
							(n.rangeShift = r.readUshort(t, i)),
							(i += 2),
							(n.endCount = r.readUshorts(t, i, l)),
							(i += 2 * l),
							(i += 2),
							(n.startCount = r.readUshorts(t, i, l)),
							(i += 2 * l),
							(n.idDelta = []);
							for (var u = 0; u < l; u++)
								n.idDelta.push(r.readShort(t, i)), (i += 2);
							for (
								n.idRangeOffset = r.readUshorts(t, i, l),
								i += 2 * l,
								n.glyphIdArray = []; i < o + a;

							)
								n.glyphIdArray.push(r.readUshort(t, i)), (i += 2);
							return n;
						}),
						(e.cmap.parse6 = function(t, i) {
							var r = e._bin,
								o = {};
							(o.format = r.readUshort(t, i)), (i += 2);
							r.readUshort(t, i);
							i += 2;
							r.readUshort(t, i);
							(i += 2), (o.firstCode = r.readUshort(t, i)), (i += 2);
							var n = r.readUshort(t, i);
							(i += 2), (o.glyphIdArray = []);
							for (var a = 0; a < n; a++)
								o.glyphIdArray.push(r.readUshort(t, i)), (i += 2);
							return o;
						}),
						(e.cmap.parse12 = function(t, i) {
							var r = e._bin,
								o = {};
							(o.format = r.readUshort(t, i)), (i += 2), (i += 2);
							r.readUint(t, i);
							i += 4;
							r.readUint(t, i);
							i += 4;
							var n = r.readUint(t, i);
							(i += 4), (o.groups = []);
							for (var a = 0; a < n; a++) {
								var s = i + 12 * a,
									l = r.readUint(t, s + 0),
									u = r.readUint(t, s + 4),
									d = r.readUint(t, s + 8);
								o.groups.push([l, u, d]);
							}
							return o;
						}),
						(e.glyf = {}),
						(e.glyf.parse = function(t, e, i, r) {
							for (var o = [], n = 0; n < r.maxp.numGlyphs; n++) o.push(null);
							return o;
						}),
						(e.glyf._parseGlyf = function(t, i) {
							var r = e._bin,
								o = t._data,
								n = e._tabOffset(o, "glyf", t._offset) + t.loca[i];
							if (t.loca[i] == t.loca[i + 1]) return null;
							var a = {};
							if (
								((a.noc = r.readShort(o, n)),
									(n += 2),
									(a.xMin = r.readShort(o, n)),
									(n += 2),
									(a.yMin = r.readShort(o, n)),
									(n += 2),
									(a.xMax = r.readShort(o, n)),
									(n += 2),
									(a.yMax = r.readShort(o, n)),
									(n += 2),
									a.xMin >= a.xMax || a.yMin >= a.yMax)
							)
								return null;
							if (a.noc > 0) {
								a.endPts = [];
								for (var s = 0; s < a.noc; s++)
									a.endPts.push(r.readUshort(o, n)), (n += 2);
								var l = r.readUshort(o, n);
								if (((n += 2), o.length - n < l)) return null;
								(a.instructions = r.readBytes(o, n, l)), (n += l);
								var u = a.endPts[a.noc - 1] + 1;
								a.flags = [];
								for (var s = 0; s < u; s++) {
									var d = o[n];
									if ((n++, a.flags.push(d), 0 != (8 & d))) {
										var c = o[n];
										n++;
										for (var h = 0; h < c; h++) a.flags.push(d), s++;
									}
								}
								a.xs = [];
								for (var s = 0; s < u; s++) {
									var f = 0 != (2 & a.flags[s]),
										p = 0 != (16 & a.flags[s]);
									f
										?
										(a.xs.push(p ? o[n] : -o[n]), n++) :
										p ?
										a.xs.push(0) :
										(a.xs.push(r.readShort(o, n)), (n += 2));
								}
								a.ys = [];
								for (var s = 0; s < u; s++) {
									var f = 0 != (4 & a.flags[s]),
										p = 0 != (32 & a.flags[s]);
									f
										?
										(a.ys.push(p ? o[n] : -o[n]), n++) :
										p ?
										a.ys.push(0) :
										(a.ys.push(r.readShort(o, n)), (n += 2));
								}
								for (var g = 0, m = 0, s = 0; s < u; s++)
									(g += a.xs[s]), (m += a.ys[s]), (a.xs[s] = g), (a.ys[s] = m);
							} else {
								var v = 1,
									b = 2,
									y = 8,
									A = 32,
									w = 64,
									k = 128,
									C = 256;
								a.parts = [];
								var x;
								do {
									(x = r.readUshort(o, n)), (n += 2);
									var S = {
										m: {
											a: 1,
											b: 0,
											c: 0,
											d: 1,
											tx: 0,
											ty: 0
										},
										p1: -1,
										p2: -1,
									};
									if (
										(a.parts.push(S),
											(S.glyphIndex = r.readUshort(o, n)),
											(n += 2),
											x & v)
									) {
										var _ = r.readShort(o, n);
										n += 2;
										var U = r.readShort(o, n);
										n += 2;
									} else {
										var _ = r.readInt8(o, n);
										n++;
										var U = r.readInt8(o, n);
										n++;
									}
									x & b ?
										((S.m.tx = _), (S.m.ty = U)) :
										((S.p1 = _), (S.p2 = U)),
										x & y ?
										((S.m.a = S.m.d = r.readF2dot14(o, n)), (n += 2)) :
										x & w ?
										((S.m.a = r.readF2dot14(o, n)),
											(n += 2),
											(S.m.d = r.readF2dot14(o, n)),
											(n += 2)) :
										x & k &&
										((S.m.a = r.readF2dot14(o, n)),
											(n += 2),
											(S.m.b = r.readF2dot14(o, n)),
											(n += 2),
											(S.m.c = r.readF2dot14(o, n)),
											(n += 2),
											(S.m.d = r.readF2dot14(o, n)),
											(n += 2));
								} while (x & A);
								if (x & C) {
									var E = r.readUshort(o, n);
									(n += 2), (a.instr = []);
									for (var s = 0; s < E; s++) a.instr.push(o[n]), n++;
								}
							}
							return a;
						}),
						(e.GPOS = {}),
						(e.GPOS.parse = function(t, i, r, o) {
							return e._lctf.parse(t, i, r, o, e.GPOS.subt);
						}),
						(e.GPOS.subt = function(t, i, r) {
							var o = e._bin,
								n = r,
								a = {};
							if (
								((a.fmt = o.readUshort(t, r)),
									(r += 2),
									1 == i || 2 == i || 3 == i || 7 == i || (8 == i && a.fmt <= 2))
							) {
								var s = o.readUshort(t, r);
								(r += 2), (a.coverage = e._lctf.readCoverage(t, s + n));
							}
							if (1 == i && 1 == a.fmt) {
								var l = o.readUshort(t, r);
								r += 2;
								var u = e._lctf.numOfOnes(l);
								0 != l && (a.pos = e.GPOS.readValueRecord(t, r, l));
							} else if (2 == i) {
								var l = o.readUshort(t, r);
								r += 2;
								var d = o.readUshort(t, r);
								r += 2;
								var u = e._lctf.numOfOnes(l),
									c = e._lctf.numOfOnes(d);
								if (1 == a.fmt) {
									a.pairsets = [];
									var h = o.readUshort(t, r);
									r += 2;
									for (var f = 0; f < h; f++) {
										var p = n + o.readUshort(t, r);
										r += 2;
										var g = o.readUshort(t, p);
										p += 2;
										for (var m = [], v = 0; v < g; v++) {
											var b = o.readUshort(t, p);
											p += 2;
											var y, A;
											0 != l &&
												((y = e.GPOS.readValueRecord(t, p, l)), (p += 2 * u)),
												0 != d &&
												((A = e.GPOS.readValueRecord(t, p, d)), (p += 2 * c)),
												m.push({
													gid2: b,
													val1: y,
													val2: A
												});
										}
										a.pairsets.push(m);
									}
								}
								if (2 == a.fmt) {
									var w = o.readUshort(t, r);
									r += 2;
									var k = o.readUshort(t, r);
									r += 2;
									var C = o.readUshort(t, r);
									r += 2;
									var x = o.readUshort(t, r);
									(r += 2),
									(a.classDef1 = e._lctf.readClassDef(t, n + w)),
									(a.classDef2 = e._lctf.readClassDef(t, n + k)),
									(a.matrix = []);
									for (var f = 0; f < C; f++) {
										for (var S = [], v = 0; v < x; v++) {
											var y = null,
												A = null;
											0 != a.valFmt1 &&
												((y = e.GPOS.readValueRecord(t, r, a.valFmt1)),
													(r += 2 * u)),
												0 != a.valFmt2 &&
												((A = e.GPOS.readValueRecord(t, r, a.valFmt2)),
													(r += 2 * c)),
												S.push({
													val1: y,
													val2: A
												});
										}
										a.matrix.push(S);
									}
								}
							}
							return a;
						}),
						(e.GPOS.readValueRecord = function(t, i, r) {
							var o = e._bin,
								n = [];
							return (
								n.push(1 & r ? o.readShort(t, i) : 0),
								(i += 1 & r ? 2 : 0),
								n.push(2 & r ? o.readShort(t, i) : 0),
								(i += 2 & r ? 2 : 0),
								n.push(4 & r ? o.readShort(t, i) : 0),
								(i += 4 & r ? 2 : 0),
								n.push(8 & r ? o.readShort(t, i) : 0),
								(i += 8 & r ? 2 : 0),
								n
							);
						}),
						(e.GSUB = {}),
						(e.GSUB.parse = function(t, i, r, o) {
							return e._lctf.parse(t, i, r, o, e.GSUB.subt);
						}),
						(e.GSUB.subt = function(t, i, r) {
							var o = e._bin,
								n = r,
								a = {};
							if (
								((a.fmt = o.readUshort(t, r)),
									(r += 2),
									1 != i && 4 != i && 5 != i && 6 != i)
							)
								return null;
							if (
								1 == i ||
								4 == i ||
								(5 == i && a.fmt <= 2) ||
								(6 == i && a.fmt <= 2)
							) {
								var s = o.readUshort(t, r);
								(r += 2), (a.coverage = e._lctf.readCoverage(t, n + s));
							}
							if (1 == i) {
								if (1 == a.fmt)(a.delta = o.readShort(t, r)), (r += 2);
								else if (2 == a.fmt) {
									var l = o.readUshort(t, r);
									(r += 2),
									(a.newg = o.readUshorts(t, r, l)),
									(r += 2 * a.newg.length);
								}
							} else if (4 == i) {
								a.vals = [];
								var l = o.readUshort(t, r);
								r += 2;
								for (var u = 0; u < l; u++) {
									var d = o.readUshort(t, r);
									(r += 2), a.vals.push(e.GSUB.readLigatureSet(t, n + d));
								}
							} else if (5 == i) {
								if (2 == a.fmt) {
									var c = o.readUshort(t, r);
									(r += 2),
									(a.cDef = e._lctf.readClassDef(t, n + c)),
									(a.scset = []);
									var h = o.readUshort(t, r);
									r += 2;
									for (var u = 0; u < h; u++) {
										var f = o.readUshort(t, r);
										(r += 2),
										a.scset.push(
											0 == f ? null : e.GSUB.readSubClassSet(t, n + f)
										);
									}
								}
							} else if (6 == i && 3 == a.fmt) {
								for (var u = 0; u < 3; u++) {
									var l = o.readUshort(t, r);
									r += 2;
									for (var p = [], g = 0; g < l; g++)
										p.push(
											e._lctf.readCoverage(t, n + o.readUshort(t, r + 2 * g))
										);
									(r += 2 * l),
									0 == u && (a.backCvg = p),
										1 == u && (a.inptCvg = p),
										2 == u && (a.ahedCvg = p);
								}
								var l = o.readUshort(t, r);
								(r += 2),
								(a.lookupRec = e.GSUB.readSubstLookupRecords(t, r, l));
							}
							return a;
						}),
						(e.GSUB.readSubClassSet = function(t, i) {
							var r = e._bin.readUshort,
								o = i,
								n = [],
								a = r(t, i);
							i += 2;
							for (var s = 0; s < a; s++) {
								var l = r(t, i);
								(i += 2), n.push(e.GSUB.readSubClassRule(t, o + l));
							}
							return n;
						}),
						(e.GSUB.readSubClassRule = function(t, i) {
							var r = e._bin.readUshort,
								o = {},
								n = r(t, i);
							i += 2;
							var a = r(t, i);
							(i += 2), (o.input = []);
							for (var s = 0; s < n - 1; s++) o.input.push(r(t, i)), (i += 2);
							return (
								(o.substLookupRecords = e.GSUB.readSubstLookupRecords(t, i, a)),
								o
							);
						}),
						(e.GSUB.readSubstLookupRecords = function(t, i, r) {
							for (var o = e._bin.readUshort, n = [], a = 0; a < r; a++)
								n.push(o(t, i), o(t, i + 2)), (i += 4);
							return n;
						}),
						(e.GSUB.readChainSubClassSet = function(t, i) {
							var r = e._bin,
								o = i,
								n = [],
								a = r.readUshort(t, i);
							i += 2;
							for (var s = 0; s < a; s++) {
								var l = r.readUshort(t, i);
								(i += 2), n.push(e.GSUB.readChainSubClassRule(t, o + l));
							}
							return n;
						}),
						(e.GSUB.readChainSubClassRule = function(t, i) {
							for (
								var r = e._bin,
									o = {},
									n = ["backtrack", "input", "lookahead"],
									a = 0; a < n.length; a++
							) {
								var s = r.readUshort(t, i);
								(i += 2),
								1 == a && s--,
									(o[n[a]] = r.readUshorts(t, i, s)),
									(i += 2 * o[n[a]].length);
							}
							var s = r.readUshort(t, i);
							return (
								(i += 2),
								(o.subst = r.readUshorts(t, i, 2 * s)),
								(i += 2 * o.subst.length),
								o
							);
						}),
						(e.GSUB.readLigatureSet = function(t, i) {
							var r = e._bin,
								o = i,
								n = [],
								a = r.readUshort(t, i);
							i += 2;
							for (var s = 0; s < a; s++) {
								var l = r.readUshort(t, i);
								(i += 2), n.push(e.GSUB.readLigature(t, o + l));
							}
							return n;
						}),
						(e.GSUB.readLigature = function(t, i) {
							var r = e._bin,
								o = {
									chain: []
								};
							(o.nglyph = r.readUshort(t, i)), (i += 2);
							var n = r.readUshort(t, i);
							i += 2;
							for (var a = 0; a < n - 1; a++)
								o.chain.push(r.readUshort(t, i)), (i += 2);
							return o;
						}),
						(e.head = {}),
						(e.head.parse = function(t, i, r) {
							var o = e._bin,
								n = {};
							o.readFixed(t, i);
							(i += 4), (n.fontRevision = o.readFixed(t, i)), (i += 4);
							o.readUint(t, i);
							i += 4;
							o.readUint(t, i);
							return (
								(i += 4),
								(n.flags = o.readUshort(t, i)),
								(i += 2),
								(n.unitsPerEm = o.readUshort(t, i)),
								(i += 2),
								(n.created = o.readUint64(t, i)),
								(i += 8),
								(n.modified = o.readUint64(t, i)),
								(i += 8),
								(n.xMin = o.readShort(t, i)),
								(i += 2),
								(n.yMin = o.readShort(t, i)),
								(i += 2),
								(n.xMax = o.readShort(t, i)),
								(i += 2),
								(n.yMax = o.readShort(t, i)),
								(i += 2),
								(n.macStyle = o.readUshort(t, i)),
								(i += 2),
								(n.lowestRecPPEM = o.readUshort(t, i)),
								(i += 2),
								(n.fontDirectionHint = o.readShort(t, i)),
								(i += 2),
								(n.indexToLocFormat = o.readShort(t, i)),
								(i += 2),
								(n.glyphDataFormat = o.readShort(t, i)),
								(i += 2),
								n
							);
						}),
						(e.hhea = {}),
						(e.hhea.parse = function(t, i, r) {
							var o = e._bin,
								n = {};
							o.readFixed(t, i);
							return (
								(i += 4),
								(n.ascender = o.readShort(t, i)),
								(i += 2),
								(n.descender = o.readShort(t, i)),
								(i += 2),
								(n.lineGap = o.readShort(t, i)),
								(i += 2),
								(n.advanceWidthMax = o.readUshort(t, i)),
								(i += 2),
								(n.minLeftSideBearing = o.readShort(t, i)),
								(i += 2),
								(n.minRightSideBearing = o.readShort(t, i)),
								(i += 2),
								(n.xMaxExtent = o.readShort(t, i)),
								(i += 2),
								(n.caretSlopeRise = o.readShort(t, i)),
								(i += 2),
								(n.caretSlopeRun = o.readShort(t, i)),
								(i += 2),
								(n.caretOffset = o.readShort(t, i)),
								(i += 2),
								(i += 8),
								(n.metricDataFormat = o.readShort(t, i)),
								(i += 2),
								(n.numberOfHMetrics = o.readUshort(t, i)),
								(i += 2),
								n
							);
						}),
						(e.hmtx = {}),
						(e.hmtx.parse = function(t, i, r, o) {
							var n = e._bin,
								a = {};
							(a.aWidth = []), (a.lsBearing = []);
							for (var s = 0, l = 0, u = 0; u < o.maxp.numGlyphs; u++)
								u < o.hhea.numberOfHMetrics &&
								((s = n.readUshort(t, i)),
									(i += 2),
									(l = n.readShort(t, i)),
									(i += 2)),
								a.aWidth.push(s),
								a.lsBearing.push(l);
							return a;
						}),
						(e.kern = {}),
						(e.kern.parse = function(t, i, r, o) {
							var n = e._bin,
								a = n.readUshort(t, i);
							if (((i += 2), 1 == a)) return e.kern.parseV1(t, i - 2, r, o);
							var s = n.readUshort(t, i);
							i += 2;
							for (var l = {
									glyph1: [],
									rval: []
								}, u = 0; u < s; u++) {
								i += 2;
								var r = n.readUshort(t, i);
								i += 2;
								var d = n.readUshort(t, i);
								i += 2;
								var c = d >>> 8;
								if (0 != (c &= 15)) throw "unknown kern table format: " + c;
								i = e.kern.readFormat0(t, i, l);
							}
							return l;
						}),
						(e.kern.parseV1 = function(t, i, r, o) {
							var n = e._bin;
							n.readFixed(t, i);
							i += 4;
							var a = n.readUint(t, i);
							i += 4;
							for (var s = {
									glyph1: [],
									rval: []
								}, l = 0; l < a; l++) {
								n.readUint(t, i);
								i += 4;
								var u = n.readUshort(t, i);
								i += 2;
								n.readUshort(t, i);
								i += 2;
								var d = u >>> 8;
								if (0 != (d &= 15)) throw "unknown kern table format: " + d;
								i = e.kern.readFormat0(t, i, s);
							}
							return s;
						}),
						(e.kern.readFormat0 = function(t, i, r) {
							var o = e._bin,
								n = -1,
								a = o.readUshort(t, i);
							i += 2;
							o.readUshort(t, i);
							i += 2;
							o.readUshort(t, i);
							i += 2;
							o.readUshort(t, i);
							i += 2;
							for (var s = 0; s < a; s++) {
								var l = o.readUshort(t, i);
								i += 2;
								var u = o.readUshort(t, i);
								i += 2;
								var d = o.readShort(t, i);
								(i += 2),
								l != n &&
									(r.glyph1.push(l), r.rval.push({
										glyph2: [],
										vals: []
									}));
								var c = r.rval[r.rval.length - 1];
								c.glyph2.push(u), c.vals.push(d), (n = l);
							}
							return i;
						}),
						(e.loca = {}),
						(e.loca.parse = function(t, i, r, o) {
							var n = e._bin,
								a = [],
								s = o.head.indexToLocFormat,
								l = o.maxp.numGlyphs + 1;
							if (0 == s)
								for (var u = 0; u < l; u++)
									a.push(n.readUshort(t, i + (u << 1)) << 1);
							if (1 == s)
								for (var u = 0; u < l; u++) a.push(n.readUint(t, i + (u << 2)));
							return a;
						}),
						(e.maxp = {}),
						(e.maxp.parse = function(t, i, r) {
							var o = e._bin,
								n = {},
								a = o.readUint(t, i);
							return (
								(i += 4),
								(n.numGlyphs = o.readUshort(t, i)),
								(i += 2),
								65536 == a &&
								((n.maxPoints = o.readUshort(t, i)),
									(i += 2),
									(n.maxContours = o.readUshort(t, i)),
									(i += 2),
									(n.maxCompositePoints = o.readUshort(t, i)),
									(i += 2),
									(n.maxCompositeContours = o.readUshort(t, i)),
									(i += 2),
									(n.maxZones = o.readUshort(t, i)),
									(i += 2),
									(n.maxTwilightPoints = o.readUshort(t, i)),
									(i += 2),
									(n.maxStorage = o.readUshort(t, i)),
									(i += 2),
									(n.maxFunctionDefs = o.readUshort(t, i)),
									(i += 2),
									(n.maxInstructionDefs = o.readUshort(t, i)),
									(i += 2),
									(n.maxStackElements = o.readUshort(t, i)),
									(i += 2),
									(n.maxSizeOfInstructions = o.readUshort(t, i)),
									(i += 2),
									(n.maxComponentElements = o.readUshort(t, i)),
									(i += 2),
									(n.maxComponentDepth = o.readUshort(t, i)),
									(i += 2)),
								n
							);
						}),
						(e.name = {}),
						(e.name.parse = function(t, i, r) {
							var o = e._bin,
								n = {};
							o.readUshort(t, i);
							i += 2;
							var a = o.readUshort(t, i);
							i += 2;
							o.readUshort(t, i);
							i += 2;
							for (
								var s = [
										"copyright",
										"fontFamily",
										"fontSubfamily",
										"ID",
										"fullName",
										"version",
										"postScriptName",
										"trademark",
										"manufacturer",
										"designer",
										"description",
										"urlVendor",
										"urlDesigner",
										"licence",
										"licenceURL",
										"---",
										"typoFamilyName",
										"typoSubfamilyName",
										"compatibleFull",
										"sampleText",
										"postScriptCID",
										"wwsFamilyName",
										"wwsSubfamilyName",
										"lightPalette",
										"darkPalette",
									],
									l = i,
									u = 0; u < a; u++
							) {
								var d = o.readUshort(t, i);
								i += 2;
								var c = o.readUshort(t, i);
								i += 2;
								var h = o.readUshort(t, i);
								i += 2;
								var f = o.readUshort(t, i);
								i += 2;
								var p = o.readUshort(t, i);
								i += 2;
								var g = o.readUshort(t, i);
								i += 2;
								var m,
									v = s[f],
									b = l + 12 * a + g;
								if (0 == d) m = o.readUnicode(t, b, p / 2);
								else if (3 == d && 0 == c) m = o.readUnicode(t, b, p / 2);
								else if (0 == c) m = o.readASCII(t, b, p);
								else if (1 == c) m = o.readUnicode(t, b, p / 2);
								else if (3 == c) m = o.readUnicode(t, b, p / 2);
								else {
									if (1 != d)
										throw "unknown encoding " + c + ", platformID: " + d;
									(m = o.readASCII(t, b, p)),
									console.log(
										"reading unknown MAC encoding " + c + " as ASCII"
									);
								}
								var y = "p" + d + "," + h.toString(16);
								null == n[y] && (n[y] = {}), (n[y][v] = m), (n[y]._lang = h);
							}
							for (var A in n)
								if (null != n[A].postScriptName && 1033 == n[A]._lang)
									return n[A];
							for (var A in n)
								if (null != n[A].postScriptName && 0 == n[A]._lang) return n[A];
							for (var A in n)
								if (null != n[A].postScriptName && 3084 == n[A]._lang)
									return n[A];
							for (var A in n)
								if (null != n[A].postScriptName) return n[A];
							var w;
							for (var A in n) {
								w = A;
								break;
							}
							return (
								console.log(
									"returning name table with languageID " + n[w]._lang
								),
								n[w]
							);
						}),
						(e["OS/2"] = {}),
						(e["OS/2"].parse = function(t, i, r) {
							var o = e._bin,
								n = o.readUshort(t, i);
							i += 2;
							var a = {};
							if (0 == n) e["OS/2"].version0(t, i, a);
							else if (1 == n) e["OS/2"].version1(t, i, a);
							else if (2 == n || 3 == n || 4 == n) e["OS/2"].version2(t, i, a);
							else {
								if (5 != n) throw "unknown OS/2 table version: " + n;
								e["OS/2"].version5(t, i, a);
							}
							return a;
						}),
						(e["OS/2"].version0 = function(t, i, r) {
							var o = e._bin;
							return (
								(r.xAvgCharWidth = o.readShort(t, i)),
								(i += 2),
								(r.usWeightClass = o.readUshort(t, i)),
								(i += 2),
								(r.usWidthClass = o.readUshort(t, i)),
								(i += 2),
								(r.fsType = o.readUshort(t, i)),
								(i += 2),
								(r.ySubscriptXSize = o.readShort(t, i)),
								(i += 2),
								(r.ySubscriptYSize = o.readShort(t, i)),
								(i += 2),
								(r.ySubscriptXOffset = o.readShort(t, i)),
								(i += 2),
								(r.ySubscriptYOffset = o.readShort(t, i)),
								(i += 2),
								(r.ySuperscriptXSize = o.readShort(t, i)),
								(i += 2),
								(r.ySuperscriptYSize = o.readShort(t, i)),
								(i += 2),
								(r.ySuperscriptXOffset = o.readShort(t, i)),
								(i += 2),
								(r.ySuperscriptYOffset = o.readShort(t, i)),
								(i += 2),
								(r.yStrikeoutSize = o.readShort(t, i)),
								(i += 2),
								(r.yStrikeoutPosition = o.readShort(t, i)),
								(i += 2),
								(r.sFamilyClass = o.readShort(t, i)),
								(i += 2),
								(r.panose = o.readBytes(t, i, 10)),
								(i += 10),
								(r.ulUnicodeRange1 = o.readUint(t, i)),
								(i += 4),
								(r.ulUnicodeRange2 = o.readUint(t, i)),
								(i += 4),
								(r.ulUnicodeRange3 = o.readUint(t, i)),
								(i += 4),
								(r.ulUnicodeRange4 = o.readUint(t, i)),
								(i += 4),
								(r.achVendID = [
									o.readInt8(t, i),
									o.readInt8(t, i + 1),
									o.readInt8(t, i + 2),
									o.readInt8(t, i + 3),
								]),
								(i += 4),
								(r.fsSelection = o.readUshort(t, i)),
								(i += 2),
								(r.usFirstCharIndex = o.readUshort(t, i)),
								(i += 2),
								(r.usLastCharIndex = o.readUshort(t, i)),
								(i += 2),
								(r.sTypoAscender = o.readShort(t, i)),
								(i += 2),
								(r.sTypoDescender = o.readShort(t, i)),
								(i += 2),
								(r.sTypoLineGap = o.readShort(t, i)),
								(i += 2),
								(r.usWinAscent = o.readUshort(t, i)),
								(i += 2),
								(r.usWinDescent = o.readUshort(t, i)),
								(i += 2)
							);
						}),
						(e["OS/2"].version1 = function(t, i, r) {
							var o = e._bin;
							return (
								(i = e["OS/2"].version0(t, i, r)),
								(r.ulCodePageRange1 = o.readUint(t, i)),
								(i += 4),
								(r.ulCodePageRange2 = o.readUint(t, i)),
								(i += 4)
							);
						}),
						(e["OS/2"].version2 = function(t, i, r) {
							var o = e._bin;
							return (
								(i = e["OS/2"].version1(t, i, r)),
								(r.sxHeight = o.readShort(t, i)),
								(i += 2),
								(r.sCapHeight = o.readShort(t, i)),
								(i += 2),
								(r.usDefault = o.readUshort(t, i)),
								(i += 2),
								(r.usBreak = o.readUshort(t, i)),
								(i += 2),
								(r.usMaxContext = o.readUshort(t, i)),
								(i += 2)
							);
						}),
						(e["OS/2"].version5 = function(t, i, r) {
							var o = e._bin;
							return (
								(i = e["OS/2"].version2(t, i, r)),
								(r.usLowerOpticalPointSize = o.readUshort(t, i)),
								(i += 2),
								(r.usUpperOpticalPointSize = o.readUshort(t, i)),
								(i += 2)
							);
						}),
						(e.post = {}),
						(e.post.parse = function(t, i, r) {
							var o = e._bin,
								n = {};
							return (
								(n.version = o.readFixed(t, i)),
								(i += 4),
								(n.italicAngle = o.readFixed(t, i)),
								(i += 4),
								(n.underlinePosition = o.readShort(t, i)),
								(i += 2),
								(n.underlineThickness = o.readShort(t, i)),
								(i += 2),
								n
							);
						}),
						(e.SVG = {}),
						(e.SVG.parse = function(t, i, r) {
							var o = e._bin,
								n = {
									entries: []
								},
								a = i;
							o.readUshort(t, i);
							i += 2;
							var s = o.readUint(t, i);
							i += 4;
							o.readUint(t, i);
							(i += 4), (i = s + a);
							var l = o.readUshort(t, i);
							i += 2;
							for (var u = 0; u < l; u++) {
								var d = o.readUshort(t, i);
								i += 2;
								var c = o.readUshort(t, i);
								i += 2;
								var h = o.readUint(t, i);
								i += 4;
								var f = o.readUint(t, i);
								i += 4;
								for (
									var p = new Uint8Array(t.buffer, a + h + s, f),
										g = o.readUTF8(p, 0, p.length),
										m = d; m <= c; m++
								)
									n.entries[m] = g;
							}
							return n;
						}),
						(e.SVG.toPath = function(t) {
							var i = {
								cmds: [],
								crds: []
							};
							if (null == t) return i;
							for (
								var r = new DOMParser(),
									o = r.parseFromString(t, "image/svg+xml"),
									n = o.firstChild;
								"svg" != n.tagName;

							)
								n = n.nextSibling;
							var a = n.getAttribute("viewBox");
							(a = a ? a.trim().split(" ").map(parseFloat) : [0, 0, 1e3, 1e3]),
							e.SVG._toPath(n.children, i);
							for (var s = 0; s < i.crds.length; s += 2) {
								var l = i.crds[s],
									u = i.crds[s + 1];
								(l -= a[0]),
								(u -= a[1]),
								(u = -u),
								(i.crds[s] = l),
								(i.crds[s + 1] = u);
							}
							return i;
						}),
						(e.SVG._toPath = function(t, i, r) {
							for (var o = 0; o < t.length; o++) {
								var n = t[o],
									a = n.tagName,
									s = n.getAttribute("fill");
								if ((null == s && (s = r), "g" == a))
									e.SVG._toPath(n.children, i, s);
								else if ("path" == a) {
									i.cmds.push(s || "#000000");
									var l = n.getAttribute("d"),
										u = e.SVG._tokens(l);
									e.SVG._toksToPath(u, i), i.cmds.push("X");
								} else "defs" == a || console.log(a, n);
							}
						}),
						(e.SVG._tokens = function(t) {
							for (var e = [], i = 0, r = !1, o = ""; i < t.length;) {
								var n = t.charCodeAt(i),
									a = t.charAt(i);
								i++;
								var s = (48 <= n && n <= 57) || "." == a || "-" == a;
								r
									?
									"-" == a ?
									(e.push(parseFloat(o)), (o = a)) :
									s ?
									(o += a) :
									(e.push(parseFloat(o)),
										"," != a && " " != a && e.push(a),
										(r = !1)) :
									s ?
									((o = a), (r = !0)) :
									"," != a && " " != a && e.push(a);
							}
							return r && e.push(parseFloat(o)), e;
						}),
						(e.SVG._toksToPath = function(t, i) {
							for (
								var r = 0,
									o = 0,
									n = 0,
									a = 0,
									s = 0,
									l = {
										M: 2,
										L: 2,
										H: 1,
										V: 1,
										S: 4,
										C: 6
									},
									u = i.cmds,
									d = i.crds; r < t.length;

							) {
								var c = t[r];
								if ((r++, "z" == c)) u.push("Z"), (o = a), (n = s);
								else
									for (
										var h = c.toUpperCase(),
											f = l[h],
											p = e.SVG._reps(t, r, f),
											g = 0; g < p; g++
									) {
										var m = 0,
											v = 0;
										if ((c != h && ((m = o), (v = n)), "M" == h))
											(o = m + t[r++]),
											(n = v + t[r++]),
											u.push("M"),
											d.push(o, n),
											(a = o),
											(s = n);
										else if ("L" == h)
											(o = m + t[r++]),
											(n = v + t[r++]),
											u.push("L"),
											d.push(o, n);
										else if ("H" == h)
											(o = m + t[r++]), u.push("L"), d.push(o, n);
										else if ("V" == h)
											(n = v + t[r++]), u.push("L"), d.push(o, n);
										else if ("C" == h) {
											var b = m + t[r++],
												y = v + t[r++],
												A = m + t[r++],
												w = v + t[r++],
												k = m + t[r++],
												C = v + t[r++];
											u.push("C"), d.push(b, y, A, w, k, C), (o = k), (n = C);
										} else if ("S" == h) {
											var x = Math.max(d.length - 4, 0),
												b = o + o - d[x],
												y = n + n - d[x + 1],
												A = m + t[r++],
												w = v + t[r++],
												k = m + t[r++],
												C = v + t[r++];
											u.push("C"), d.push(b, y, A, w, k, C), (o = k), (n = C);
										} else console.log("Unknown SVG command " + c);
									}
							}
						}),
						(e.SVG._reps = function(t, e, i) {
							for (var r = e; r < t.length && "string" != typeof t[r];) r += i;
							return (r - e) / i;
						}),
						null == e && (e = {}),
						null == e.U && (e.U = {}),
						(e.U.codeToGlyph = function(t, e) {
							var i = t.cmap,
								r = -1;
							if (
								(null != i.p0e4 ?
									(r = i.p0e4) :
									null != i.p3e1 ?
									(r = i.p3e1) :
									null != i.p1e0 ?
									(r = i.p1e0) :
									null != i.p0e3 && (r = i.p0e3),
									-1 == r)
							)
								throw "no familiar platform and encoding!";
							var o = i.tables[r];
							if (0 == o.format) return e >= o.map.length ? 0 : o.map[e];
							if (4 == o.format) {
								for (var n = -1, a = 0; a < o.endCount.length; a++)
									if (e <= o.endCount[a]) {
										n = a;
										break;
									}
								if (-1 == n) return 0;
								if (o.startCount[n] > e) return 0;
								return (
									65535 &
									(0 != o.idRangeOffset[n] ?
										o.glyphIdArray[
											e -
											o.startCount[n] +
											(o.idRangeOffset[n] >> 1) -
											(o.idRangeOffset.length - n)
										] :
										e + o.idDelta[n])
								);
							}
							if (12 == o.format) {
								if (e > o.groups[o.groups.length - 1][1]) return 0;
								for (var a = 0; a < o.groups.length; a++) {
									var s = o.groups[a];
									if (s[0] <= e && e <= s[1]) return s[2] + (e - s[0]);
								}
								return 0;
							}
							throw "unknown cmap table format " + o.format;
						}),
						(e.U.glyphToPath = function(t, i) {
							var r = {
								cmds: [],
								crds: []
							};
							if (t.SVG && t.SVG.entries[i]) {
								var o = t.SVG.entries[i];
								return null == o ?
									r :
									("string" == typeof o &&
										((o = e.SVG.toPath(o)), (t.SVG.entries[i] = o)),
										o);
							}
							if (t.CFF) {
								var n = {
										x: 0,
										y: 0,
										stack: [],
										nStems: 0,
										haveWidth: !1,
										width: t.CFF.Private ? t.CFF.Private.defaultWidthX : 0,
										open: !1,
									},
									a = t.CFF,
									s = t.CFF.Private;
								if (a.ROS) {
									for (var l = 0; a.FDSelect[l + 2] <= i;) l += 2;
									s = a.FDArray[a.FDSelect[l + 1]].Private;
								}
								e.U._drawCFF(t.CFF.CharStrings[i], n, a, s, r);
							} else t.glyf && e.U._drawGlyf(i, t, r);
							return r;
						}),
						(e.U._drawGlyf = function(t, i, r) {
							var o = i.glyf[t];
							null == o && (o = i.glyf[t] = e.glyf._parseGlyf(i, t)),
								null != o &&
								(o.noc > -1 ?
									e.U._simpleGlyph(o, r) :
									e.U._compoGlyph(o, i, r));
						}),
						(e.U._simpleGlyph = function(t, i) {
							for (var r = 0; r < t.noc; r++) {
								for (
									var o = 0 == r ? 0 : t.endPts[r - 1] + 1,
										n = t.endPts[r],
										a = o; a <= n; a++
								) {
									var s = a == o ? n : a - 1,
										l = a == n ? o : a + 1,
										u = 1 & t.flags[a],
										d = 1 & t.flags[s],
										c = 1 & t.flags[l],
										h = t.xs[a],
										f = t.ys[a];
									if (a == o)
										if (u) {
											if (!d) {
												e.U.P.moveTo(i, h, f);
												continue;
											}
											e.U.P.moveTo(i, t.xs[s], t.ys[s]);
										} else
											d ?
											e.U.P.moveTo(i, t.xs[s], t.ys[s]) :
											e.U.P.moveTo(i, (t.xs[s] + h) / 2, (t.ys[s] + f) / 2);
									u
										?
										d && e.U.P.lineTo(i, h, f) :
										c ?
										e.U.P.qcurveTo(i, h, f, t.xs[l], t.ys[l]) :
										e.U.P.qcurveTo(
											i,
											h,
											f,
											(h + t.xs[l]) / 2,
											(f + t.ys[l]) / 2
										);
								}
								e.U.P.closePath(i);
							}
						}),
						(e.U._compoGlyph = function(t, i, r) {
							for (var o = 0; o < t.parts.length; o++) {
								var n = {
										cmds: [],
										crds: []
									},
									a = t.parts[o];
								e.U._drawGlyf(a.glyphIndex, i, n);
								for (var s = a.m, l = 0; l < n.crds.length; l += 2) {
									var u = n.crds[l],
										d = n.crds[l + 1];
									r.crds.push(u * s.a + d * s.b + s.tx),
										r.crds.push(u * s.c + d * s.d + s.ty);
								}
								for (var l = 0; l < n.cmds.length; l++) r.cmds.push(n.cmds[l]);
							}
						}),
						(e.U._getGlyphClass = function(t, i) {
							var r = e._lctf.getInterval(i, t);
							return -1 == r ? 0 : i[r + 2];
						}),
						(e.U.getPairAdjustment = function(t, i, r) {
							if (t.GPOS)
								for (
									var o = t.GPOS,
										n = o.lookupList,
										a = o.featureList,
										s = [],
										l = 0; l < a.length; l++
								) {
									var u = a[l];
									if ("kern" == u.tag)
										for (var d = 0; d < u.tab.length; d++)
											if (!s[u.tab[d]]) {
												s[u.tab[d]] = !0;
												for (var c = n[u.tab[d]], h = 0; h < c.tabs.length; h++)
													if (null != c.tabs[l]) {
														var f,
															p = c.tabs[h];
														if (
															!p.coverage ||
															-1 != (f = e._lctf.coverageIndex(p.coverage, i))
														)
															if (1 == c.ltype);
															else if (2 == c.ltype) {
															var g;
															if (1 == p.fmt)
																for (
																	var m = p.pairsets[f], l = 0; l < m.length; l++
																)
																	m[l].gid2 == r && (g = m[l]);
															else if (2 == p.fmt) {
																var v = e.U._getGlyphClass(i, p.classDef1),
																	b = e.U._getGlyphClass(r, p.classDef2);
																g = p.matrix[v][b];
															}
															if (g && g.val2) return g.val2[2];
														}
													}
											}
								}
							if (t.kern) {
								var y = t.kern.glyph1.indexOf(i);
								if (-1 != y) {
									var A = t.kern.rval[y].glyph2.indexOf(r);
									if (-1 != A) return t.kern.rval[y].vals[A];
								}
							}
							return 0;
						}),
						(e.U.stringToGlyphs = function(t, i) {
							for (var r = [], o = 0; o < i.length; o++) {
								var n = i.codePointAt(o);
								n > 65535 && o++, r.push(e.U.codeToGlyph(t, n));
							}
							for (var o = 0; o < i.length; o++) {
								var n = i.codePointAt(o);
								if (2367 == n) {
									var a = r[o - 1];
									(r[o - 1] = r[o]), (r[o] = a);
								}
								n > 65535 && o++;
							}
							var s = t.GSUB;
							if (null == s) return r;
							for (
								var l = s.lookupList,
									u = s.featureList,
									d = [
										"rlig",
										"liga",
										"mset",
										"isol",
										"init",
										"fina",
										"medi",
										"half",
										"pres",
										"blws",
									],
									c = [],
									h = 0; h < u.length; h++
							) {
								var f = u[h];
								if (-1 != d.indexOf(f.tag))
									for (var p = 0; p < f.tab.length; p++)
										if (!c[f.tab[p]]) {
											c[f.tab[p]] = !0;
											for (var g = l[f.tab[p]], m = 0; m < r.length; m++) {
												var v = e.U._getWPfeature(i, m);
												(-1 != "isol,init,fina,medi".indexOf(f.tag) &&
													f.tag != v) ||
												e.U._applySubs(r, m, g, l);
											}
										}
							}
							return r;
						}),
						(e.U._getWPfeature = function(t, e) {
							var i = '\n\t" ,.:;!?()  ،',
								r =
								"آأؤإاةدذرزوٱٲٳٵٶٷڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙۀۃۄۅۆۇۈۉۊۋۍۏےۓەۮۯܐܕܖܗܘܙܞܨܪܬܯݍݙݚݛݫݬݱݳݴݸݹࡀࡆࡇࡉࡔࡧࡩࡪࢪࢫࢬࢮࢱࢲࢹૅેૉ૊૎૏ૐ૑૒૝ૡ૤૯஁ஃ஄அஉ஌எஏ஑னப஫஬",
								o = "ꡲ્૗",
								n = 0 == e || -1 != i.indexOf(t[e - 1]),
								a = e == t.length - 1 || -1 != i.indexOf(t[e + 1]);
							n || -1 == r.indexOf(t[e - 1]) || (n = !0),
								a || -1 == r.indexOf(t[e]) || (a = !0),
								a || -1 == o.indexOf(t[e + 1]) || (a = !0),
								n || -1 == o.indexOf(t[e]) || (n = !0);
							return n ? (a ? "isol" : "init") : a ? "fina" : "medi";
						}),
						(e.U._applySubs = function(t, i, r, o) {
							for (var n = t.length - i - 1, a = 0; a < r.tabs.length; a++)
								if (null != r.tabs[a]) {
									var s,
										l = r.tabs[a];
									if (
										!l.coverage ||
										-1 != (s = e._lctf.coverageIndex(l.coverage, t[i]))
									)
										if (1 == r.ltype) {
											t[i];
											1 == l.fmt ? (t[i] = t[i] + l.delta) : (t[i] = l.newg[s]);
										} else if (4 == r.ltype)
										for (var u = l.vals[s], d = 0; d < u.length; d++) {
											var c = u[d],
												h = c.chain.length;
											if (!(h > n)) {
												for (var f = !0, p = 0, g = 0; g < h; g++) {
													for (; - 1 == t[i + p + (1 + g)];) p++;
													c.chain[g] != t[i + p + (1 + g)] && (f = !1);
												}
												if (f) {
													t[i] = c.nglyph;
													for (var g = 0; g < h + p; g++) t[i + g + 1] = -1;
													break;
												}
											}
										}
									else if (5 == r.ltype && 2 == l.fmt)
										for (
											var m = e._lctf.getInterval(l.cDef, t[i]),
												v = l.cDef[m + 2],
												b = l.scset[v],
												y = 0; y < b.length; y++
										) {
											var A = b[y],
												w = A.input;
											if (!(w.length > n)) {
												for (var f = !0, g = 0; g < w.length; g++) {
													var k = e._lctf.getInterval(l.cDef, t[i + 1 + g]);
													if (-1 == m && l.cDef[k + 2] != w[g]) {
														f = !1;
														break;
													}
												}
												if (f)
													for (
														var C = A.substLookupRecords, d = 0; d < C.length; d += 2
													) {
														C[d], C[d + 1];
													}
											}
										}
									else if (6 == r.ltype && 3 == l.fmt) {
										if (!e.U._glsCovered(t, l.backCvg, i - l.backCvg.length))
											continue;
										if (!e.U._glsCovered(t, l.inptCvg, i)) continue;
										if (!e.U._glsCovered(t, l.ahedCvg, i + l.inptCvg.length))
											continue;
										for (var x = l.lookupRec, y = 0; y < x.length; y += 2) {
											var m = x[y],
												S = o[x[y + 1]];
											e.U._applySubs(t, i + m, S, o);
										}
									}
								}
						}),
						(e.U._glsCovered = function(t, i, r) {
							for (var o = 0; o < i.length; o++) {
								if (-1 == e._lctf.coverageIndex(i[o], t[r + o])) return !1;
							}
							return !0;
						}),
						(e.U.glyphsToPath = function(t, i, r) {
							for (
								var o = {
									cmds: [],
									crds: []
								}, n = 0, a = 0; a < i.length; a++
							) {
								var s = i[a];
								if (-1 != s) {
									for (
										var l = a < i.length - 1 && -1 != i[a + 1] ? i[a + 1] : 0,
											u = e.U.glyphToPath(t, s),
											d = 0; d < u.crds.length; d += 2
									)
										o.crds.push(u.crds[d] + n), o.crds.push(u.crds[d + 1]);
									r && o.cmds.push(r);
									for (var d = 0; d < u.cmds.length; d++)
										o.cmds.push(u.cmds[d]);
									r && o.cmds.push("X"),
										(n += t.hmtx.aWidth[s]),
										a < i.length - 1 && (n += e.U.getPairAdjustment(t, s, l));
								}
							}
							return o;
						}),
						(e.U.pathToSVG = function(t, e) {
							null == e && (e = 5);
							for (
								var i = [], r = 0, o = {
									M: 2,
									L: 2,
									Q: 4,
									C: 6
								}, n = 0; n < t.cmds.length; n++
							) {
								var a = t.cmds[n],
									s = r + (o[a] ? o[a] : 0);
								for (i.push(a); r < s;) {
									var l = t.crds[r++];
									i.push(parseFloat(l.toFixed(e)) + (r == s ? "" : " "));
								}
							}
							return i.join("");
						}),
						(e.U.pathToContext = function(t, e) {
							for (var i = 0, r = t.crds, o = 0; o < t.cmds.length; o++) {
								var n = t.cmds[o];
								"M" == n
									?
									(e.moveTo(r[i], r[i + 1]), (i += 2)) :
									"L" == n ?
									(e.lineTo(r[i], r[i + 1]), (i += 2)) :
									"C" == n ?
									(e.bezierCurveTo(
											r[i],
											r[i + 1],
											r[i + 2],
											r[i + 3],
											r[i + 4],
											r[i + 5]
										),
										(i += 6)) :
									"Q" == n ?
									(e.quadraticCurveTo(r[i], r[i + 1], r[i + 2], r[i + 3]),
										(i += 4)) :
									"#" == n.charAt(0) ?
									(e.beginPath(), (e.fillStyle = n)) :
									"Z" == n ?
									e.closePath() :
									"X" == n && e.fill();
							}
						}),
						(e.U.P = {}),
						(e.U.P.moveTo = function(t, e, i) {
							t.cmds.push("M"), t.crds.push(e, i);
						}),
						(e.U.P.lineTo = function(t, e, i) {
							t.cmds.push("L"), t.crds.push(e, i);
						}),
						(e.U.P.curveTo = function(t, e, i, r, o, n, a) {
							t.cmds.push("C"), t.crds.push(e, i, r, o, n, a);
						}),
						(e.U.P.qcurveTo = function(t, e, i, r, o) {
							t.cmds.push("Q"), t.crds.push(e, i, r, o);
						}),
						(e.U.P.closePath = function(t) {
							t.cmds.push("Z");
						}),
						(e.U._drawCFF = function(t, i, r, o, n) {
							for (
								var a = i.stack,
									s = i.nStems,
									l = i.haveWidth,
									u = i.width,
									d = i.open,
									c = 0,
									h = i.x,
									f = i.y,
									p = 0,
									g = 0,
									m = 0,
									v = 0,
									b = 0,
									y = 0,
									A = 0,
									w = 0,
									k = 0,
									C = 0,
									x = {
										val: 0,
										size: 0
									}; c < t.length;

							) {
								e.CFF.getCharString(t, c, x);
								var S = x.val;
								if (((c += x.size), "o1" == S || "o18" == S)) {
									var _;
									(_ = a.length % 2 != 0),
									_ && !l && (u = a.shift() + o.nominalWidthX),
										(s += a.length >> 1),
										(a.length = 0),
										(l = !0);
								} else if ("o3" == S || "o23" == S) {
									var _;
									(_ = a.length % 2 != 0),
									_ && !l && (u = a.shift() + o.nominalWidthX),
										(s += a.length >> 1),
										(a.length = 0),
										(l = !0);
								} else if ("o4" == S)
									a.length > 1 &&
									!l &&
									((u = a.shift() + o.nominalWidthX), (l = !0)),
									d && e.U.P.closePath(n),
									(f += a.pop()),
									e.U.P.moveTo(n, h, f),
									(d = !0);
								else if ("o5" == S)
									for (; a.length > 0;)
										(h += a.shift()), (f += a.shift()), e.U.P.lineTo(n, h, f);
								else if ("o6" == S || "o7" == S)
									for (var U = a.length, E = "o6" == S, T = 0; T < U; T++) {
										var F = a.shift();
										E ? (h += F) : (f += F), (E = !E), e.U.P.lineTo(n, h, f);
									}
								else if ("o8" == S || "o24" == S) {
									for (var U = a.length, I = 0; I + 6 <= U;)
										(p = h + a.shift()),
										(g = f + a.shift()),
										(m = p + a.shift()),
										(v = g + a.shift()),
										(h = m + a.shift()),
										(f = v + a.shift()),
										e.U.P.curveTo(n, p, g, m, v, h, f),
										(I += 6);
									"o24" == S &&
										((h += a.shift()), (f += a.shift()), e.U.P.lineTo(n, h, f));
								} else {
									if ("o11" == S) break;
									if (
										"o1234" == S ||
										"o1235" == S ||
										"o1236" == S ||
										"o1237" == S
									)
										"o1234" == S &&
										((p = h + a.shift()),
											(g = f),
											(m = p + a.shift()),
											(v = g + a.shift()),
											(k = m + a.shift()),
											(C = v),
											(b = k + a.shift()),
											(y = v),
											(A = b + a.shift()),
											(w = f),
											(h = A + a.shift()),
											e.U.P.curveTo(n, p, g, m, v, k, C),
											e.U.P.curveTo(n, b, y, A, w, h, f)),
										"o1235" == S &&
										((p = h + a.shift()),
											(g = f + a.shift()),
											(m = p + a.shift()),
											(v = g + a.shift()),
											(k = m + a.shift()),
											(C = v + a.shift()),
											(b = k + a.shift()),
											(y = C + a.shift()),
											(A = b + a.shift()),
											(w = y + a.shift()),
											(h = A + a.shift()),
											(f = w + a.shift()),
											a.shift(),
											e.U.P.curveTo(n, p, g, m, v, k, C),
											e.U.P.curveTo(n, b, y, A, w, h, f)),
										"o1236" == S &&
										((p = h + a.shift()),
											(g = f + a.shift()),
											(m = p + a.shift()),
											(v = g + a.shift()),
											(k = m + a.shift()),
											(C = v),
											(b = k + a.shift()),
											(y = v),
											(A = b + a.shift()),
											(w = y + a.shift()),
											(h = A + a.shift()),
											e.U.P.curveTo(n, p, g, m, v, k, C),
											e.U.P.curveTo(n, b, y, A, w, h, f)),
										"o1237" == S &&
										((p = h + a.shift()),
											(g = f + a.shift()),
											(m = p + a.shift()),
											(v = g + a.shift()),
											(k = m + a.shift()),
											(C = v + a.shift()),
											(b = k + a.shift()),
											(y = C + a.shift()),
											(A = b + a.shift()),
											(w = y + a.shift()),
											Math.abs(A - h) > Math.abs(w - f) ?
											(h = A + a.shift()) :
											(f = w + a.shift()),
											e.U.P.curveTo(n, p, g, m, v, k, C),
											e.U.P.curveTo(n, b, y, A, w, h, f));
									else if ("o14" == S) {
										if (
											(a.length > 0 &&
												!l &&
												((u = a.shift() + r.nominalWidthX), (l = !0)),
												4 == a.length)
										) {
											var O = a.shift(),
												D = a.shift(),
												R = a.shift(),
												M = a.shift(),
												P = e.CFF.glyphBySE(r, R),
												L = e.CFF.glyphBySE(r, M);
											e.U._drawCFF(r.CharStrings[P], i, r, o, n),
												(i.x = O),
												(i.y = D),
												e.U._drawCFF(r.CharStrings[L], i, r, o, n);
										}
										d && (e.U.P.closePath(n), (d = !1));
									} else if ("o19" == S || "o20" == S) {
										var _;
										(_ = a.length % 2 != 0),
										_ && !l && (u = a.shift() + o.nominalWidthX),
											(s += a.length >> 1),
											(a.length = 0),
											(l = !0),
											(c += (s + 7) >> 3);
									} else if ("o21" == S)
										a.length > 2 &&
										!l &&
										((u = a.shift() + o.nominalWidthX), (l = !0)),
										(f += a.pop()),
										(h += a.pop()),
										d && e.U.P.closePath(n),
										e.U.P.moveTo(n, h, f),
										(d = !0);
									else if ("o22" == S)
										a.length > 1 &&
										!l &&
										((u = a.shift() + o.nominalWidthX), (l = !0)),
										(h += a.pop()),
										d && e.U.P.closePath(n),
										e.U.P.moveTo(n, h, f),
										(d = !0);
									else if ("o25" == S) {
										for (; a.length > 6;)
											(h += a.shift()), (f += a.shift()), e.U.P.lineTo(n, h, f);
										(p = h + a.shift()),
										(g = f + a.shift()),
										(m = p + a.shift()),
										(v = g + a.shift()),
										(h = m + a.shift()),
										(f = v + a.shift()),
										e.U.P.curveTo(n, p, g, m, v, h, f);
									} else if ("o26" == S)
										for (a.length % 2 && (h += a.shift()); a.length > 0;)
											(p = h),
											(g = f + a.shift()),
											(m = p + a.shift()),
											(v = g + a.shift()),
											(h = m),
											(f = v + a.shift()),
											e.U.P.curveTo(n, p, g, m, v, h, f);
									else if ("o27" == S)
										for (a.length % 2 && (f += a.shift()); a.length > 0;)
											(p = h + a.shift()),
											(g = f),
											(m = p + a.shift()),
											(v = g + a.shift()),
											(h = m + a.shift()),
											(f = v),
											e.U.P.curveTo(n, p, g, m, v, h, f);
									else if ("o10" == S || "o29" == S) {
										var z = "o10" == S ? o : r;
										if (0 == a.length) console.log("error: empty stack");
										else {
											var B = a.pop(),
												G = z.Subrs[B + z.Bias];
											(i.x = h),
											(i.y = f),
											(i.nStems = s),
											(i.haveWidth = l),
											(i.width = u),
											(i.open = d),
											e.U._drawCFF(G, i, r, o, n),
												(h = i.x),
												(f = i.y),
												(s = i.nStems),
												(l = i.haveWidth),
												(u = i.width),
												(d = i.open);
										}
									} else if ("o30" == S || "o31" == S) {
										var U,
											W = a.length,
											I = 0,
											j = "o31" == S;
										for (U = -3 & W, I += W - U; I < U;)
											j ?
											((p = h + a.shift()),
												(g = f),
												(m = p + a.shift()),
												(v = g + a.shift()),
												(f = v + a.shift()),
												U - I == 5 ? ((h = m + a.shift()), I++) : (h = m),
												(j = !1)) :
											((p = h),
												(g = f + a.shift()),
												(m = p + a.shift()),
												(v = g + a.shift()),
												(h = m + a.shift()),
												U - I == 5 ? ((f = v + a.shift()), I++) : (f = v),
												(j = !0)),
											e.U.P.curveTo(n, p, g, m, v, h, f),
											(I += 4);
									} else {
										if ("o" == (S + "").charAt(0))
											throw (console.log("Unknown operation: " + S, t), S);
										a.push(S);
									}
								}
							}
							(i.x = h),
							(i.y = f),
							(i.nStems = s),
							(i.haveWidth = l),
							(i.width = u),
							(i.open = d);
						}),
						e
					);
				}

				function T() {
					function t(t, e) {
						function i() {
							var t = a.getUint16(s);
							return (s += 2), t;
						}

						function r() {
							var t = a.getUint32(s);
							return (s += 4), t;
						}

						function o(t) {
							v.setUint16(b, t), (b += 2);
						}

						function n(t) {
							v.setUint32(b, t), (b += 4);
						}
						for (
							var a = new DataView(t),
								s = 0,
								l = {
									signature: r(),
									flavor: r(),
									length: r(),
									numTables: i(),
									reserved: i(),
									totalSfntSize: r(),
									majorVersion: i(),
									minorVersion: i(),
									metaOffset: r(),
									metaLength: r(),
									metaOrigLength: r(),
									privOffset: r(),
									privLength: r(),
								},
								u = 0; Math.pow(2, u) <= l.numTables;

						)
							u++;
						u--;
						for (
							var d = 16 * Math.pow(2, u),
								c = 16 * l.numTables - d,
								h = 12,
								f = [],
								p = 0; p < l.numTables; p++
						)
							f.push({
								tag: r(),
								offset: r(),
								compLength: r(),
								origLength: r(),
								origChecksum: r(),
							}),
							(h += 16);
						var g = new Uint8Array(
								12 +
								16 * f.length +
								f.reduce(function(t, e) {
									return t + e.origLength + 4;
								}, 0)
							),
							m = g.buffer,
							v = new DataView(m),
							b = 0;
						n(l.flavor),
							o(l.numTables),
							o(d),
							o(u),
							o(c),
							f.forEach(function(t) {
								n(t.tag),
									n(t.origChecksum),
									n(h),
									n(t.origLength),
									(t.outOffset = h),
									(h += t.origLength) % 4 != 0 && (h += 4 - (h % 4));
							});
						var y;
						return (
							f.forEach(function(i) {
								var r = t.slice(i.offset, i.offset + i.compLength);
								if (i.compLength != i.origLength) {
									var o = new Uint8Array(i.origLength);
									e(new Uint8Array(r, 2), o);
								} else o = new Uint8Array(r);
								g.set(o, i.outOffset), (h = i.outOffset + i.origLength);
								var n = 0;
								h % 4 != 0 && (n = 4 - (h % 4)),
									g.set(new Uint8Array(n).buffer, i.outOffset + i.origLength),
									(y = h + n);
							}),
							m.slice(0, y)
						);
					}
					var e = (function() {
						function t() {
							(this.table = new Uint16Array(16)),
							(this.trans = new Uint16Array(288));
						}

						function e(e, i) {
							(this.source = e),
							(this.sourceIndex = 0),
							(this.tag = 0),
							(this.bitcount = 0),
							(this.dest = i),
							(this.destLen = 0),
							(this.ltree = new t()),
							(this.dtree = new t());
						}

						function i(t, e, i, r) {
							var o, n;
							for (o = 0; o < i; ++o) t[o] = 0;
							for (o = 0; o < 30 - i; ++o) t[o + i] = (o / i) | 0;
							for (n = r, o = 0; o < 30; ++o)(e[o] = n), (n += 1 << t[o]);
						}

						function r(t, e) {
							var i;
							for (i = 0; i < 7; ++i) t.table[i] = 0;
							for (
								t.table[7] = 24, t.table[8] = 152, t.table[9] = 112, i = 0; i < 24;
								++i
							)
								t.trans[i] = 256 + i;
							for (i = 0; i < 144; ++i) t.trans[24 + i] = i;
							for (i = 0; i < 8; ++i) t.trans[168 + i] = 280 + i;
							for (i = 0; i < 112; ++i) t.trans[176 + i] = 144 + i;
							for (i = 0; i < 5; ++i) e.table[i] = 0;
							for (e.table[5] = 32, i = 0; i < 32; ++i) e.trans[i] = i;
						}

						function o(t, e, i, r) {
							var o, n;
							for (o = 0; o < 16; ++o) t.table[o] = 0;
							for (o = 0; o < r; ++o) t.table[e[i + o]]++;
							for (t.table[0] = 0, n = 0, o = 0; o < 16; ++o)
								(x[o] = n), (n += t.table[o]);
							for (o = 0; o < r; ++o) e[i + o] && (t.trans[x[e[i + o]]++] = o);
						}

						function n(t) {
							t.bitcount-- ||
								((t.tag = t.source[t.sourceIndex++]), (t.bitcount = 7));
							var e = 1 & t.tag;
							return (t.tag >>>= 1), e;
						}

						function a(t, e, i) {
							if (!e) return i;
							for (; t.bitcount < 24;)
								(t.tag |= t.source[t.sourceIndex++] << t.bitcount),
								(t.bitcount += 8);
							var r = t.tag & (65535 >>> (16 - e));
							return (t.tag >>>= e), (t.bitcount -= e), r + i;
						}

						function s(t, e) {
							for (; t.bitcount < 24;)
								(t.tag |= t.source[t.sourceIndex++] << t.bitcount),
								(t.bitcount += 8);
							var i = 0,
								r = 0,
								o = 0,
								n = t.tag;
							do {
								(r = 2 * r + (1 & n)),
								(n >>>= 1),
								++o,
								(i += e.table[o]),
								(r -= e.table[o]);
							} while (r >= 0);
							return (t.tag = n), (t.bitcount -= o), e.trans[i + r];
						}

						function l(t, e, i) {
							var r, n, l, u, d, c;
							for (
								r = a(t, 5, 257), n = a(t, 5, 1), l = a(t, 4, 4), u = 0; u < 19;
								++u
							)
								C[u] = 0;
							for (u = 0; u < l; ++u) {
								var h = a(t, 3, 0);
								C[w[u]] = h;
							}
							for (o(k, C, 0, 19), d = 0; d < r + n;) {
								var f = s(t, k);
								switch (f) {
									case 16:
										var p = C[d - 1];
										for (c = a(t, 2, 3); c; --c) C[d++] = p;
										break;
									case 17:
										for (c = a(t, 3, 3); c; --c) C[d++] = 0;
										break;
									case 18:
										for (c = a(t, 7, 11); c; --c) C[d++] = 0;
										break;
									default:
										C[d++] = f;
								}
							}
							o(e, C, 0, r), o(i, C, r, n);
						}

						function u(t, e, i) {
							for (;;) {
								var r = s(t, e);
								if (256 === r) return f;
								if (r < 256) t.dest[t.destLen++] = r;
								else {
									var o, n, l, u;
									for (
										r -= 257,
										o = a(t, v[r], b[r]),
										n = s(t, i),
										l = t.destLen - a(t, y[n], A[n]),
										u = l; u < l + o;
										++u
									)
										t.dest[t.destLen++] = t.dest[u];
								}
							}
						}

						function d(t) {
							for (var e, i, r; t.bitcount > 8;)
								t.sourceIndex--, (t.bitcount -= 8);
							if (
								((e = t.source[t.sourceIndex + 1]),
									(e = 256 * e + t.source[t.sourceIndex]),
									(i = t.source[t.sourceIndex + 3]),
									(i = 256 * i + t.source[t.sourceIndex + 2]),
									e !== (65535 & ~i))
							)
								return p;
							for (t.sourceIndex += 4, r = e; r; --r)
								t.dest[t.destLen++] = t.source[t.sourceIndex++];
							return (t.bitcount = 0), f;
						}

						function c(t, i) {
							var r,
								o,
								s = new e(t, i);
							do {
								switch (((r = n(s)), a(s, 2, 0))) {
									case 0:
										o = d(s);
										break;
									case 1:
										o = u(s, g, m);
										break;
									case 2:
										l(s, s.ltree, s.dtree), (o = u(s, s.ltree, s.dtree));
										break;
									default:
										o = p;
								}
								if (o !== f) throw new Error("Data error");
							} while (!r);
							return s.destLen < s.dest.length ?
								"function" == typeof s.dest.slice ?
								s.dest.slice(0, s.destLen) :
								s.dest.subarray(0, s.destLen) :
								s.dest;
						}
						var h = {},
							f = 0,
							p = -3,
							g = new t(),
							m = new t(),
							v = new Uint8Array(30),
							b = new Uint16Array(30),
							y = new Uint8Array(30),
							A = new Uint16Array(30),
							w = new Uint8Array([
								16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1,
								15,
							]),
							k = new t(),
							C = new Uint8Array(320),
							x = new Uint16Array(16);
						return (
							r(g, m),
							i(v, b, 4, 3),
							i(y, A, 2, 1),
							(v[28] = 0),
							(b[28] = 258),
							(h.exports = c),
							h.exports
						);
					})();
					return function(i) {
						return t(i, e);
					};
				}

				function F(t, e) {
					function i(e) {
						var i = Object.create(null),
							o = {
								unitsPerEm: e.head.unitsPerEm,
								ascender: e.hhea.ascender,
								descender: e.hhea.descender,
								forEachGlyph: function(n, a, s, l) {
									var u = 0,
										d = (1 / o.unitsPerEm) * a,
										c = t.U.stringToGlyphs(e, n),
										h = 0;
									return (
										c.forEach(function(o) {
											if (-1 !== o) {
												var c = i[o];
												if (!c) {
													var f = t.U.glyphToPath(e, o),
														p = f.cmds,
														g = f.crds,
														m = void 0,
														v = void 0,
														b = void 0,
														y = void 0;
													if (g.length) {
														(m = v = 1 / 0), (b = y = -1 / 0);
														for (var A = 0, w = g.length; A < w; A += 2) {
															var k = g[A],
																C = g[A + 1];
															k < m && (m = k),
																C < v && (v = C),
																k > b && (b = k),
																C > y && (y = C);
														}
													} else m = b = v = y = 0;
													c = i[o] = {
														index: o,
														advanceWidth: e.hmtx.aWidth[o],
														xMin: m,
														yMin: v,
														xMax: b,
														yMax: y,
														pathCommandCount: p.length,
														forEachPathCommand: function(t) {
															for (
																var e = 0, i = [], o = 0, n = p.length; o < n; o++
															) {
																var a = r[p[o]];
																(i.length = 1 + a), (i[0] = p[o]);
																for (var s = 1; s <= a; s++) i[s] = g[e++];
																t.apply(null, i);
															}
														},
													};
												}
												l.call(null, c, u, h),
													c.advanceWidth && (u += c.advanceWidth * d),
													s && (u += s * a);
											}
											h += n.codePointAt(h) > 65535 ? 2 : 1;
										}),
										u
									);
								},
							};
						return o;
					}
					var r = {
						M: 2,
						L: 2,
						Q: 4,
						C: 6,
						Z: 0
					};
					return function(r) {
						var o = new Uint8Array(r, 0, 4),
							n = t._bin.readASCII(o, 0, 4);
						if ("wOFF" === n) r = e(r);
						else if ("wOF2" === n) throw new Error("woff2 fonts not supported");
						return i(t.parse(r)[0]);
					};
				}

				function I(e, i) {
					if (
						((e = O({}, e)),
							(e.font = D(e.font || tt.defaultFontURL)),
							(e.text = "" + e.text),
							(e.sdfGlyphSize = e.sdfGlyphSize || tt.sdfGlyphSize),
							null != e.colorRanges)
					) {
						var r = {};
						for (var o in e.colorRanges)
							if (e.colorRanges.hasOwnProperty(o)) {
								var n = e.colorRanges[o];
								"number" != typeof n && (n = et.set(n).getHex()), (r[o] = n);
							}
						e.colorRanges = r;
					}
					Object.freeze(e);
					var s = tt.textureWidth,
						l = tt.sdfExponent,
						u = e,
						d = u.sdfGlyphSize,
						c = e.font + "@" + d,
						h = it[c];
					h ||
						((h = it[c] = {
								sdfTexture: new t.DataTexture(
									new Uint8Array(d * s),
									s,
									d,
									t.LuminanceFormat,
									void 0,
									void 0,
									void 0,
									void 0,
									t.LinearFilter,
									t.LinearFilter
								),
							}),
							(h.sdfTexture.font = e.font)),
						nt(e).then(function(t) {
							t.newGlyphSDFs &&
								(t.newGlyphSDFs.forEach(function(t) {
										for (
											var e = t.textureData,
												i = t.atlasIndex,
												r = h.sdfTexture.image; r.data.length < (i + 1) * d * d;

										) {
											var o = new Uint8Array(2 * r.data.length);
											o.set(r.data), (r.data = o), (r.height *= 2);
										}
										for (
											var n = r.width / d,
												a = r.width * d * Math.floor(i / n) + (i % n) * d,
												s = 0; s < d; s++
										)
											for (var l = s * d, u = a + s * r.width, c = 0; c < d; c++)
												r.data[u + c] = e[l + c];
									}),
									(h.sdfTexture.needsUpdate = !0)),
								i(
									Object.freeze({
										parameters: e,
										sdfTexture: h.sdfTexture,
										sdfGlyphSize: d,
										sdfExponent: l,
										glyphBounds: t.glyphBounds,
										glyphAtlasIndices: t.glyphAtlasIndices,
										glyphColors: t.glyphColors,
										caretPositions: t.caretPositions,
										caretHeight: t.caretHeight,
										chunkedBounds: t.chunkedBounds,
										ascender: t.ascender,
										descender: t.descender,
										lineHeight: t.lineHeight,
										topBaseline: t.topBaseline,
										blockBounds: t.blockBounds,
										visibleBounds: t.visibleBounds,
										timings: t.timings,
										get totalBounds() {
											return (
												console.log(
													"totalBounds deprecated, use blockBounds instead"
												),
												t.blockBounds
											);
										},
										get totalBlockSize() {
											console.log(
												"totalBlockSize deprecated, use blockBounds instead"
											);
											var e = a(t.blockBounds, 4),
												i = e[0],
												r = e[1];
											return [e[2] - i, e[3] - r];
										},
									})
								);
						});
				}

				function O(t, e) {
					for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
					return t;
				}

				function D(t) {
					return (
						rt ||
						(rt =
							"undefined" == typeof document ?
							{} :
							document.createElement("a")),
						(rt.href = t),
						rt.href
					);
				}

				function R(e) {
					var i = A(e, {
						chained: !0,
						extensions: {
							derivatives: !0
						},
						uniforms: {
							uTroikaSDFTexture: {
								value: null
							},
							uTroikaSDFTextureSize: {
								value: new t.Vector2()
							},
							uTroikaSDFGlyphSize: {
								value: 0
							},
							uTroikaSDFExponent: {
								value: 0
							},
							uTroikaTotalBounds: {
								value: new t.Vector4(0, 0, 0, 0)
							},
							uTroikaClipRect: {
								value: new t.Vector4(0, 0, 0, 0)
							},
							uTroikaDistanceOffset: {
								value: 0
							},
							uTroikaOrient: {
								value: new t.Matrix3()
							},
							uTroikaUseGlyphColors: {
								value: !0
							},
							uTroikaSDFDebug: {
								value: !1
							},
						},
						vertexDefs: st,
						vertexTransform: lt,
						fragmentDefs: ut,
						fragmentColorTransform: dt,
						customRewriter: function(t) {
							var e = t.vertexShader,
								i = t.fragmentShader,
								r = /\buniform\s+vec3\s+diffuse\b/;
							return (
								r.test(i) &&
								((i = i
										.replace(r, "varying vec3 vTroikaGlyphColor")
										.replace(/\bdiffuse\b/g, "vTroikaGlyphColor")),
									r.test(e) ||
									(e = e.replace(
										N,
										"uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n"
									))), {
									vertexShader: e,
									fragmentShader: i
								}
							);
						},
					});
					return (
						(i.transparent = !0),
						Object.defineProperties(i, {
							isTroikaTextMaterial: {
								value: !0
							},
							shadowSide: {
								get: function() {
									return this.side;
								},
								set: function() {},
							},
						}),
						i
					);
				}
				var M = d(t),
					P = u(l);
				c.all = h.all = function(t) {
					var e = 0,
						i = [],
						r = L();
					return (
						0 === t.length ?
						r.resolve([]) :
						t.forEach(function(o, n) {
							var a = L();
							a.resolve(o),
								a.then(function(o) {
									e++, (i[n] = o), e === t.length && r.resolve(i);
								}, r.reject);
						}),
						r
					);
				};
				var L = "function" == typeof Promise ? h : c,
					z = function() {
						var t = !1;
						if ("undefined" != typeof window && void 0 !== window.document)
							try {
								new Worker(
										URL.createObjectURL(
											new Blob([""], {
												type: "application/javascript"
											})
										)
									).terminate(),
									(t = !0);
							} catch (t) {
								console.log(
									"Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" +
									t.message +
									"]"
								);
							}
						return (
							(z = function() {
								return t;
							}),
							t
						);
					},
					B = 0,
					G = 0,
					W = !1,
					j = Object.create(null),
					V = (function() {
						var t = Object.create(null);
						return (t._count = 0), t;
					})(),
					H = g({
						name: "Thenable",
						dependencies: [L],
						init: function(t) {
							return t;
						},
					}),
					N = /\bvoid\s+main\s*\(\s*\)\s*{/g,
					X =
					Object.assign ||
					function() {
						for (
							var t = arguments[0], e = 1, i = arguments.length; e < i; e++
						) {
							var r = arguments[e];
							if (r)
								for (var o in r) r.hasOwnProperty(o) && (t[o] = r[o]);
						}
						return t;
					},
					q = Date.now(),
					Y = new WeakMap(),
					Q = new Map(),
					$ = 1e10,
					K = 0,
					Z = new Map(),
					J = g({
						name: "Typr Font Parser",
						dependencies: [E, T, F],
						init: function(t, e, i) {
							return i(t(), e());
						},
					}),
					tt = {
						defaultFontURL: "https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",
						sdfGlyphSize: 64,
						sdfMargin: 1 / 16,
						sdfExponent: 9,
						textureWidth: 2048,
					},
					et = new t.Color(),
					it = Object.create(null),
					rt = void 0,
					ot = g({
						name: "FontProcessor",
						dependencies: [tt, J, U, S, _],
						init: function(t, e, i, r, o) {
							var n = t.sdfExponent,
								a = t.sdfMargin,
								s = t.defaultFontURL;
							return o(e, r(i, {
								sdfExponent: n,
								sdfMargin: a
							}), {
								defaultFontURL: s,
							});
						},
					}),
					nt = g({
						name: "TextBuilder",
						dependencies: [ot, H],
						init: function(t, e) {
							return function(i) {
								var r = new e();
								return t.process(i, r.resolve), r;
							};
						},
						getTransferables: function(t) {
							var e = [t.glyphBounds.buffer, t.glyphAtlasIndices.buffer];
							return (
								t.caretPositions && e.push(t.caretPositions.buffer),
								t.newGlyphSDFs &&
								t.newGlyphSDFs.forEach(function(t) {
									e.push(t.textureData.buffer);
								}),
								e
							);
						},
					}),
					at = (function() {
						function o(e) {
							var i = l[e];
							return (
								i ||
								(i = l[e] =
									new t.PlaneBufferGeometry(1, 1, e, e).translate(
										0.5,
										0.5,
										0
									)),
								i
							);
						}

						function a(e, i, r, o) {
							var n = e.getAttribute(i);
							r
								?
								n && n.array.length === r.length ?
								(n.array.set(r), (n.needsUpdate = !0)) :
								(e.setAttribute(i, new t.InstancedBufferAttribute(r, o)),
									delete e._maxInstanceCount,
									e.dispose()) :
								n && e.deleteAttribute(i);
						}

						function s(t, e) {
							t[
								t.hasOwnProperty("instanceCount") ?
								"instanceCount" :
								"maxInstancedCount"
							] = e;
						}
						var l = {},
							u = new t.Vector3(),
							d = "aTroikaGlyphBounds",
							c = "aTroikaGlyphIndex",
							h = "aTroikaGlyphColor",
							f = (function(l) {
								function f() {
									e(this, f);
									var r = i(
										this,
										(f.__proto__ || Object.getPrototypeOf(f)).call(this)
									);
									return (
										(r.detail = 1),
										(r.groups = [{
												start: 0,
												count: 1 / 0,
												materialIndex: 0
											},
											{
												start: 0,
												count: 1 / 0,
												materialIndex: 1
											},
										]),
										(r.boundingSphere = new t.Sphere()),
										(r.boundingBox = new t.Box3()),
										r
									);
								}
								return (
									r(f, l),
									n(f, [{
											key: "computeBoundingSphere",
											value: function() {}
										},
										{
											key: "computeBoundingBox",
											value: function() {}
										},
										{
											key: "updateGlyphs",
											value: function(t, e, i, r, o) {
												a(this, d, t, 4),
													a(this, c, e, 1),
													a(this, h, o, 3),
													(this._chunkedBounds = r),
													s(this, e.length);
												var n = this.boundingSphere;
												n.center.set((i[0] + i[2]) / 2, (i[1] + i[3]) / 2, 0),
													(n.radius = n.center.distanceTo(
														u.set(i[0], i[1], 0)
													));
												var l = this.boundingBox;
												l.min.set(i[0], i[1], 0), l.max.set(i[2], i[3], 0);
											},
										},
										{
											key: "applyClipRect",
											value: function(t) {
												var e = this.getAttribute(c).count,
													i = this._chunkedBounds;
												if (i)
													for (var r = i.length; r--;) {
														e = i[r].end;
														var o = i[r].rect;
														if (
															o[1] < t.w &&
															o[3] > t.y &&
															o[0] < t.z &&
															o[2] > t.x
														)
															break;
													}
												s(this, e);
											},
										},
										{
											key: "detail",
											set: function(t) {
												var e = this;
												if (t !== this._detail) {
													(this._detail = t),
													("number" != typeof t || t < 1) && (t = 1);
													var i = o(t);
													["position", "normal", "uv"].forEach(function(t) {
															e.attributes[t] = i.attributes[t].clone();
														}),
														this.setIndex(i.getIndex().clone());
												}
											},
											get: function() {
												return this._detail;
											},
										},
									]),
									f
								);
							})(t.InstancedBufferGeometry);
						return (
							f.prototype.setAttribute ||
							(f.prototype.setAttribute = function(t, e) {
								return (this.attributes[t] = e), this;
							}),
							f
						);
					})(),
					st =
					"\nuniform vec2 uTroikaSDFTextureSize;\nuniform float uTroikaSDFGlyphSize;\nuniform vec4 uTroikaTotalBounds;\nuniform vec4 uTroikaClipRect;\nuniform mat3 uTroikaOrient;\nuniform bool uTroikaUseGlyphColors;\nuniform float uTroikaDistanceOffset;\nattribute vec4 aTroikaGlyphBounds;\nattribute float aTroikaGlyphIndex;\nattribute vec3 aTroikaGlyphColor;\nvarying vec2 vTroikaGlyphUV;\nvarying vec4 vTroikaTextureUVBounds;\nvarying vec3 vTroikaGlyphColor;\nvarying vec2 vTroikaGlyphDimensions;\n",
					lt =
					"\nvec4 bounds = aTroikaGlyphBounds;\nvec4 outlineBounds = vec4(bounds.xy - uTroikaDistanceOffset, bounds.zw + uTroikaDistanceOffset);\nvec4 clippedBounds = vec4(\n  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),\n  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)\n);\nvec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);\n\nposition.xy = mix(bounds.xy, bounds.zw, clippedXY);\n\nuv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);\n\nposition = uTroikaOrient * position;\nnormal = uTroikaOrient * normal;\n\nvTroikaGlyphUV = clippedXY.xy;\nvTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);\n\n\nfloat txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;\nvec2 txUvPerGlyph = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;\nvec2 txStartUV = txUvPerGlyph * vec2(\n  mod(aTroikaGlyphIndex, txCols),\n  floor(aTroikaGlyphIndex / txCols)\n);\nvTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerGlyph);\n",
					ut =
					"\nuniform sampler2D uTroikaSDFTexture;\nuniform vec2 uTroikaSDFTextureSize;\nuniform float uTroikaSDFGlyphSize;\nuniform float uTroikaSDFExponent;\nuniform float uTroikaDistanceOffset;\nuniform bool uTroikaSDFDebug;\nvarying vec2 vTroikaGlyphUV;\nvarying vec4 vTroikaTextureUVBounds;\nvarying vec2 vTroikaGlyphDimensions;\n\nfloat troikaSdfValueToSignedDistance(float alpha) {\n  // Inverse of encoding in SDFGenerator.js\n  \n  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);\n  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;\n  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);\n  return signedDist;\n}\n\nfloat troikaGlyphUvToSdfValue(vec2 glyphUV) {\n  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);\n  return texture2D(uTroikaSDFTexture, textureUV).r;\n}\n\nfloat troikaGlyphUvToDistance(vec2 uv) {\n  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));\n}\n\nfloat troikaGetTextAlpha(float distanceOffset) {\n  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);\n  float distance = troikaGlyphUvToDistance(clampedGlyphUV);\n    \n  // Extrapolate distance when outside bounds:\n  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : \n    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);\n\n  \n  \n  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)\n  float alpha = step(-distanceOffset, -distance);\n  #else\n  \n  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300\n  float aaDist = length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;\n  #else\n  float aaDist = vTroikaGlyphDimensions.x / 64.0;\n  #endif\n  \n  float alpha = smoothstep(\n    distanceOffset + aaDist,\n    distanceOffset - aaDist,\n    distance\n  );\n  #endif\n  \n  return alpha;\n}\n",
					dt =
					"\nfloat alpha = uTroikaSDFDebug ?\n  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :\n  troikaGetTextAlpha(uTroikaDistanceOffset);\n\n#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)\ngl_FragColor.a *= alpha;\n#endif\n  \nif (alpha == 0.0) {\n  discard;\n}\n",
					ct = (function() {
						function l(t) {
							return Array.isArray(t) ? t[0] : t;
						}
						var u = new t.MeshBasicMaterial({
								color: 16777215,
								side: t.DoubleSide,
								transparent: !0,
							}),
							d = new t.Matrix4(),
							c = new t.Vector3(),
							h = new t.Vector3(),
							f = [],
							p = new t.Vector3(),
							g = "+x+y",
							m = new t.Mesh(
								new t.PlaneBufferGeometry(1, 1).translate(0.5, 0.5, 0),
								u
							),
							v = {
								type: "syncstart"
							},
							b = {
								type: "synccomplete"
							},
							y = [
								"font",
								"fontSize",
								"letterSpacing",
								"lineHeight",
								"maxWidth",
								"overflowWrap",
								"text",
								"textAlign",
								"textIndent",
								"whiteSpace",
								"anchorX",
								"anchorY",
								"colorRanges",
								"sdfGlyphSize",
							],
							A = y.concat(
								"material",
								"color",
								"depthOffset",
								"clipRect",
								"orientation",
								"glyphGeometryDetail"
							),
							w = (function(y) {
								function w() {
									e(this, w);
									var t = new at(),
										r = i(
											this,
											(w.__proto__ || Object.getPrototypeOf(w)).call(
												this,
												t,
												null
											)
										);
									return (
										(r.text = ""),
										(r.anchorX = 0),
										(r.anchorY = 0),
										(r.font = null),
										(r.fontSize = 0.1),
										(r.letterSpacing = 0),
										(r.lineHeight = "normal"),
										(r.maxWidth = 1 / 0),
										(r.overflowWrap = "normal"),
										(r.textAlign = "left"),
										(r.textIndent = 0),
										(r.whiteSpace = "normal"),
										(r.material = null),
										(r.color = null),
										(r.colorRanges = null),
										(r.outlineWidth = 0),
										(r.outlineColor = 0),
										(r.depthOffset = 0),
										(r.clipRect = null),
										(r.orientation = g),
										(r.glyphGeometryDetail = 1),
										(r.sdfGlyphSize = null),
										(r.debugSDF = !1),
										r
									);
								}
								return (
									r(w, y),
									n(w, [{
											key: "sync",
											value: function(t) {
												var e = this;
												this._needsSync &&
													((this._needsSync = !1),
														this._isSyncing ?
														(
															this._queuedSyncs || (this._queuedSyncs = [])
														).push(t) :
														((this._isSyncing = !0),
															this.dispatchEvent(v),
															I({
																	text: this.text,
																	font: this.font,
																	fontSize: this.fontSize || 0.1,
																	letterSpacing: this.letterSpacing || 0,
																	lineHeight: this.lineHeight || "normal",
																	maxWidth: this.maxWidth,
																	textAlign: this.textAlign,
																	textIndent: this.textIndent,
																	whiteSpace: this.whiteSpace,
																	overflowWrap: this.overflowWrap,
																	anchorX: this.anchorX,
																	anchorY: this.anchorY,
																	colorRanges: this.colorRanges,
																	includeCaretPositions: !0,
																	sdfGlyphSize: this.sdfGlyphSize,
																},
																function(i) {
																	(e._isSyncing = !1),
																	(e._textRenderInfo = i),
																	e.geometry.updateGlyphs(
																		i.glyphBounds,
																		i.glyphAtlasIndices,
																		i.blockBounds,
																		i.chunkedBounds,
																		i.glyphColors
																	);
																	var r = e._queuedSyncs;
																	r &&
																		((e._queuedSyncs = null),
																			(e._needsSync = !0),
																			e.sync(function() {
																				r.forEach(function(t) {
																					return t && t();
																				});
																			})),
																		e.dispatchEvent(b),
																		t && t();
																}
															)));
											},
										},
										{
											key: "onBeforeRender",
											value: function(t, e, i, r, o, n) {
												this.sync(),
													o.isTroikaTextMaterial && this._prepareForRender(o);
											},
										},
										{
											key: "dispose",
											value: function() {
												this.geometry.dispose();
											},
										},
										{
											key: "_prepareForRender",
											value: function(e) {
												var i = e.isTextOutlineMaterial,
													r = e.uniforms,
													o = this.textRenderInfo;
												if (o) {
													var n = o.sdfTexture,
														l = o.blockBounds;
													(r.uTroikaSDFTexture.value = n),
													r.uTroikaSDFTextureSize.value.set(
															n.image.width,
															n.image.height
														),
														(r.uTroikaSDFGlyphSize.value = o.sdfGlyphSize),
														(r.uTroikaSDFExponent.value = o.sdfExponent),
														r.uTroikaTotalBounds.value.fromArray(l),
														(r.uTroikaUseGlyphColors.value = !!o.glyphColors);
													var u = 0;
													if (i) {
														var f = this.outlineWidth;
														if ("string" == typeof f) {
															var m = f.match(/^([\d.]+)%$/),
																v = m ? parseFloat(m[1]) : NaN;
															f = (isNaN(v) ? 0 : v / 100) * this.fontSize;
														}
														u = f;
													}
													r.uTroikaDistanceOffset.value = u;
													var b = this.clipRect;
													if (b && Array.isArray(b) && 4 === b.length)
														r.uTroikaClipRect.value.fromArray(b);
													else {
														var y = 100 * (this.fontSize || 0.1);
														r.uTroikaClipRect.value.set(
															l[0] - y,
															l[1] - y,
															l[2] + y,
															l[3] + y
														);
													}
													this.geometry.applyClipRect(r.uTroikaClipRect.value);
												}
												(r.uTroikaSDFDebug.value = !!this.debugSDF),
												(e.polygonOffset = !!this.depthOffset),
												(e.polygonOffsetFactor = e.polygonOffsetUnits =
													this.depthOffset || 0);
												var A = i ? this.outlineColor || 0 : this.color;
												if (null == A) delete e.color;
												else {
													var w = e.hasOwnProperty("color") ?
														e.color :
														(e.color = new t.Color());
													(A === w._input &&
														"object" !== (void 0 === A ? "undefined" : s(A))) ||
													w.set((w._input = A));
												}
												var k = this.orientation || g;
												if (k !== e._orientation) {
													var C = r.uTroikaOrient.value;
													k = k.replace(/[^-+xyz]/g, "");
													var x =
														k !== g && k.match(/^([-+])([xyz])([-+])([xyz])$/);
													if (x) {
														var S = a(x, 5),
															_ = S[1],
															U = S[2],
															E = S[3],
															T = S[4];
														(c.set(0, 0, 0)[U] = "-" === _ ? 1 : -1),
														(h.set(0, 0, 0)[T] = "-" === E ? -1 : 1),
														d.lookAt(p, c.cross(h), h),
															C.setFromMatrix4(d);
													} else C.identity();
													e._orientation = k;
												}
											},
										},
										{
											key: "raycast",
											value: function(t, e) {
												var i = this.textRenderInfo;
												if (i) {
													var r = i.blockBounds;
													m.matrixWorld.multiplyMatrices(
															this.matrixWorld,
															d.set(
																r[2] - r[0],
																0,
																0,
																r[0],
																0,
																r[3] - r[1],
																0,
																r[1],
																0,
																0,
																1,
																0,
																0,
																0,
																0,
																1
															)
														),
														(f.length = 0),
														m.raycast(t, f);
													for (var o = 0; o < f.length; o++)
														(f[o].object = this), e.push(f[o]);
												}
											},
										},
										{
											key: "copy",
											value: function(t) {
												var e = this;
												return (
													o(
														w.prototype.__proto__ ||
														Object.getPrototypeOf(w.prototype),
														"copy",
														this
													).call(this, t),
													A.forEach(function(i) {
														e[i] = t[i];
													}),
													this
												);
											},
										},
										{
											key: "clone",
											value: function() {
												return new this.constructor().copy(this);
											},
										},
										{
											key: "textRenderInfo",
											get: function() {
												return this._textRenderInfo || null;
											},
										},
										{
											key: "material",
											get: function() {
												var t = this._derivedMaterial,
													e =
													this._baseMaterial ||
													this._defaultMaterial ||
													(this._defaultMaterial = u.clone());
												if (
													((t && t.baseMaterial === e) ||
														((t = this._derivedMaterial = R(e)),
															e.addEventListener("dispose", function i() {
																e.removeEventListener("dispose", i), t.dispose();
															})),
														this.outlineWidth)
												) {
													var i = t._outlineMtl;
													i ||
														((i = t._outlineMtl =
																Object.create(t, {
																	id: {
																		value: t.id + 0.1
																	}
																})),
															(i.isTextOutlineMaterial = !0),
															(i.depthWrite = !1),
															(i.map = null)),
														(t = [i, t]);
												}
												return t;
											},
											set: function(t) {
												t && t.isTroikaTextMaterial ?
													((this._derivedMaterial = t),
														(this._baseMaterial = t.baseMaterial)) :
													(this._baseMaterial = t);
											},
										},
										{
											key: "glyphGeometryDetail",
											get: function() {
												return this.geometry.detail;
											},
											set: function(t) {
												this.geometry.detail = t;
											},
										},
										{
											key: "customDepthMaterial",
											get: function() {
												return l(this.material).getDepthMaterial();
											},
										},
										{
											key: "customDistanceMaterial",
											get: function() {
												return l(this.material).getDistanceMaterial();
											},
										},
									]),
									w
								);
							})(t.Mesh);
						y.forEach(function(t) {
							var e = "_private_" + t;
							Object.defineProperty(w.prototype, t, {
								get: function() {
									return this[e];
								},
								set: function(t) {
									t !== this[e] && ((this[e] = t), (this._needsSync = !0));
								},
							});
						});
						var k = !1;
						return (
							Object.defineProperty(w.prototype, "anchor", {
								get: function() {
									return this._deprecated_anchor;
								},
								set: function(t) {
									(this._deprecated_anchor = t),
									k ||
										(console.warn(
												"TextMesh: `anchor` has been deprecated; use `anchorX` and `anchorY` instead."
											),
											(k = !0)),
										Array.isArray(t) ?
										((this.anchorX = 100 * (+t[0] || 0) + "%"),
											(this.anchorY = 100 * (+t[1] || 0) + "%")) :
										(this.anchorX = this.anchorY = 0);
								},
							}),
							w
						);
					})(),
					ht = "troika-text";
				P.default.registerComponent(ht, {
					schema: {
						align: {
							type: "string",
							default: "left",
							oneOf: ["left", "right", "center", "justify"],
						},
						anchor: {
							default: "center",
							oneOf: ["left", "right", "center", "align"],
						},
						baseline: {
							default: "center",
							oneOf: ["top", "center", "bottom"]
						},
						clipRect: {
							type: "string",
							default: "",
							parse: function(t) {
								return (
									t &&
									(t = t.split(/[\s,]+/).reduce(function(t, e) {
										return (e = +e), isNaN(e) || t.push(e), t;
									}, [])),
									t && 4 === t.length ? t : null
								);
							},
							stringify: function(t) {
								return t ? t.join(" ") : "";
							},
						},
						color: {
							type: "color",
							default: "#FFF"
						},
						depthOffset: {
							type: "number",
							default: 0
						},
						font: {
							type: "string"
						},
						fontSize: {
							type: "number",
							default: 0.2
						},
						letterSpacing: {
							type: "number",
							default: 0
						},
						lineHeight: {
							type: "number"
						},
						maxWidth: {
							type: "number",
							default: 1 / 0
						},
						outlineColor: {
							type: "color",
							default: "#000"
						},
						outlineWidth: {
							default: 0,
							parse: function(t) {
								return "string" == typeof t && t.indexOf("%") > 0 ?
									t :
									((t = +t), isNaN(t) ? 0 : t);
							},
							stringify: function(t) {
								return "" + t;
							},
						},
						overflowWrap: {
							type: "string",
							default: "normal",
							oneOf: ["normal", "break-word"],
						},
						textIndent: {
							type: "number",
							default: 0
						},
						value: {
							type: "string"
						},
						whiteSpace: {
							default: "normal",
							oneOf: ["normal", "nowrap"]
						},
					},
					init: function() {
						var t;
						"a-troika-text" === this.el.tagName.toLowerCase() ?
							(t = this.el) :
							((t = document.createElement("a-entity")),
								this.el.appendChild(t)),
							(this.troikaTextEntity = t);
						var e = (this.troikaTextMesh = new ct());
						t.setObject3D("mesh", e);
					},
					update: function() {
						var t = this.data,
							e = this.troikaTextMesh,
							i = this.troikaTextEntity;
						if (
							((e.text = (t.value || "")
									.replace(/\\n/g, "\n")
									.replace(/\\t/g, "\t")),
								(e.textAlign = t.align),
								(e.anchorX =
									ft["align" === t.anchor ? t.align : t.anchor] || "center"),
								(e.anchorY = pt[t.baseline] || "middle"),
								(e.color = t.color),
								(e.clipRect = t.clipRect),
								(e.depthOffset = t.depthOffset || 0),
								(e.font = t.font),
								(e.fontSize = t.fontSize),
								(e.letterSpacing = t.letterSpacing || 0),
								(e.lineHeight = t.lineHeight || "normal"),
								(e.outlineColor = t.outlineColor),
								(e.outlineWidth = t.outlineWidth),
								(e.overflowWrap = t.overflowWrap),
								(e.textIndent = t.textIndent),
								(e.whiteSpace = t.whiteSpace),
								(e.maxWidth = t.maxWidth),
								e.sync(),
								i !== this.el)
						) {
							var r = this.el.getAttribute("troika-text-material");
							r ? i.setAttribute("material", r) : i.removeAttribute("material");
						}
					},
					remove: function() {
						this.troikaTextMesh.dispose(),
							this.troikaTextEntity !== this.el &&
							this.el.removeChild(this.troikaTextEntity);
					},
				});
				var ft = {
						left: "left",
						center: "center",
						right: "right"
					},
					pt = {
						top: "top",
						center: "middle",
						bottom: "bottom"
					},
					gt = {},
					mt = P.default.components[ht].schema;
				Object.keys(mt).map(function(t) {
						var e = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
						gt[e] = ht + "." + t;
					}),
					P.default.registerPrimitive("a-troika-text", {
						defaultComponents: {
							"troika-text": {}
						},
						mappings: gt,
					}),
					(function(t) {
						t.MathUtils || (t.MathUtils = t.Math);
					})(M);
			})(THREE, AFRAME);
		}).call(e, i(22));
	},
	function(t, e, i) {
		"use strict";

		function r() {
			throw new Error("setTimeout has not been defined");
		}

		function o() {
			throw new Error("clearTimeout has not been defined");
		}

		function n(t) {
			if (c === setTimeout) return setTimeout(t, 0);
			if ((c === r || !c) && setTimeout)
				return (c = setTimeout), setTimeout(t, 0);
			try {
				return c(t, 0);
			} catch (e) {
				try {
					return c.call(null, t, 0);
				} catch (e) {
					return c.call(this, t, 0);
				}
			}
		}

		function a(t) {
			if (h === clearTimeout) return clearTimeout(t);
			if ((h === o || !h) && clearTimeout)
				return (h = clearTimeout), clearTimeout(t);
			try {
				return h(t);
			} catch (e) {
				try {
					return h.call(null, t);
				} catch (e) {
					return h.call(this, t);
				}
			}
		}

		function s() {
			m &&
				p &&
				((m = !1), p.length ? (g = p.concat(g)) : (v = -1), g.length && l());
		}

		function l() {
			if (!m) {
				var t = n(s);
				m = !0;
				for (var e = g.length; e;) {
					for (p = g, g = []; ++v < e;) p && p[v].run();
					(v = -1), (e = g.length);
				}
				(p = null), (m = !1), a(t);
			}
		}

		function u(t, e) {
			(this.fun = t), (this.array = e);
		}

		function d() {}
		var c,
			h,
			f = (t.exports = {});
		!(function() {
			try {
				c = "function" == typeof setTimeout ? setTimeout : r;
			} catch (t) {
				c = r;
			}
			try {
				h = "function" == typeof clearTimeout ? clearTimeout : o;
			} catch (t) {
				h = o;
			}
		})();
		var p,
			g = [],
			m = !1,
			v = -1;
		(f.nextTick = function(t) {
			var e = new Array(arguments.length - 1);
			if (arguments.length > 1)
				for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
			g.push(new u(t, e)), 1 !== g.length || m || n(l);
		}),
		(u.prototype.run = function() {
			this.fun.apply(null, this.array);
		}),
		(f.title = "browser"),
		(f.browser = !0),
		(f.env = {}),
		(f.argv = []),
		(f.version = ""),
		(f.versions = {}),
		(f.on = d),
		(f.addListener = d),
		(f.once = d),
		(f.off = d),
		(f.removeListener = d),
		(f.removeAllListeners = d),
		(f.emit = d),
		(f.prependListener = d),
		(f.prependOnceListener = d),
		(f.listeners = function(t) {
			return [];
		}),
		(f.binding = function(t) {
			throw new Error("process.binding is not supported");
		}),
		(f.cwd = function() {
			return "/";
		}),
		(f.chdir = function(t) {
			throw new Error("process.chdir is not supported");
		}),
		(f.umask = function() {
			return 0;
		});
	},
	function(t, e, i) {
		"use strict";
		if ("undefined" == typeof AFRAME)
			throw new Error(
				"Component attempted to register before AFRAME was available."
			);
		i(21),
			i(20),
			i(19),
			i(10),
			i(0),
			i(9),
			i(5),
			i(11),
			i(1),
			i(6),
			i(7),
			i(16),
			i(13),
			i(2),
			i(12),
			i(3),
			i(15),
			i(17),
			i(8),
			i(4),
			i(14),
			i(18);
	},
]);