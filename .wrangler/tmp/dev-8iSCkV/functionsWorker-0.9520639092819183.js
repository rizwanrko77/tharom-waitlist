var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-dlEzgq/functionsWorker-0.9520639092819183.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res, err) => /* @__PURE__ */ __name(function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e2) {
    throw err = [e2], e2;
  }
}, "__init"), "__esm");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
function setCredentialFeature(credentials, feature, value) {
  if (!credentials.$source) {
    credentials.$source = {};
  }
  credentials.$source[feature] = value;
  return credentials;
}
__name(setCredentialFeature, "setCredentialFeature");
var init_setCredentialFeature = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(setCredentialFeature, "setCredentialFeature");
  }
});
var isStreamingPayload;
var init_isStreamingPayload_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/isStreamingPayload/isStreamingPayload.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    isStreamingPayload = /* @__PURE__ */ __name2((request) => request?.body instanceof ReadableStream, "isStreamingPayload");
  }
});
var getAllAliases;
var getMiddlewareNameWithAliases;
var constructStack;
var stepWeights;
var priorityWeights;
var init_MiddlewareStack = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/middleware-stack/MiddlewareStack.js"() {
    init_functionsRoutes_0_9440137819328775();
    getAllAliases = /* @__PURE__ */ __name2((name, aliases) => {
      const _aliases = [];
      if (name) {
        _aliases.push(name);
      }
      if (aliases) {
        for (const alias of aliases) {
          _aliases.push(alias);
        }
      }
      return _aliases;
    }, "getAllAliases");
    getMiddlewareNameWithAliases = /* @__PURE__ */ __name2((name, aliases) => {
      return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
    }, "getMiddlewareNameWithAliases");
    constructStack = /* @__PURE__ */ __name2(() => {
      let absoluteEntries = [];
      let relativeEntries = [];
      let identifyOnResolve = false;
      const entriesNameSet = /* @__PURE__ */ new Set();
      const sort = /* @__PURE__ */ __name2((entries) => entries.sort((a2, b2) => stepWeights[b2.step] - stepWeights[a2.step] || priorityWeights[b2.priority || "normal"] - priorityWeights[a2.priority || "normal"]), "sort");
      const removeByName = /* @__PURE__ */ __name2((toRemove) => {
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name2((entry) => {
          const aliases = getAllAliases(entry.name, entry.aliases);
          if (aliases.includes(toRemove)) {
            isRemoved = true;
            for (const alias of aliases) {
              entriesNameSet.delete(alias);
            }
            return false;
          }
          return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
      }, "removeByName");
      const removeByReference = /* @__PURE__ */ __name2((toRemove) => {
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name2((entry) => {
          if (entry.middleware === toRemove) {
            isRemoved = true;
            for (const alias of getAllAliases(entry.name, entry.aliases)) {
              entriesNameSet.delete(alias);
            }
            return false;
          }
          return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
      }, "removeByReference");
      const cloneTo = /* @__PURE__ */ __name2((toStack) => {
        absoluteEntries.forEach((entry) => {
          toStack.add(entry.middleware, { ...entry });
        });
        relativeEntries.forEach((entry) => {
          toStack.addRelativeTo(entry.middleware, { ...entry });
        });
        toStack.identifyOnResolve?.(stack.identifyOnResolve());
        return toStack;
      }, "cloneTo");
      const expandRelativeMiddlewareList = /* @__PURE__ */ __name2((from) => {
        const expandedMiddlewareList = [];
        from.before.forEach((entry) => {
          if (entry.before.length === 0 && entry.after.length === 0) {
            expandedMiddlewareList.push(entry);
          } else {
            expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
          }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry) => {
          if (entry.before.length === 0 && entry.after.length === 0) {
            expandedMiddlewareList.push(entry);
          } else {
            expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
          }
        });
        return expandedMiddlewareList;
      }, "expandRelativeMiddlewareList");
      const getMiddlewareList = /* @__PURE__ */ __name2((debug = false) => {
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry) => {
          const normalizedEntry = {
            ...entry,
            before: [],
            after: []
          };
          for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
            normalizedEntriesNameMap[alias] = normalizedEntry;
          }
          normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry) => {
          const normalizedEntry = {
            ...entry,
            before: [],
            after: []
          };
          for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
            normalizedEntriesNameMap[alias] = normalizedEntry;
          }
          normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry) => {
          if (entry.toMiddleware) {
            const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
            if (toMiddleware === void 0) {
              if (debug) {
                return;
              }
              throw new Error(`${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`);
            }
            if (entry.relation === "after") {
              toMiddleware.after.push(entry);
            }
            if (entry.relation === "before") {
              toMiddleware.before.push(entry);
            }
          }
        });
        const mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList) => {
          wholeList.push(...expandedMiddlewareList);
          return wholeList;
        }, []);
        return mainChain;
      }, "getMiddlewareList");
      const stack = {
        add: /* @__PURE__ */ __name2((middleware, options = {}) => {
          const { name, override, aliases: _aliases } = options;
          const entry = {
            step: "initialize",
            priority: "normal",
            middleware,
            ...options
          };
          const aliases = getAllAliases(name, _aliases);
          if (aliases.length > 0) {
            if (aliases.some((alias) => entriesNameSet.has(alias))) {
              if (!override)
                throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
              for (const alias of aliases) {
                const toOverrideIndex = absoluteEntries.findIndex((entry2) => entry2.name === alias || entry2.aliases?.some((a2) => a2 === alias));
                if (toOverrideIndex === -1) {
                  continue;
                }
                const toOverride = absoluteEntries[toOverrideIndex];
                if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                  throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`);
                }
                absoluteEntries.splice(toOverrideIndex, 1);
              }
            }
            for (const alias of aliases) {
              entriesNameSet.add(alias);
            }
          }
          absoluteEntries.push(entry);
        }, "add"),
        addRelativeTo: /* @__PURE__ */ __name2((middleware, options) => {
          const { name, override, aliases: _aliases } = options;
          const entry = {
            middleware,
            ...options
          };
          const aliases = getAllAliases(name, _aliases);
          if (aliases.length > 0) {
            if (aliases.some((alias) => entriesNameSet.has(alias))) {
              if (!override)
                throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
              for (const alias of aliases) {
                const toOverrideIndex = relativeEntries.findIndex((entry2) => entry2.name === alias || entry2.aliases?.some((a2) => a2 === alias));
                if (toOverrideIndex === -1) {
                  continue;
                }
                const toOverride = relativeEntries[toOverrideIndex];
                if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                  throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
                }
                relativeEntries.splice(toOverrideIndex, 1);
              }
            }
            for (const alias of aliases) {
              entriesNameSet.add(alias);
            }
          }
          relativeEntries.push(entry);
        }, "addRelativeTo"),
        clone: /* @__PURE__ */ __name2(() => cloneTo(constructStack()), "clone"),
        use: /* @__PURE__ */ __name2((plugin) => {
          plugin.applyToStack(stack);
        }, "use"),
        remove: /* @__PURE__ */ __name2((toRemove) => {
          if (typeof toRemove === "string")
            return removeByName(toRemove);
          else
            return removeByReference(toRemove);
        }, "remove"),
        removeByTag: /* @__PURE__ */ __name2((toRemove) => {
          let isRemoved = false;
          const filterCb = /* @__PURE__ */ __name2((entry) => {
            const { tags, name, aliases: _aliases } = entry;
            if (tags && tags.includes(toRemove)) {
              const aliases = getAllAliases(name, _aliases);
              for (const alias of aliases) {
                entriesNameSet.delete(alias);
              }
              isRemoved = true;
              return false;
            }
            return true;
          }, "filterCb");
          absoluteEntries = absoluteEntries.filter(filterCb);
          relativeEntries = relativeEntries.filter(filterCb);
          return isRemoved;
        }, "removeByTag"),
        concat: /* @__PURE__ */ __name2((from) => {
          const cloned = cloneTo(constructStack());
          cloned.use(from);
          cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
          return cloned;
        }, "concat"),
        applyToStack: cloneTo,
        identify: /* @__PURE__ */ __name2(() => {
          return getMiddlewareList(true).map((mw) => {
            const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
            return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
          });
        }, "identify"),
        identifyOnResolve(toggle) {
          if (typeof toggle === "boolean")
            identifyOnResolve = toggle;
          return identifyOnResolve;
        },
        resolve: /* @__PURE__ */ __name2((handler, context) => {
          for (const middleware of getMiddlewareList().map((entry) => entry.middleware).reverse()) {
            handler = middleware(handler, context);
          }
          if (identifyOnResolve) {
            console.log(stack.identify());
          }
          return handler;
        }, "resolve")
      };
      return stack;
    }, "constructStack");
    stepWeights = {
      initialize: 5,
      serialize: 4,
      build: 3,
      finalizeRequest: 2,
      deserialize: 1
    };
    priorityWeights = {
      high: 3,
      normal: 2,
      low: 1
    };
  }
});
var init_abort = __esm({
  "../node_modules/@smithy/types/dist-es/abort.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var HttpAuthLocation;
var init_auth = __esm({
  "../node_modules/@smithy/types/dist-es/auth/auth.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(HttpAuthLocation2) {
      HttpAuthLocation2["HEADER"] = "header";
      HttpAuthLocation2["QUERY"] = "query";
    })(HttpAuthLocation || (HttpAuthLocation = {}));
  }
});
var HttpApiKeyAuthLocation;
var init_HttpApiKeyAuth = __esm({
  "../node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(HttpApiKeyAuthLocation2) {
      HttpApiKeyAuthLocation2["HEADER"] = "header";
      HttpApiKeyAuthLocation2["QUERY"] = "query";
    })(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));
  }
});
var init_HttpAuthScheme = __esm({
  "../node_modules/@smithy/types/dist-es/auth/HttpAuthScheme.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_HttpAuthSchemeProvider = __esm({
  "../node_modules/@smithy/types/dist-es/auth/HttpAuthSchemeProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_HttpSigner = __esm({
  "../node_modules/@smithy/types/dist-es/auth/HttpSigner.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_IdentityProviderConfig = __esm({
  "../node_modules/@smithy/types/dist-es/auth/IdentityProviderConfig.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_auth2 = __esm({
  "../node_modules/@smithy/types/dist-es/auth/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_auth();
    init_HttpApiKeyAuth();
    init_HttpAuthScheme();
    init_HttpAuthSchemeProvider();
    init_HttpSigner();
    init_IdentityProviderConfig();
  }
});
var init_blob_payload_input_types = __esm({
  "../node_modules/@smithy/types/dist-es/blob/blob-payload-input-types.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_checksum = __esm({
  "../node_modules/@smithy/types/dist-es/checksum.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_client = __esm({
  "../node_modules/@smithy/types/dist-es/client.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_command = __esm({
  "../node_modules/@smithy/types/dist-es/command.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_config = __esm({
  "../node_modules/@smithy/types/dist-es/connection/config.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_manager = __esm({
  "../node_modules/@smithy/types/dist-es/connection/manager.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_pool = __esm({
  "../node_modules/@smithy/types/dist-es/connection/pool.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_connection = __esm({
  "../node_modules/@smithy/types/dist-es/connection/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_config();
    init_manager();
    init_pool();
  }
});
var init_crypto = __esm({
  "../node_modules/@smithy/types/dist-es/crypto.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_encode = __esm({
  "../node_modules/@smithy/types/dist-es/encode.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var EndpointURLScheme;
var init_endpoint = __esm({
  "../node_modules/@smithy/types/dist-es/endpoint.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(EndpointURLScheme2) {
      EndpointURLScheme2["HTTP"] = "http";
      EndpointURLScheme2["HTTPS"] = "https";
    })(EndpointURLScheme || (EndpointURLScheme = {}));
  }
});
var init_EndpointRuleObject = __esm({
  "../node_modules/@smithy/types/dist-es/endpoints/EndpointRuleObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_ErrorRuleObject = __esm({
  "../node_modules/@smithy/types/dist-es/endpoints/ErrorRuleObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_RuleSetObject = __esm({
  "../node_modules/@smithy/types/dist-es/endpoints/RuleSetObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_shared = __esm({
  "../node_modules/@smithy/types/dist-es/endpoints/shared.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_TreeRuleObject = __esm({
  "../node_modules/@smithy/types/dist-es/endpoints/TreeRuleObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_endpoints = __esm({
  "../node_modules/@smithy/types/dist-es/endpoints/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_EndpointRuleObject();
    init_ErrorRuleObject();
    init_RuleSetObject();
    init_shared();
    init_TreeRuleObject();
  }
});
var init_eventStream = __esm({
  "../node_modules/@smithy/types/dist-es/eventStream.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var AlgorithmId;
var init_checksum2 = __esm({
  "../node_modules/@smithy/types/dist-es/extensions/checksum.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(AlgorithmId2) {
      AlgorithmId2["MD5"] = "md5";
      AlgorithmId2["CRC32"] = "crc32";
      AlgorithmId2["CRC32C"] = "crc32c";
      AlgorithmId2["SHA1"] = "sha1";
      AlgorithmId2["SHA256"] = "sha256";
    })(AlgorithmId || (AlgorithmId = {}));
  }
});
var init_defaultClientConfiguration = __esm({
  "../node_modules/@smithy/types/dist-es/extensions/defaultClientConfiguration.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_defaultExtensionConfiguration = __esm({
  "../node_modules/@smithy/types/dist-es/extensions/defaultExtensionConfiguration.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_extensions = __esm({
  "../node_modules/@smithy/types/dist-es/extensions/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_defaultClientConfiguration();
    init_defaultExtensionConfiguration();
    init_checksum2();
  }
});
var init_feature_ids = __esm({
  "../node_modules/@smithy/types/dist-es/feature-ids.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var FieldPosition;
var init_http = __esm({
  "../node_modules/@smithy/types/dist-es/http.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(FieldPosition2) {
      FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
      FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
    })(FieldPosition || (FieldPosition = {}));
  }
});
var init_httpHandlerInitialization = __esm({
  "../node_modules/@smithy/types/dist-es/http/httpHandlerInitialization.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_apiKeyIdentity = __esm({
  "../node_modules/@smithy/types/dist-es/identity/apiKeyIdentity.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_awsCredentialIdentity = __esm({
  "../node_modules/@smithy/types/dist-es/identity/awsCredentialIdentity.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_identity = __esm({
  "../node_modules/@smithy/types/dist-es/identity/identity.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_tokenIdentity = __esm({
  "../node_modules/@smithy/types/dist-es/identity/tokenIdentity.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_identity2 = __esm({
  "../node_modules/@smithy/types/dist-es/identity/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_apiKeyIdentity();
    init_awsCredentialIdentity();
    init_identity();
    init_tokenIdentity();
  }
});
var init_logger = __esm({
  "../node_modules/@smithy/types/dist-es/logger.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var SMITHY_CONTEXT_KEY;
var init_middleware = __esm({
  "../node_modules/@smithy/types/dist-es/middleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    SMITHY_CONTEXT_KEY = "__smithy_context";
  }
});
var init_pagination = __esm({
  "../node_modules/@smithy/types/dist-es/pagination.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var IniSectionType;
var init_profile = __esm({
  "../node_modules/@smithy/types/dist-es/profile.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(IniSectionType2) {
      IniSectionType2["PROFILE"] = "profile";
      IniSectionType2["SSO_SESSION"] = "sso-session";
      IniSectionType2["SERVICES"] = "services";
    })(IniSectionType || (IniSectionType = {}));
  }
});
var init_response = __esm({
  "../node_modules/@smithy/types/dist-es/response.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_retry = __esm({
  "../node_modules/@smithy/types/dist-es/retry.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_schema = __esm({
  "../node_modules/@smithy/types/dist-es/schema/schema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_traits = __esm({
  "../node_modules/@smithy/types/dist-es/schema/traits.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_schema_deprecated = __esm({
  "../node_modules/@smithy/types/dist-es/schema/schema-deprecated.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_sentinels = __esm({
  "../node_modules/@smithy/types/dist-es/schema/sentinels.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_static_schemas = __esm({
  "../node_modules/@smithy/types/dist-es/schema/static-schemas.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_serde = __esm({
  "../node_modules/@smithy/types/dist-es/serde.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_shapes = __esm({
  "../node_modules/@smithy/types/dist-es/shapes.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_signature = __esm({
  "../node_modules/@smithy/types/dist-es/signature.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_stream = __esm({
  "../node_modules/@smithy/types/dist-es/stream.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_streaming_blob_common_types = __esm({
  "../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-common-types.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_streaming_blob_payload_input_types = __esm({
  "../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-input-types.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_streaming_blob_payload_output_types = __esm({
  "../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-output-types.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var RequestHandlerProtocol;
var init_transfer = __esm({
  "../node_modules/@smithy/types/dist-es/transfer.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(RequestHandlerProtocol2) {
      RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
      RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
      RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
    })(RequestHandlerProtocol || (RequestHandlerProtocol = {}));
  }
});
var init_client_payload_blob_type_narrow = __esm({
  "../node_modules/@smithy/types/dist-es/transform/client-payload-blob-type-narrow.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_mutable = __esm({
  "../node_modules/@smithy/types/dist-es/transform/mutable.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_no_undefined = __esm({
  "../node_modules/@smithy/types/dist-es/transform/no-undefined.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_type_transform = __esm({
  "../node_modules/@smithy/types/dist-es/transform/type-transform.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_uri = __esm({
  "../node_modules/@smithy/types/dist-es/uri.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_util = __esm({
  "../node_modules/@smithy/types/dist-es/util.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_waiter = __esm({
  "../node_modules/@smithy/types/dist-es/waiter.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_dist_es = __esm({
  "../node_modules/@smithy/types/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_abort();
    init_auth2();
    init_blob_payload_input_types();
    init_checksum();
    init_client();
    init_command();
    init_connection();
    init_crypto();
    init_encode();
    init_endpoint();
    init_endpoints();
    init_eventStream();
    init_extensions();
    init_feature_ids();
    init_http();
    init_httpHandlerInitialization();
    init_identity2();
    init_logger();
    init_middleware();
    init_pagination();
    init_profile();
    init_response();
    init_retry();
    init_schema();
    init_traits();
    init_schema_deprecated();
    init_sentinels();
    init_static_schemas();
    init_serde();
    init_shapes();
    init_signature();
    init_stream();
    init_streaming_blob_common_types();
    init_streaming_blob_payload_input_types();
    init_streaming_blob_payload_output_types();
    init_transfer();
    init_client_payload_blob_type_narrow();
    init_mutable();
    init_no_undefined();
    init_type_transform();
    init_uri();
    init_util();
    init_waiter();
  }
});
var getSmithyContext;
var init_getSmithyContext = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/getSmithyContext.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es();
    getSmithyContext = /* @__PURE__ */ __name2((context) => context[SMITHY_CONTEXT_KEY] || (context[SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
  }
});
function cloneQuery(query) {
  return Object.keys(query).reduce((carry, paramName) => {
    const param = query[paramName];
    return {
      ...carry,
      [paramName]: Array.isArray(param) ? [...param] : param
    };
  }, {});
}
__name(cloneQuery, "cloneQuery");
var HttpRequest;
var init_httpRequest = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/httpRequest.js"() {
    init_functionsRoutes_0_9440137819328775();
    HttpRequest = class _HttpRequest {
      static {
        __name(this, "_HttpRequest");
      }
      static {
        __name2(this, "HttpRequest");
      }
      method;
      protocol;
      hostname;
      port;
      path;
      query;
      headers;
      username;
      password;
      fragment;
      body;
      constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
        this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
      }
      static clone(request) {
        const cloned = new _HttpRequest({
          ...request,
          headers: { ...request.headers }
        });
        if (cloned.query) {
          cloned.query = cloneQuery(cloned.query);
        }
        return cloned;
      }
      static isInstance(request) {
        if (!request) {
          return false;
        }
        const req = request;
        return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
      }
      clone() {
        return _HttpRequest.clone(this);
      }
    };
    __name2(cloneQuery, "cloneQuery");
  }
});
var HttpResponse;
var init_httpResponse = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/httpResponse.js"() {
    init_functionsRoutes_0_9440137819328775();
    HttpResponse = class {
      static {
        __name(this, "HttpResponse");
      }
      static {
        __name2(this, "HttpResponse");
      }
      statusCode;
      reason;
      headers;
      body;
      constructor(options) {
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
      }
      static isInstance(response) {
        if (!response)
          return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
      }
    };
  }
});
var VALID_HOST_LABEL_REGEX;
var isValidHostLabel;
var init_isValidHostLabel = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/isValidHostLabel.js"() {
    init_functionsRoutes_0_9440137819328775();
    VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
    isValidHostLabel = /* @__PURE__ */ __name2((value, allowSubDomains = false) => {
      if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
      }
      const labels = value.split(".");
      for (const label of labels) {
        if (!isValidHostLabel(label)) {
          return false;
        }
      }
      return true;
    }, "isValidHostLabel");
  }
});
var normalizeProvider;
var init_normalizeProvider = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/normalizeProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
    normalizeProvider = /* @__PURE__ */ __name2((input) => {
      if (typeof input === "function")
        return input;
      const promisified = Promise.resolve(input);
      return () => promisified;
    }, "normalizeProvider");
  }
});
function parseQueryString(querystring) {
  const query = {};
  querystring = querystring.replace(/^\?/, "");
  if (querystring) {
    for (const pair of querystring.split("&")) {
      let [key, value = null] = pair.split("=");
      key = decodeURIComponent(key);
      if (value) {
        value = decodeURIComponent(value);
      }
      if (!(key in query)) {
        query[key] = value;
      } else if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    }
  }
  return query;
}
__name(parseQueryString, "parseQueryString");
var init_parseQueryString = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/parseQueryString.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(parseQueryString, "parseQueryString");
  }
});
var parseUrl;
var init_parseUrl = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/parseUrl.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_parseQueryString();
    parseUrl = /* @__PURE__ */ __name2((url) => {
      if (typeof url === "string") {
        return parseUrl(new URL(url));
      }
      const { hostname, pathname, port, protocol, search } = url;
      let query;
      if (search) {
        query = parseQueryString(search);
      }
      return {
        hostname,
        port: port ? parseInt(port) : void 0,
        protocol,
        path: pathname,
        query
      };
    }, "parseUrl");
  }
});
var toEndpointV1;
var init_toEndpointV1 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/toEndpointV1.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_parseUrl();
    toEndpointV1 = /* @__PURE__ */ __name2((endpoint) => {
      if (typeof endpoint === "object") {
        if ("url" in endpoint) {
          const v1Endpoint = parseUrl(endpoint.url);
          if (endpoint.headers) {
            v1Endpoint.headers = {};
            for (const name in endpoint.headers) {
              v1Endpoint.headers[name.toLowerCase()] = endpoint.headers[name].join(", ");
            }
          }
          return v1Endpoint;
        }
        return endpoint;
      }
      return parseUrl(endpoint);
    }, "toEndpointV1");
  }
});
var init_transport = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/transport/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_getSmithyContext();
    init_httpRequest();
    init_httpResponse();
    init_isValidHostLabel();
    init_normalizeProvider();
    init_parseUrl();
    init_toEndpointV1();
  }
});
var invalidProvider;
var init_invalidProvider = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/invalid-dependency/invalidProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
    invalidProvider = /* @__PURE__ */ __name2((message) => () => Promise.reject(message), "invalidProvider");
  }
});
var getCircularReplacer;
var init_circularReplacer = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/util-waiter/circularReplacer.js"() {
    init_functionsRoutes_0_9440137819328775();
    getCircularReplacer = /* @__PURE__ */ __name2(() => {
      const seen = /* @__PURE__ */ new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      };
    }, "getCircularReplacer");
  }
});
var sleep;
var init_sleep = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/util-waiter/utils/sleep.js"() {
    init_functionsRoutes_0_9440137819328775();
    sleep = /* @__PURE__ */ __name2((seconds) => {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1e3));
    }, "sleep");
  }
});
var waiterServiceDefaults;
var WaiterState;
var checkExceptions;
var init_waiter2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/util-waiter/waiter.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_circularReplacer();
    waiterServiceDefaults = {
      minDelay: 2,
      maxDelay: 120
    };
    (function(WaiterState2) {
      WaiterState2["ABORTED"] = "ABORTED";
      WaiterState2["FAILURE"] = "FAILURE";
      WaiterState2["SUCCESS"] = "SUCCESS";
      WaiterState2["RETRY"] = "RETRY";
      WaiterState2["TIMEOUT"] = "TIMEOUT";
    })(WaiterState || (WaiterState = {}));
    checkExceptions = /* @__PURE__ */ __name2((result) => {
      if (result.state === WaiterState.ABORTED) {
        const abortError = new Error(`${JSON.stringify({
          ...result,
          reason: "Request was aborted"
        }, getCircularReplacer())}`);
        abortError.name = "AbortError";
        throw abortError;
      } else if (result.state === WaiterState.TIMEOUT) {
        const timeoutError = new Error(`${JSON.stringify({
          ...result,
          reason: "Waiter has timed out"
        }, getCircularReplacer())}`);
        timeoutError.name = "TimeoutError";
        throw timeoutError;
      } else if (result.state !== WaiterState.SUCCESS) {
        throw new Error(`${JSON.stringify(result, getCircularReplacer())}`);
      }
      return result;
    }, "checkExceptions");
  }
});
var runPolling;
var checkWarn403;
var createMessageFromResponse;
var exponentialBackoffWithJitter;
var randomInRange;
var init_poller = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/util-waiter/poller.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_circularReplacer();
    init_sleep();
    init_waiter2();
    runPolling = /* @__PURE__ */ __name2(async ({ minDelay, maxDelay, maxWaitTime, abortController, client, abortSignal }, input, acceptorChecks) => {
      const observedResponses = {};
      const [minDelayMs, maxDelayMs] = [minDelay * 1e3, maxDelay * 1e3];
      let currentAttempt = 0;
      const waitUntil = Date.now() + maxWaitTime * 1e3;
      const warn403Time = Date.now() + 6e4;
      let didWarn403 = false;
      while (true) {
        if (currentAttempt > 0) {
          const delayMs = exponentialBackoffWithJitter(minDelayMs, maxDelayMs, currentAttempt, waitUntil);
          if (abortController?.signal?.aborted || abortSignal?.aborted) {
            const message = "AbortController signal aborted.";
            observedResponses[message] |= 0;
            observedResponses[message] += 1;
            return { state: WaiterState.ABORTED, observedResponses };
          }
          if (Date.now() + delayMs > waitUntil) {
            return { state: WaiterState.TIMEOUT, observedResponses };
          }
          await sleep(delayMs / 1e3);
        }
        const { state, reason } = await acceptorChecks(client, input);
        if (reason) {
          const message = createMessageFromResponse(reason);
          observedResponses[message] |= 0;
          observedResponses[message] += 1;
        }
        if (state !== WaiterState.RETRY) {
          return { state, reason, final: reason, observedResponses };
        }
        currentAttempt += 1;
        if (!didWarn403 && Date.now() >= warn403Time) {
          checkWarn403(observedResponses, client);
          didWarn403 = true;
        }
      }
    }, "runPolling");
    checkWarn403 = /* @__PURE__ */ __name2((observedResponses = {}, client) => {
      const orderedErrors = Object.keys(observedResponses);
      let maxCount = 0;
      let count403 = 0;
      for (const response of orderedErrors) {
        const n = observedResponses[response] | 0;
        maxCount = Math.max(n, maxCount);
        if (response.startsWith("403:")) {
          count403 += n;
        }
      }
      const clientLogger = client?.config?.logger;
      const warningLogger = typeof clientLogger?.warn === "function" && !clientLogger.constructor?.name?.includes?.("NoOpLogger") ? clientLogger : console;
      if (count403 >= 3 || orderedErrors[orderedErrors.length - 1]?.startsWith("403:")) {
        warningLogger.warn(`@smithy/util-waiter WARN - 403 status code encountered during waiter polling.`);
      }
    }, "checkWarn403");
    createMessageFromResponse = /* @__PURE__ */ __name2((reason) => {
      const status = reason?.$response?.statusCode ?? reason?.$metadata?.httpStatusCode;
      if (reason?.$responseBodyText) {
        return `${status ? status + ": " : ""}Deserialization error for body: ${reason.$responseBodyText}`;
      }
      if (status) {
        if (reason?.$response || reason?.message) {
          return `${status ?? "Unknown"}: ${reason?.message}`;
        }
        return `${status}: OK`;
      }
      return String(reason?.message ?? JSON.stringify(reason, getCircularReplacer()) ?? "Unknown");
    }, "createMessageFromResponse");
    exponentialBackoffWithJitter = /* @__PURE__ */ __name2((minDelayMs, maxDelayMs, attempt, waitUntil) => {
      const attemptCountCeiling = Math.log(maxDelayMs / minDelayMs) / Math.log(2) + 1;
      if (attempt > attemptCountCeiling) {
        return maxDelayMs;
      }
      const delay = minDelayMs * 2 ** (attempt - 1);
      const capped = Math.min(delay, maxDelayMs);
      const waitFor = randomInRange(minDelayMs, capped);
      if (Date.now() + waitFor > waitUntil) {
        const timeRemaining = waitUntil - Date.now();
        return Math.max(0, timeRemaining - 500);
      }
      return waitFor;
    }, "exponentialBackoffWithJitter");
    randomInRange = /* @__PURE__ */ __name2((min, max) => min + Math.random() * (max - min), "randomInRange");
  }
});
var validateWaiterOptions;
var init_validate = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/util-waiter/utils/validate.js"() {
    init_functionsRoutes_0_9440137819328775();
    validateWaiterOptions = /* @__PURE__ */ __name2((options) => {
      if (options.maxWaitTime <= 0) {
        throw new Error(`WaiterConfiguration.maxWaitTime must be greater than 0`);
      } else if (options.minDelay <= 0) {
        throw new Error(`WaiterConfiguration.minDelay must be greater than 0`);
      } else if (options.maxDelay <= 0) {
        throw new Error(`WaiterConfiguration.maxDelay must be greater than 0`);
      } else if (options.maxWaitTime <= options.minDelay) {
        throw new Error(`WaiterConfiguration.maxWaitTime [${options.maxWaitTime}] must be greater than WaiterConfiguration.minDelay [${options.minDelay}] for this waiter`);
      } else if (options.maxDelay < options.minDelay) {
        throw new Error(`WaiterConfiguration.maxDelay [${options.maxDelay}] must be greater than WaiterConfiguration.minDelay [${options.minDelay}] for this waiter`);
      }
    }, "validateWaiterOptions");
  }
});
var abortTimeout;
var createWaiter;
var init_createWaiter = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/util-waiter/createWaiter.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_poller();
    init_validate();
    init_waiter2();
    abortTimeout = /* @__PURE__ */ __name2((abortSignal) => {
      let onAbort;
      const promise = new Promise((resolve) => {
        onAbort = /* @__PURE__ */ __name2(() => resolve({ state: WaiterState.ABORTED }), "onAbort");
        if (typeof abortSignal.addEventListener === "function") {
          abortSignal.addEventListener("abort", onAbort);
        } else {
          abortSignal.onabort = onAbort;
        }
      });
      return {
        clearListener() {
          if (typeof abortSignal.removeEventListener === "function") {
            abortSignal.removeEventListener("abort", onAbort);
          }
        },
        aborted: promise
      };
    }, "abortTimeout");
    createWaiter = /* @__PURE__ */ __name2(async (options, input, acceptorChecks) => {
      const params = {
        ...waiterServiceDefaults,
        ...options
      };
      validateWaiterOptions(params);
      const exitConditions = [runPolling(params, input, acceptorChecks)];
      const finalize = [];
      if (options.abortSignal) {
        const { aborted, clearListener } = abortTimeout(options.abortSignal);
        finalize.push(clearListener);
        exitConditions.push(aborted);
      }
      if (options.abortController?.signal) {
        const { aborted, clearListener } = abortTimeout(options.abortController.signal);
        finalize.push(clearListener);
        exitConditions.push(aborted);
      }
      return Promise.race(exitConditions).then((result) => {
        for (const fn of finalize) {
          fn();
        }
        return result;
      });
    }, "createWaiter");
  }
});
var Client;
var init_client2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/client.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_MiddlewareStack();
    Client = class {
      static {
        __name(this, "Client");
      }
      static {
        __name2(this, "Client");
      }
      config;
      middlewareStack = constructStack();
      initConfig;
      handlers;
      constructor(config) {
        this.config = config;
        const { protocol, protocolSettings } = config;
        if (protocolSettings) {
          if (typeof protocol === "function") {
            config.protocol = new protocol(protocolSettings);
          }
        }
      }
      send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const useHandlerCache = options === void 0 && this.config.cacheMiddleware === true;
        let handler;
        if (useHandlerCache) {
          if (!this.handlers) {
            this.handlers = /* @__PURE__ */ new WeakMap();
          }
          const handlers = this.handlers;
          if (handlers.has(command.constructor)) {
            handler = handlers.get(command.constructor);
          } else {
            handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
            handlers.set(command.constructor, handler);
          }
        } else {
          delete this.handlers;
          handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        }
        if (callback) {
          handler(command).then((result) => callback(null, result.output), (err) => callback(err)).catch(() => {
          });
        } else {
          return handler(command).then((result) => result.output);
        }
      }
      destroy() {
        this.config?.requestHandler?.destroy?.();
        delete this.handlers;
      }
    };
  }
});
var deref;
var init_deref = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/deref.js"() {
    init_functionsRoutes_0_9440137819328775();
    deref = /* @__PURE__ */ __name2((schemaRef) => {
      if (typeof schemaRef === "function") {
        return schemaRef();
      }
      return schemaRef;
    }, "deref");
  }
});
var operation;
var init_operation = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/operation.js"() {
    init_functionsRoutes_0_9440137819328775();
    operation = /* @__PURE__ */ __name2((namespace, name, traits, input, output) => ({
      name,
      namespace,
      traits,
      input,
      output
    }), "operation");
  }
});
var schemaDeserializationMiddleware;
var findHeader;
var init_schemaDeserializationMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/middleware/schemaDeserializationMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    init_operation();
    schemaDeserializationMiddleware = /* @__PURE__ */ __name2((config) => (next, context) => async (args) => {
      const { response } = await next(args);
      const { operationSchema } = getSmithyContext(context);
      const [, ns, n, t, i2, o] = operationSchema ?? [];
      try {
        const parsed = await config.protocol.deserializeResponse(operation(ns, n, t, i2, o), {
          ...config,
          ...context
        }, response);
        return {
          response,
          output: parsed
        };
      } catch (error) {
        Object.defineProperty(error, "$response", {
          value: response,
          enumerable: false,
          writable: false,
          configurable: false
        });
        if (!("$metadata" in error)) {
          const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
          try {
            error.message += "\n  " + hint;
          } catch (e2) {
            if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
              console.warn(hint);
            } else {
              context.logger?.warn?.(hint);
            }
          }
          if (typeof error.$responseBodyText !== "undefined") {
            if (error.$response) {
              error.$response.body = error.$responseBodyText;
            }
          }
          try {
            if (HttpResponse.isInstance(response)) {
              const { headers = {}, statusCode } = response;
              const headerEntries = Object.entries(headers);
              error.$metadata = {
                httpStatusCode: statusCode,
                requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
                extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
                cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
              };
            }
          } catch (e2) {
          }
        }
        throw error;
      }
    }, "schemaDeserializationMiddleware");
    findHeader = /* @__PURE__ */ __name2((pattern, headers) => {
      return (headers.find(([k2]) => {
        return k2.match(pattern);
      }) || [void 0, void 0])[1];
    }, "findHeader");
  }
});
var schemaSerializationMiddleware;
var init_schemaSerializationMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/middleware/schemaSerializationMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    init_operation();
    schemaSerializationMiddleware = /* @__PURE__ */ __name2((config) => (next, context) => async (args) => {
      const { operationSchema } = getSmithyContext(context);
      const [, ns, n, t, i2, o] = operationSchema ?? [];
      const endpoint = context.endpointV2 ? async () => toEndpointV1(context.endpointV2) : config.endpoint;
      const request = await config.protocol.serializeRequest(operation(ns, n, t, i2, o), args.input, {
        ...config,
        ...context,
        endpoint
      });
      return next({
        ...args,
        request
      });
    }, "schemaSerializationMiddleware");
  }
});
function getSchemaSerdePlugin(config) {
  return {
    applyToStack: /* @__PURE__ */ __name2((commandStack) => {
      commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
      commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
      config.protocol.setSerdeContext(config);
    }, "applyToStack")
  };
}
__name(getSchemaSerdePlugin, "getSchemaSerdePlugin");
var deserializerMiddlewareOption;
var serializerMiddlewareOption;
var init_getSchemaSerdePlugin = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/middleware/getSchemaSerdePlugin.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_schemaDeserializationMiddleware();
    init_schemaSerializationMiddleware();
    deserializerMiddlewareOption = {
      name: "deserializerMiddleware",
      step: "deserialize",
      tags: ["DESERIALIZER"],
      override: true
    };
    serializerMiddlewareOption = {
      name: "serializerMiddleware",
      step: "serialize",
      tags: ["SERIALIZER"],
      override: true
    };
    __name2(getSchemaSerdePlugin, "getSchemaSerdePlugin");
  }
});
var init_Schema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/Schema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_ListSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/ListSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_MapSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/MapSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_OperationSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/OperationSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_StructureSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/StructureSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_ErrorSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/ErrorSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
function translateTraits(indicator) {
  if (typeof indicator === "object") {
    return indicator;
  }
  indicator = indicator | 0;
  if (traitsCache[indicator]) {
    return traitsCache[indicator];
  }
  const traits = {};
  let i2 = 0;
  for (const trait of [
    "httpLabel",
    "idempotent",
    "idempotencyToken",
    "sensitive",
    "httpPayload",
    "httpResponseCode",
    "httpQueryParams"
  ]) {
    if ((indicator >> i2++ & 1) === 1) {
      traits[trait] = 1;
    }
  }
  return traitsCache[indicator] = traits;
}
__name(translateTraits, "translateTraits");
var traitsCache;
var init_translateTraits = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/translateTraits.js"() {
    init_functionsRoutes_0_9440137819328775();
    traitsCache = [];
    __name2(translateTraits, "translateTraits");
  }
});
function member(memberSchema, memberName) {
  if (memberSchema instanceof NormalizedSchema) {
    return Object.assign(memberSchema, {
      memberName,
      _isMemberSchema: true
    });
  }
  const internalCtorAccess = NormalizedSchema;
  return new internalCtorAccess(memberSchema, memberName);
}
__name(member, "member");
var anno;
var simpleSchemaCacheN;
var simpleSchemaCacheS;
var NormalizedSchema;
var isMemberSchema;
var isStaticSchema;
var init_NormalizedSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_deref();
    init_translateTraits();
    anno = {
      it: /* @__PURE__ */ Symbol.for("@smithy/nor-struct-it"),
      ns: /* @__PURE__ */ Symbol.for("@smithy/ns")
    };
    simpleSchemaCacheN = [];
    simpleSchemaCacheS = {};
    NormalizedSchema = class _NormalizedSchema {
      static {
        __name(this, "_NormalizedSchema");
      }
      static {
        __name2(this, "NormalizedSchema");
      }
      ref;
      memberName;
      static symbol = /* @__PURE__ */ Symbol.for("@smithy/nor");
      symbol = _NormalizedSchema.symbol;
      name;
      schema;
      _isMemberSchema;
      traits;
      memberTraits;
      normalizedTraits;
      constructor(ref, memberName) {
        this.ref = ref;
        this.memberName = memberName;
        const traitStack = [];
        let _ref = ref;
        let schema = ref;
        this._isMemberSchema = false;
        while (isMemberSchema(_ref)) {
          traitStack.push(_ref[1]);
          _ref = _ref[0];
          schema = deref(_ref);
          this._isMemberSchema = true;
        }
        if (traitStack.length > 0) {
          this.memberTraits = {};
          for (let i2 = traitStack.length - 1; i2 >= 0; --i2) {
            const traitSet = traitStack[i2];
            Object.assign(this.memberTraits, translateTraits(traitSet));
          }
        } else {
          this.memberTraits = 0;
        }
        if (schema instanceof _NormalizedSchema) {
          const computedMemberTraits = this.memberTraits;
          Object.assign(this, schema);
          this.memberTraits = Object.assign({}, computedMemberTraits, schema.getMemberTraits(), this.getMemberTraits());
          this.normalizedTraits = void 0;
          this.memberName = memberName ?? schema.memberName;
          return;
        }
        this.schema = deref(schema);
        if (isStaticSchema(this.schema)) {
          this.name = `${this.schema[1]}#${this.schema[2]}`;
          this.traits = this.schema[3];
        } else {
          this.name = this.memberName ?? String(schema);
          this.traits = 0;
        }
        if (this._isMemberSchema && !memberName) {
          throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
        }
      }
      static [Symbol.hasInstance](lhs) {
        const isPrototype = this.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
          const ns = lhs;
          return ns.symbol === this.symbol;
        }
        return isPrototype;
      }
      static of(ref) {
        const keyAble = typeof ref === "function" || typeof ref === "object" && ref !== null;
        if (typeof ref === "number") {
          if (simpleSchemaCacheN[ref]) {
            return simpleSchemaCacheN[ref];
          }
        } else if (typeof ref === "string") {
          if (simpleSchemaCacheS[ref]) {
            return simpleSchemaCacheS[ref];
          }
        } else if (keyAble) {
          if (ref[anno.ns]) {
            return ref[anno.ns];
          }
        }
        const sc = deref(ref);
        if (sc instanceof _NormalizedSchema) {
          return sc;
        }
        if (isMemberSchema(sc)) {
          const [ns2, traits] = sc;
          if (ns2 instanceof _NormalizedSchema) {
            Object.assign(ns2.getMergedTraits(), translateTraits(traits));
            return ns2;
          }
          throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(ref, null, 2)}.`);
        }
        const ns = new _NormalizedSchema(sc);
        if (keyAble) {
          return ref[anno.ns] = ns;
        }
        if (typeof sc === "string") {
          return simpleSchemaCacheS[sc] = ns;
        }
        if (typeof sc === "number") {
          return simpleSchemaCacheN[sc] = ns;
        }
        return ns;
      }
      getSchema() {
        const sc = this.schema;
        if (Array.isArray(sc) && sc[0] === 0) {
          return sc[4];
        }
        return sc;
      }
      getName(withNamespace = false) {
        const { name } = this;
        const short = !withNamespace && name && name.includes("#");
        return short ? name.split("#")[1] : name || void 0;
      }
      getMemberName() {
        return this.memberName;
      }
      isMemberSchema() {
        return this._isMemberSchema;
      }
      isListSchema() {
        const sc = this.getSchema();
        return typeof sc === "number" ? sc >= 64 && sc < 128 : sc[0] === 1;
      }
      isMapSchema() {
        const sc = this.getSchema();
        return typeof sc === "number" ? sc >= 128 && sc <= 255 : sc[0] === 2;
      }
      isStructSchema() {
        const sc = this.getSchema();
        if (typeof sc !== "object") {
          return false;
        }
        const id = sc[0];
        return id === 3 || id === -3 || id === 4;
      }
      isUnionSchema() {
        const sc = this.getSchema();
        if (typeof sc !== "object") {
          return false;
        }
        return sc[0] === 4;
      }
      isBlobSchema() {
        const sc = this.getSchema();
        return sc === 21 || sc === 42;
      }
      isTimestampSchema() {
        const sc = this.getSchema();
        return typeof sc === "number" && sc >= 4 && sc <= 7;
      }
      isUnitSchema() {
        return this.getSchema() === "unit";
      }
      isDocumentSchema() {
        return this.getSchema() === 15;
      }
      isStringSchema() {
        return this.getSchema() === 0;
      }
      isBooleanSchema() {
        return this.getSchema() === 2;
      }
      isNumericSchema() {
        return this.getSchema() === 1;
      }
      isBigIntegerSchema() {
        return this.getSchema() === 17;
      }
      isBigDecimalSchema() {
        return this.getSchema() === 19;
      }
      isStreaming() {
        const { streaming } = this.getMergedTraits();
        return !!streaming || this.getSchema() === 42;
      }
      isIdempotencyToken() {
        return !!this.getMergedTraits().idempotencyToken;
      }
      getMergedTraits() {
        return this.normalizedTraits ?? (this.normalizedTraits = {
          ...this.getOwnTraits(),
          ...this.getMemberTraits()
        });
      }
      getMemberTraits() {
        return translateTraits(this.memberTraits);
      }
      getOwnTraits() {
        return translateTraits(this.traits);
      }
      getKeySchema() {
        const [isDoc, isMap] = [this.isDocumentSchema(), this.isMapSchema()];
        if (!isDoc && !isMap) {
          throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
        }
        const schema = this.getSchema();
        const memberSchema = isDoc ? 15 : schema[4] ?? 0;
        return member([memberSchema, 0], "key");
      }
      getValueSchema() {
        const sc = this.getSchema();
        const [isDoc, isMap, isList] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()];
        const memberSchema = typeof sc === "number" ? 63 & sc : sc && typeof sc === "object" && (isMap || isList) ? sc[3 + sc[0]] : isDoc ? 15 : void 0;
        if (memberSchema != null) {
          return member([memberSchema, 0], isMap ? "value" : "member");
        }
        throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
      }
      getMemberSchema(memberName) {
        const struct = this.getSchema();
        if (this.isStructSchema() && struct[4].includes(memberName)) {
          const i2 = struct[4].indexOf(memberName);
          const memberSchema = struct[5][i2];
          return member(isMemberSchema(memberSchema) ? memberSchema : [memberSchema, 0], memberName);
        }
        if (this.isDocumentSchema()) {
          return member([15, 0], memberName);
        }
        throw new Error(`@smithy/core/schema - ${this.getName(true)} has no member=${memberName}.`);
      }
      getMemberSchemas() {
        const buffer = {};
        try {
          for (const [k2, v] of this.structIterator()) {
            buffer[k2] = v;
          }
        } catch (ignored) {
        }
        return buffer;
      }
      getEventStreamMember() {
        if (this.isStructSchema()) {
          for (const [memberName, memberSchema] of this.structIterator()) {
            if (memberSchema.isStreaming() && memberSchema.isStructSchema()) {
              return memberName;
            }
          }
        }
        return "";
      }
      *structIterator() {
        if (this.isUnitSchema()) {
          return;
        }
        if (!this.isStructSchema()) {
          throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
        }
        const struct = this.getSchema();
        const z = struct[4].length;
        let it = struct[anno.it];
        if (it && z === it.length) {
          yield* it;
          return;
        }
        it = Array(z);
        for (let i2 = 0; i2 < z; ++i2) {
          const k2 = struct[4][i2];
          const v = member([struct[5][i2], 0], k2);
          yield it[i2] = [k2, v];
        }
        struct[anno.it] = it;
      }
    };
    __name2(member, "member");
    isMemberSchema = /* @__PURE__ */ __name2((sc) => Array.isArray(sc) && sc.length === 2, "isMemberSchema");
    isStaticSchema = /* @__PURE__ */ __name2((sc) => Array.isArray(sc) && sc.length >= 5, "isStaticSchema");
  }
});
var init_SimpleSchema = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/SimpleSchema.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_sentinels2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/schemas/sentinels.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var TypeRegistry;
var init_TypeRegistry = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js"() {
    init_functionsRoutes_0_9440137819328775();
    TypeRegistry = class _TypeRegistry {
      static {
        __name(this, "_TypeRegistry");
      }
      static {
        __name2(this, "TypeRegistry");
      }
      namespace;
      schemas;
      exceptions;
      static registries = /* @__PURE__ */ new Map();
      constructor(namespace, schemas = /* @__PURE__ */ new Map(), exceptions = /* @__PURE__ */ new Map()) {
        this.namespace = namespace;
        this.schemas = schemas;
        this.exceptions = exceptions;
      }
      static for(namespace) {
        if (!_TypeRegistry.registries.has(namespace)) {
          _TypeRegistry.registries.set(namespace, new _TypeRegistry(namespace));
        }
        return _TypeRegistry.registries.get(namespace);
      }
      copyFrom(other) {
        const { schemas, exceptions } = this;
        for (const [k2, v] of other.schemas) {
          if (!schemas.has(k2)) {
            schemas.set(k2, v);
          }
        }
        for (const [k2, v] of other.exceptions) {
          if (!exceptions.has(k2)) {
            exceptions.set(k2, v);
          }
        }
      }
      register(shapeId, schema) {
        const qualifiedName = this.normalizeShapeId(shapeId);
        for (const r2 of [this, _TypeRegistry.for(qualifiedName.split("#")[0])]) {
          r2.schemas.set(qualifiedName, schema);
        }
      }
      getSchema(shapeId) {
        const id = this.normalizeShapeId(shapeId);
        if (!this.schemas.has(id)) {
          if (!shapeId.includes("#")) {
            const suffix = "#" + shapeId;
            const candidates = [];
            for (const [shapeId2, schema] of this.schemas.entries()) {
              if (shapeId2.endsWith(suffix)) {
                candidates.push(schema);
              }
            }
            if (candidates.length === 1) {
              return candidates[0];
            }
          }
          throw new Error(`@smithy/core/schema - schema not found for ${id}`);
        }
        return this.schemas.get(id);
      }
      registerError(es, ctor) {
        const $error = es;
        const ns = $error[1];
        for (const r2 of [this, _TypeRegistry.for(ns)]) {
          r2.schemas.set(ns + "#" + $error[2], $error);
          r2.exceptions.set($error, ctor);
        }
      }
      getErrorCtor(es) {
        const $error = es;
        if (this.exceptions.has($error)) {
          return this.exceptions.get($error);
        }
        const registry = _TypeRegistry.for($error[1]);
        return registry.exceptions.get($error);
      }
      getBaseException() {
        for (const exceptionKey of this.exceptions.keys()) {
          if (Array.isArray(exceptionKey)) {
            const [, ns, name] = exceptionKey;
            const id = ns + "#" + name;
            if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) {
              return exceptionKey;
            }
          }
        }
        return void 0;
      }
      find(predicate) {
        for (const schema of this.schemas.values()) {
          if (predicate(schema)) {
            return schema;
          }
        }
        return void 0;
      }
      clear() {
        this.schemas.clear();
        this.exceptions.clear();
      }
      normalizeShapeId(shapeId) {
        if (shapeId.includes("#")) {
          return shapeId;
        }
        return this.namespace + "#" + shapeId;
      }
    };
  }
});
var init_schema2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/schema/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_deref();
    init_getSchemaSerdePlugin();
    init_ListSchema();
    init_MapSchema();
    init_OperationSchema();
    init_operation();
    init_ErrorSchema();
    init_NormalizedSchema();
    init_Schema();
    init_SimpleSchema();
    init_StructureSchema();
    init_sentinels2();
    init_translateTraits();
    init_TypeRegistry();
  }
});
function schemaLogFilter(schema, data) {
  if (data == null) {
    return data;
  }
  const ns = NormalizedSchema.of(schema);
  if (ns.getMergedTraits().sensitive) {
    return SENSITIVE_STRING;
  }
  if (ns.isListSchema()) {
    const isSensitive = !!ns.getValueSchema().getMergedTraits().sensitive;
    if (isSensitive) {
      return SENSITIVE_STRING;
    }
  } else if (ns.isMapSchema()) {
    const isSensitive = !!ns.getKeySchema().getMergedTraits().sensitive || !!ns.getValueSchema().getMergedTraits().sensitive;
    if (isSensitive) {
      return SENSITIVE_STRING;
    }
  } else if (ns.isStructSchema() && typeof data === "object") {
    const object = data;
    const newObject = {};
    for (const [member2, memberNs] of ns.structIterator()) {
      if (object[member2] != null) {
        newObject[member2] = schemaLogFilter(memberNs, object[member2]);
      }
    }
    return newObject;
  }
  return data;
}
__name(schemaLogFilter, "schemaLogFilter");
var SENSITIVE_STRING;
var init_schemaLogFilter = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/schemaLogFilter.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_schema2();
    SENSITIVE_STRING = "***SensitiveInformation***";
    __name2(schemaLogFilter, "schemaLogFilter");
  }
});
var Command;
var ClassBuilder;
var init_command2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/command.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es();
    init_MiddlewareStack();
    init_schemaLogFilter();
    Command = class {
      static {
        __name(this, "Command");
      }
      static {
        __name2(this, "Command");
      }
      middlewareStack = constructStack();
      schema;
      static classBuilder() {
        return new ClassBuilder();
      }
      resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor }) {
        for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) {
          this.middlewareStack.use(mw);
        }
        const stack = clientStack.concat(this.middlewareStack);
        const { logger: logger2 } = configuration;
        const handlerExecutionContext = {
          logger: logger2,
          clientName,
          commandName,
          inputFilterSensitiveLog,
          outputFilterSensitiveLog,
          [SMITHY_CONTEXT_KEY]: {
            commandInstance: this,
            ...smithyContext
          },
          ...additionalContext
        };
        const { requestHandler } = configuration;
        let requestOptions = options ?? {};
        if (smithyContext.eventStream) {
          requestOptions = {
            isEventStream: true,
            ...requestOptions
          };
        }
        return stack.resolve((request) => requestHandler.handle(request.request, requestOptions), handlerExecutionContext);
      }
    };
    ClassBuilder = class {
      static {
        __name(this, "ClassBuilder");
      }
      static {
        __name2(this, "ClassBuilder");
      }
      _init = /* @__PURE__ */ __name2(() => {
      }, "_init");
      _ep = {};
      _middlewareFn = /* @__PURE__ */ __name2(() => [], "_middlewareFn");
      _commandName = "";
      _clientName = "";
      _additionalContext = {};
      _smithyContext = {};
      _inputFilterSensitiveLog = void 0;
      _outputFilterSensitiveLog = void 0;
      _serializer = null;
      _deserializer = null;
      _operationSchema;
      init(cb) {
        this._init = cb;
      }
      ep(endpointParameterInstructions) {
        this._ep = endpointParameterInstructions;
        return this;
      }
      m(middlewareSupplier) {
        this._middlewareFn = middlewareSupplier;
        return this;
      }
      s(service, operation2, smithyContext = {}) {
        this._smithyContext = {
          service,
          operation: operation2,
          ...smithyContext
        };
        return this;
      }
      c(additionalContext = {}) {
        this._additionalContext = additionalContext;
        return this;
      }
      n(clientName, commandName) {
        this._clientName = clientName;
        this._commandName = commandName;
        return this;
      }
      f(inputFilter = (_) => _, outputFilter = (_) => _) {
        this._inputFilterSensitiveLog = inputFilter;
        this._outputFilterSensitiveLog = outputFilter;
        return this;
      }
      ser(serializer) {
        this._serializer = serializer;
        return this;
      }
      de(deserializer) {
        this._deserializer = deserializer;
        return this;
      }
      sc(operation2) {
        this._operationSchema = operation2;
        this._smithyContext.operationSchema = operation2;
        return this;
      }
      build() {
        const closure = this;
        let CommandRef;
        return CommandRef = class extends Command {
          static {
            __name(this, "CommandRef");
          }
          static {
            __name2(this, "CommandRef");
          }
          input;
          static getEndpointParameterInstructions() {
            return closure._ep;
          }
          constructor(...[input]) {
            super();
            this.input = input ?? {};
            closure._init(this);
            this.schema = closure._operationSchema;
          }
          resolveMiddleware(stack, configuration, options) {
            const op = closure._operationSchema;
            const input = op?.[4] ?? op?.input;
            const output = op?.[5] ?? op?.output;
            return this.resolveMiddlewareWithContext(stack, configuration, options, {
              CommandCtor: CommandRef,
              middlewareFn: closure._middlewareFn,
              clientName: closure._clientName,
              commandName: closure._commandName,
              inputFilterSensitiveLog: closure._inputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, input) : (_) => _),
              outputFilterSensitiveLog: closure._outputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, output) : (_) => _),
              smithyContext: closure._smithyContext,
              additionalContext: closure._additionalContext
            });
          }
          serialize = closure._serializer;
          deserialize = closure._deserializer;
        };
      }
    };
  }
});
var createAggregatedClient;
var init_create_aggregated_client = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/create-aggregated-client.js"() {
    init_functionsRoutes_0_9440137819328775();
    createAggregatedClient = /* @__PURE__ */ __name2((commands2, Client2, options) => {
      for (const [command, CommandCtor] of Object.entries(commands2)) {
        const methodImpl = /* @__PURE__ */ __name2(async function(args, optionsOrCb, cb) {
          const command2 = new CommandCtor(args);
          if (typeof optionsOrCb === "function") {
            this.send(command2, optionsOrCb);
          } else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
              throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
            this.send(command2, optionsOrCb || {}, cb);
          } else {
            return this.send(command2, optionsOrCb);
          }
        }, "methodImpl");
        const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
        Client2.prototype[methodName] = methodImpl;
      }
      const { paginators: paginators2 = {}, waiters: waiters2 = {} } = options ?? {};
      for (const [paginatorName, paginatorFn] of Object.entries(paginators2)) {
        if (Client2.prototype[paginatorName] === void 0) {
          Client2.prototype[paginatorName] = function(commandInput = {}, paginationConfiguration, ...rest) {
            return paginatorFn({
              ...paginationConfiguration,
              client: this
            }, commandInput, ...rest);
          };
        }
      }
      for (const [waiterName, waiterFn] of Object.entries(waiters2)) {
        if (Client2.prototype[waiterName] === void 0) {
          Client2.prototype[waiterName] = async function(commandInput = {}, waiterConfiguration, ...rest) {
            let config = waiterConfiguration;
            if (typeof waiterConfiguration === "number") {
              config = {
                maxWaitTime: waiterConfiguration
              };
            }
            return waiterFn({
              ...config,
              client: this
            }, commandInput, ...rest);
          };
        }
      }
    }, "createAggregatedClient");
  }
});
var ServiceException;
var decorateServiceException;
var init_exceptions = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/exceptions.js"() {
    init_functionsRoutes_0_9440137819328775();
    ServiceException = class _ServiceException extends Error {
      static {
        __name(this, "_ServiceException");
      }
      static {
        __name2(this, "ServiceException");
      }
      $fault;
      $response;
      $retryable;
      $metadata;
      constructor(options) {
        super(options.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
      }
      static isInstance(value) {
        if (!value)
          return false;
        const candidate = value;
        return _ServiceException.prototype.isPrototypeOf(candidate) || Boolean(candidate.$fault) && Boolean(candidate.$metadata) && (candidate.$fault === "client" || candidate.$fault === "server");
      }
      static [Symbol.hasInstance](instance) {
        if (!instance)
          return false;
        const candidate = instance;
        if (this === _ServiceException) {
          return _ServiceException.isInstance(instance);
        }
        if (_ServiceException.isInstance(instance)) {
          if (candidate.name && this.name) {
            return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
          }
          return this.prototype.isPrototypeOf(instance);
        }
        return false;
      }
    };
    decorateServiceException = /* @__PURE__ */ __name2((exception, additions = {}) => {
      Object.entries(additions).filter(([, v]) => v !== void 0).forEach(([k2, v]) => {
        if (exception[k2] == void 0 || exception[k2] === "") {
          exception[k2] = v;
        }
      });
      const message = exception.message || exception.Message || "UnknownError";
      exception.message = message;
      delete exception.Message;
      return exception;
    }, "decorateServiceException");
  }
});
var loadConfigsForDefaultMode;
var init_defaults_mode = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/defaults-mode.js"() {
    init_functionsRoutes_0_9440137819328775();
    loadConfigsForDefaultMode = /* @__PURE__ */ __name2((mode) => {
      switch (mode) {
        case "standard":
          return {
            retryMode: "standard",
            connectionTimeout: 3100
          };
        case "in-region":
          return {
            retryMode: "standard",
            connectionTimeout: 1100
          };
        case "cross-region":
          return {
            retryMode: "standard",
            connectionTimeout: 3100
          };
        case "mobile":
          return {
            retryMode: "standard",
            connectionTimeout: 3e4
          };
        default:
          return {};
      }
    }, "loadConfigsForDefaultMode");
  }
});
var knownAlgorithms;
var getChecksumConfiguration;
var resolveChecksumRuntimeConfig;
var init_checksum3 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/extensions/checksum.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es();
    knownAlgorithms = Object.values(AlgorithmId);
    getChecksumConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      const checksumAlgorithms = [];
      for (const id in AlgorithmId) {
        const algorithmId = AlgorithmId[id];
        if (runtimeConfig[algorithmId] === void 0) {
          continue;
        }
        checksumAlgorithms.push({
          algorithmId: /* @__PURE__ */ __name2(() => algorithmId, "algorithmId"),
          checksumConstructor: /* @__PURE__ */ __name2(() => runtimeConfig[algorithmId], "checksumConstructor")
        });
      }
      for (const [id, ChecksumCtor] of Object.entries(runtimeConfig.checksumAlgorithms ?? {})) {
        checksumAlgorithms.push({
          algorithmId: /* @__PURE__ */ __name2(() => id, "algorithmId"),
          checksumConstructor: /* @__PURE__ */ __name2(() => ChecksumCtor, "checksumConstructor")
        });
      }
      return {
        addChecksumAlgorithm(algo) {
          runtimeConfig.checksumAlgorithms = runtimeConfig.checksumAlgorithms ?? {};
          const id = algo.algorithmId();
          const ctor = algo.checksumConstructor();
          if (knownAlgorithms.includes(id)) {
            runtimeConfig.checksumAlgorithms[id.toUpperCase()] = ctor;
          } else {
            runtimeConfig.checksumAlgorithms[id] = ctor;
          }
          checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
          return checksumAlgorithms;
        }
      };
    }, "getChecksumConfiguration");
    resolveChecksumRuntimeConfig = /* @__PURE__ */ __name2((clientConfig) => {
      const runtimeConfig = {};
      clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        const id = checksumAlgorithm.algorithmId();
        if (knownAlgorithms.includes(id)) {
          runtimeConfig[id] = checksumAlgorithm.checksumConstructor();
        }
      });
      return runtimeConfig;
    }, "resolveChecksumRuntimeConfig");
  }
});
var getRetryConfiguration;
var resolveRetryRuntimeConfig;
var init_retry2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/extensions/retry.js"() {
    init_functionsRoutes_0_9440137819328775();
    getRetryConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      return {
        setRetryStrategy(retryStrategy) {
          runtimeConfig.retryStrategy = retryStrategy;
        },
        retryStrategy() {
          return runtimeConfig.retryStrategy;
        }
      };
    }, "getRetryConfiguration");
    resolveRetryRuntimeConfig = /* @__PURE__ */ __name2((retryStrategyConfiguration) => {
      const runtimeConfig = {};
      runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
      return runtimeConfig;
    }, "resolveRetryRuntimeConfig");
  }
});
var getDefaultExtensionConfiguration;
var resolveDefaultRuntimeConfig;
var init_defaultExtensionConfiguration2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/extensions/defaultExtensionConfiguration.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_checksum3();
    init_retry2();
    getDefaultExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      return Object.assign(getChecksumConfiguration(runtimeConfig), getRetryConfiguration(runtimeConfig));
    }, "getDefaultExtensionConfiguration");
    resolveDefaultRuntimeConfig = /* @__PURE__ */ __name2((config) => {
      return Object.assign(resolveChecksumRuntimeConfig(config), resolveRetryRuntimeConfig(config));
    }, "resolveDefaultRuntimeConfig");
  }
});
var getValueFromTextNode;
var init_get_value_from_text_node = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/get-value-from-text-node.js"() {
    init_functionsRoutes_0_9440137819328775();
    getValueFromTextNode = /* @__PURE__ */ __name2((obj) => {
      const textNodeName = "#text";
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== void 0) {
          obj[key] = obj[key][textNodeName];
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          obj[key] = getValueFromTextNode(obj[key]);
        }
      }
      return obj;
    }, "getValueFromTextNode");
  }
});
var NoOpLogger;
var init_NoOpLogger = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/smithy-client/NoOpLogger.js"() {
    init_functionsRoutes_0_9440137819328775();
    NoOpLogger = class {
      static {
        __name(this, "NoOpLogger");
      }
      static {
        __name2(this, "NoOpLogger");
      }
      trace() {
      }
      debug() {
      }
      info() {
      }
      warn() {
      }
      error() {
      }
    };
  }
});
var init_client3 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/client/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    init_transport();
    init_invalidProvider();
    init_createWaiter();
    init_waiter2();
    init_client2();
    init_command2();
    init_create_aggregated_client();
    init_defaults_mode();
    init_exceptions();
    init_defaultExtensionConfiguration2();
    init_get_value_from_text_node();
    init_NoOpLogger();
  }
});
var chars;
var alphabetByEncoding;
var alphabetByValue;
var bitsPerLetter;
var bitsPerByte;
var maxLetterValue;
var init_constants_for_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-base64/constants-for-browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
    alphabetByEncoding = Object.entries(chars).reduce((acc, [i2, c2]) => {
      acc[c2] = Number(i2);
      return acc;
    }, {});
    alphabetByValue = chars.split("");
    bitsPerLetter = 6;
    bitsPerByte = 8;
    maxLetterValue = 63;
  }
});
var fromBase64;
var init_fromBase64_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-base64/fromBase64.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_constants_for_browser();
    fromBase64 = /* @__PURE__ */ __name2((input) => {
      let totalByteLength = input.length / 4 * 3;
      if (input.slice(-2) === "==") {
        totalByteLength -= 2;
      } else if (input.slice(-1) === "=") {
        totalByteLength--;
      }
      const out = new ArrayBuffer(totalByteLength);
      const dataView = new DataView(out);
      for (let i2 = 0; i2 < input.length; i2 += 4) {
        let bits = 0;
        let bitLength = 0;
        for (let j2 = i2, limit = i2 + 3; j2 <= limit; j2++) {
          if (input[j2] !== "=") {
            if (!(input[j2] in alphabetByEncoding)) {
              throw new TypeError(`Invalid character ${input[j2]} in base64 string.`);
            }
            bits |= alphabetByEncoding[input[j2]] << (limit - j2) * bitsPerLetter;
            bitLength += bitsPerLetter;
          } else {
            bits >>= bitsPerLetter;
          }
        }
        const chunkOffset = i2 / 4 * 3;
        bits >>= bitLength % bitsPerByte;
        const byteLength = Math.floor(bitLength / bitsPerByte);
        for (let k2 = 0; k2 < byteLength; k2++) {
          const offset = (byteLength - k2 - 1) * bitsPerByte;
          dataView.setUint8(chunkOffset + k2, (bits & 255 << offset) >> offset);
        }
      }
      return new Uint8Array(out);
    }, "fromBase64");
  }
});
var fromUtf8;
var init_fromUtf8_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/fromUtf8.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    fromUtf8 = /* @__PURE__ */ __name2((input) => new TextEncoder().encode(input), "fromUtf8");
  }
});
function toBase64(_input) {
  let input;
  if (typeof _input === "string") {
    input = fromUtf8(_input);
  } else {
    input = _input;
  }
  const isArrayLike = typeof input === "object" && typeof input.length === "number";
  const isUint8Array = typeof input === "object" && typeof input.byteOffset === "number" && typeof input.byteLength === "number";
  if (!isArrayLike && !isUint8Array) {
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  }
  let str = "";
  for (let i2 = 0; i2 < input.length; i2 += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j2 = i2, limit = Math.min(i2 + 3, input.length); j2 < limit; j2++) {
      bits |= input[j2] << (limit - j2 - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k2 = 1; k2 <= bitClusterCount; k2++) {
      const offset = (bitClusterCount - k2) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
    str += "==".slice(0, 4 - bitClusterCount);
  }
  return str;
}
__name(toBase64, "toBase64");
var init_toBase64_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-base64/toBase64.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_fromUtf8_browser();
    init_constants_for_browser();
    __name2(toBase64, "toBase64");
  }
});
function bindUint8ArrayBlobAdapter(toUtf82, fromUtf84, toBase642, fromBase642) {
  return class Uint8ArrayBlobAdapter2 extends Uint8Array {
    static {
      __name(this, "Uint8ArrayBlobAdapter2");
    }
    static {
      __name2(this, "Uint8ArrayBlobAdapter");
    }
    static fromString(source, encoding = "utf-8") {
      if (typeof source === "string") {
        if (encoding === "base64") {
          return Uint8ArrayBlobAdapter2.mutate(fromBase642(source));
        }
        return Uint8ArrayBlobAdapter2.mutate(fromUtf84(source));
      }
      throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
    }
    static mutate(source) {
      Object.setPrototypeOf(source, Uint8ArrayBlobAdapter2.prototype);
      return source;
    }
    transformToString(encoding = "utf-8") {
      if (encoding === "base64") {
        return toBase642(this);
      }
      return toUtf82(this);
    }
  };
}
__name(bindUint8ArrayBlobAdapter, "bindUint8ArrayBlobAdapter");
var init_Uint8ArrayBlobAdapter = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-stream/blob/Uint8ArrayBlobAdapter.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(bindUint8ArrayBlobAdapter, "bindUint8ArrayBlobAdapter");
  }
});
var toUtf8;
var init_toUtf8_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/toUtf8.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    toUtf8 = /* @__PURE__ */ __name2((input) => {
      if (typeof input === "string") {
        return input;
      }
      if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      }
      return new TextDecoder("utf-8").decode(input);
    }, "toUtf8");
  }
});
function bindV4(getRandomValues) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return () => crypto.randomUUID();
  }
  return () => {
    const rnds = new Uint8Array(16);
    getRandomValues(rnds);
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    return decimalToHex[rnds[0]] + decimalToHex[rnds[1]] + decimalToHex[rnds[2]] + decimalToHex[rnds[3]] + "-" + decimalToHex[rnds[4]] + decimalToHex[rnds[5]] + "-" + decimalToHex[rnds[6]] + decimalToHex[rnds[7]] + "-" + decimalToHex[rnds[8]] + decimalToHex[rnds[9]] + "-" + decimalToHex[rnds[10]] + decimalToHex[rnds[11]] + decimalToHex[rnds[12]] + decimalToHex[rnds[13]] + decimalToHex[rnds[14]] + decimalToHex[rnds[15]];
  };
}
__name(bindV4, "bindV4");
var decimalToHex;
var init_v4 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/uuid/v4.js"() {
    init_functionsRoutes_0_9440137819328775();
    decimalToHex = Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
    __name2(bindV4, "bindV4");
  }
});
var expectNumber;
var MAX_FLOAT;
var expectFloat32;
var expectLong;
var expectShort;
var expectByte;
var expectSizedInt;
var castInt;
var strictParseFloat32;
var NUMBER_REGEX;
var parseNumber;
var strictParseShort;
var strictParseByte;
var stackTraceWarning;
var logger;
var init_parse_utils = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js"() {
    init_functionsRoutes_0_9440137819328775();
    expectNumber = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
          if (String(parsed) !== String(value)) {
            logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
          }
          return parsed;
        }
      }
      if (typeof value === "number") {
        return value;
      }
      throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
    }, "expectNumber");
    MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
    expectFloat32 = /* @__PURE__ */ __name2((value) => {
      const expected = expectNumber(value);
      if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
          throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
      }
      return expected;
    }, "expectFloat32");
    expectLong = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
      }
      throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
    }, "expectLong");
    expectShort = /* @__PURE__ */ __name2((value) => expectSizedInt(value, 16), "expectShort");
    expectByte = /* @__PURE__ */ __name2((value) => expectSizedInt(value, 8), "expectByte");
    expectSizedInt = /* @__PURE__ */ __name2((value, size) => {
      const expected = expectLong(value);
      if (expected !== void 0 && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
      }
      return expected;
    }, "expectSizedInt");
    castInt = /* @__PURE__ */ __name2((value, size) => {
      switch (size) {
        case 32:
          return Int32Array.of(value)[0];
        case 16:
          return Int16Array.of(value)[0];
        case 8:
          return Int8Array.of(value)[0];
      }
    }, "castInt");
    strictParseFloat32 = /* @__PURE__ */ __name2((value) => {
      if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
      }
      return expectFloat32(value);
    }, "strictParseFloat32");
    NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
    parseNumber = /* @__PURE__ */ __name2((value) => {
      const matches = value.match(NUMBER_REGEX);
      if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
      }
      return parseFloat(value);
    }, "parseNumber");
    strictParseShort = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return expectShort(parseNumber(value));
      }
      return expectShort(value);
    }, "strictParseShort");
    strictParseByte = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return expectByte(parseNumber(value));
      }
      return expectByte(value);
    }, "strictParseByte");
    stackTraceWarning = /* @__PURE__ */ __name2((message) => {
      return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s) => !s.includes("stackTraceWarning")).join("\n");
    }, "stackTraceWarning");
    logger = {
      warn: console.warn
    };
  }
});
function dateToUtcString(date2) {
  const year2 = date2.getUTCFullYear();
  const month = date2.getUTCMonth();
  const dayOfWeek = date2.getUTCDay();
  const dayOfMonthInt = date2.getUTCDate();
  const hoursInt = date2.getUTCHours();
  const minutesInt = date2.getUTCMinutes();
  const secondsInt = date2.getUTCSeconds();
  const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
  const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
  const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
  const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
  return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year2} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
__name(dateToUtcString, "dateToUtcString");
var DAYS;
var MONTHS;
var RFC3339;
var RFC3339_WITH_OFFSET;
var IMF_FIXDATE;
var RFC_850_DATE;
var ASC_TIME;
var parseRfc7231DateTime;
var buildDate;
var parseTwoDigitYear;
var FIFTY_YEARS_IN_MILLIS;
var adjustRfc850Year;
var parseMonthByShortName;
var DAYS_IN_MONTH;
var validateDayOfMonth;
var isLeapYear;
var parseDateValue;
var parseMilliseconds;
var stripLeadingZeroes;
var init_date_utils = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_parse_utils();
    DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    __name2(dateToUtcString, "dateToUtcString");
    RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
    RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
    IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
    RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
    ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
    parseRfc7231DateTime = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
      }
      let match2 = IMF_FIXDATE.exec(value);
      if (match2) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match2;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
      }
      match2 = RFC_850_DATE.exec(value);
      if (match2) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match2;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
          hours,
          minutes,
          seconds,
          fractionalMilliseconds
        }));
      }
      match2 = ASC_TIME.exec(value);
      if (match2) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match2;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
      }
      throw new TypeError("Invalid RFC-7231 date-time value");
    }, "parseRfc7231DateTime");
    buildDate = /* @__PURE__ */ __name2((year2, month, day, time2) => {
      const adjustedMonth = month - 1;
      validateDayOfMonth(year2, adjustedMonth, day);
      return new Date(Date.UTC(year2, adjustedMonth, day, parseDateValue(time2.hours, "hour", 0, 23), parseDateValue(time2.minutes, "minute", 0, 59), parseDateValue(time2.seconds, "seconds", 0, 60), parseMilliseconds(time2.fractionalMilliseconds)));
    }, "buildDate");
    parseTwoDigitYear = /* @__PURE__ */ __name2((value) => {
      const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
      const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
      if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
      }
      return valueInThisCentury;
    }, "parseTwoDigitYear");
    FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
    adjustRfc850Year = /* @__PURE__ */ __name2((input) => {
      if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
      }
      return input;
    }, "adjustRfc850Year");
    parseMonthByShortName = /* @__PURE__ */ __name2((value) => {
      const monthIdx = MONTHS.indexOf(value);
      if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
      }
      return monthIdx + 1;
    }, "parseMonthByShortName");
    DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    validateDayOfMonth = /* @__PURE__ */ __name2((year2, month, day) => {
      let maxDays = DAYS_IN_MONTH[month];
      if (month === 1 && isLeapYear(year2)) {
        maxDays = 29;
      }
      if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year2}: ${day}`);
      }
    }, "validateDayOfMonth");
    isLeapYear = /* @__PURE__ */ __name2((year2) => {
      return year2 % 4 === 0 && (year2 % 100 !== 0 || year2 % 400 === 0);
    }, "isLeapYear");
    parseDateValue = /* @__PURE__ */ __name2((value, type, lower, upper) => {
      const dateVal = strictParseByte(stripLeadingZeroes(value));
      if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
      }
      return dateVal;
    }, "parseDateValue");
    parseMilliseconds = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return 0;
      }
      return strictParseFloat32("0." + value) * 1e3;
    }, "parseMilliseconds");
    stripLeadingZeroes = /* @__PURE__ */ __name2((value) => {
      let idx = 0;
      while (idx < value.length - 1 && value.charAt(idx) === "0") {
        idx++;
      }
      if (idx === 0) {
        return value;
      }
      return value.slice(idx);
    }, "stripLeadingZeroes");
  }
});
var LazyJsonString;
var init_lazy_json = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/lazy-json.js"() {
    init_functionsRoutes_0_9440137819328775();
    LazyJsonString = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function LazyJsonString2(val) {
      const str = Object.assign(new String(val), {
        deserializeJSON() {
          return JSON.parse(String(val));
        },
        toString() {
          return String(val);
        },
        toJSON() {
          return String(val);
        }
      });
      return str;
    }, "LazyJsonString2"), "LazyJsonString");
    LazyJsonString.from = (object) => {
      if (object && typeof object === "object" && (object instanceof LazyJsonString || "deserializeJSON" in object)) {
        return object;
      } else if (typeof object === "string" || Object.getPrototypeOf(object) === String.prototype) {
        return LazyJsonString(String(object));
      }
      return LazyJsonString(JSON.stringify(object));
    };
    LazyJsonString.fromObject = LazyJsonString.from;
  }
});
function range(v, min, max) {
  const _v = Number(v);
  if (_v < min || _v > max) {
    throw new Error(`Value ${_v} out of range [${min}, ${max}]`);
  }
}
__name(range, "range");
var ddd;
var mmm;
var time;
var date;
var year;
var RFC3339_WITH_OFFSET2;
var IMF_FIXDATE2;
var RFC_850_DATE2;
var ASC_TIME2;
var months;
var _parseEpochTimestamp;
var _parseRfc3339DateTimeWithOffset;
var _parseRfc7231DateTime;
var init_schema_date_utils = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/schema-serde-lib/schema-date-utils.js"() {
    init_functionsRoutes_0_9440137819328775();
    ddd = `(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?`;
    mmm = `(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
    time = `(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?`;
    date = `(\\d?\\d)`;
    year = `(\\d{4})`;
    RFC3339_WITH_OFFSET2 = new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/);
    IMF_FIXDATE2 = new RegExp(`^${ddd}, ${date} ${mmm} ${year} ${time} GMT$`);
    RFC_850_DATE2 = new RegExp(`^${ddd}, ${date}-${mmm}-(\\d\\d) ${time} GMT$`);
    ASC_TIME2 = new RegExp(`^${ddd} ${mmm} ( [1-9]|\\d\\d) ${time} ${year}$`);
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    _parseEpochTimestamp = /* @__PURE__ */ __name2((value) => {
      if (value == null) {
        return void 0;
      }
      let num = NaN;
      if (typeof value === "number") {
        num = value;
      } else if (typeof value === "string") {
        if (!/^-?\d*\.?\d+$/.test(value)) {
          throw new TypeError(`parseEpochTimestamp - numeric string invalid.`);
        }
        num = Number.parseFloat(value);
      } else if (typeof value === "object" && value.tag === 1) {
        num = value.value;
      }
      if (isNaN(num) || Math.abs(num) === Infinity) {
        throw new TypeError("Epoch timestamps must be valid finite numbers.");
      }
      return new Date(Math.round(num * 1e3));
    }, "_parseEpochTimestamp");
    _parseRfc3339DateTimeWithOffset = /* @__PURE__ */ __name2((value) => {
      if (value == null) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC3339 timestamps must be strings");
      }
      const matches = RFC3339_WITH_OFFSET2.exec(value);
      if (!matches) {
        throw new TypeError(`Invalid RFC3339 timestamp format ${value}`);
      }
      const [, yearStr, monthStr, dayStr, hours, minutes, seconds, , ms, offsetStr] = matches;
      range(monthStr, 1, 12);
      range(dayStr, 1, 31);
      range(hours, 0, 23);
      range(minutes, 0, 59);
      range(seconds, 0, 60);
      const date2 = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr), Number(hours), Number(minutes), Number(seconds), Number(ms) ? Math.round(parseFloat(`0.${ms}`) * 1e3) : 0));
      date2.setUTCFullYear(Number(yearStr));
      if (offsetStr.toUpperCase() != "Z") {
        const [, sign, offsetH, offsetM] = /([+-])(\d\d):(\d\d)/.exec(offsetStr) || [void 0, "+", 0, 0];
        const scalar = sign === "-" ? 1 : -1;
        date2.setTime(date2.getTime() + scalar * (Number(offsetH) * 60 * 60 * 1e3 + Number(offsetM) * 60 * 1e3));
      }
      return date2;
    }, "_parseRfc3339DateTimeWithOffset");
    _parseRfc7231DateTime = /* @__PURE__ */ __name2((value) => {
      if (value == null) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC7231 timestamps must be strings.");
      }
      let day;
      let month;
      let year2;
      let hour;
      let minute;
      let second;
      let fraction;
      let matches;
      if (matches = IMF_FIXDATE2.exec(value)) {
        [, day, month, year2, hour, minute, second, fraction] = matches;
      } else if (matches = RFC_850_DATE2.exec(value)) {
        [, day, month, year2, hour, minute, second, fraction] = matches;
        year2 = (Number(year2) + 1900).toString();
      } else if (matches = ASC_TIME2.exec(value)) {
        [, month, day, hour, minute, second, fraction, year2] = matches;
      }
      if (year2 && second) {
        const timestamp = Date.UTC(Number(year2), months.indexOf(month), Number(day), Number(hour), Number(minute), Number(second), fraction ? Math.round(parseFloat(`0.${fraction}`) * 1e3) : 0);
        range(day, 1, 31);
        range(hour, 0, 23);
        range(minute, 0, 59);
        range(second, 0, 60);
        const date2 = new Date(timestamp);
        date2.setUTCFullYear(Number(year2));
        return date2;
      }
      throw new TypeError(`Invalid RFC7231 date-time value ${value}.`);
    }, "_parseRfc7231DateTime");
    __name2(range, "range");
  }
});
var splitHeader;
var init_split_header = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/split-header.js"() {
    init_functionsRoutes_0_9440137819328775();
    splitHeader = /* @__PURE__ */ __name2((value) => {
      const z = value.length;
      const values = [];
      let withinQuotes = false;
      let prevChar = void 0;
      let anchor = 0;
      for (let i2 = 0; i2 < z; ++i2) {
        const char = value[i2];
        switch (char) {
          case `"`:
            if (prevChar !== "\\") {
              withinQuotes = !withinQuotes;
            }
            break;
          case ",":
            if (!withinQuotes) {
              values.push(value.slice(anchor, i2));
              anchor = i2 + 1;
            }
            break;
          default:
        }
        prevChar = char;
      }
      values.push(value.slice(anchor));
      return values.map((v) => {
        v = v.trim();
        const z2 = v.length;
        if (z2 < 2) {
          return v;
        }
        if (v[0] === `"` && v[z2 - 1] === `"`) {
          v = v.slice(1, z2 - 1);
        }
        return v.replace(/\\"/g, '"');
      });
    }, "splitHeader");
  }
});
var format;
var NumericValue;
var init_NumericValue = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/value/NumericValue.js"() {
    init_functionsRoutes_0_9440137819328775();
    format = /^-?\d*(\.\d+)?$/;
    NumericValue = class _NumericValue {
      static {
        __name(this, "_NumericValue");
      }
      static {
        __name2(this, "NumericValue");
      }
      string;
      type;
      constructor(string, type) {
        this.string = string;
        this.type = type;
        if (!format.test(string)) {
          throw new Error(`@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".`);
        }
      }
      toString() {
        return this.string;
      }
      static [Symbol.hasInstance](object) {
        if (!object || typeof object !== "object") {
          return false;
        }
        const _nv = object;
        return _NumericValue.prototype.isPrototypeOf(object) || _nv.type === "bigDecimal" && format.test(_nv.string);
      }
    };
  }
});
function fromHex(encoded) {
  if (encoded.length % 2 !== 0) {
    throw new Error("Hex encoded strings must have an even number length");
  }
  const out = new Uint8Array(encoded.length / 2);
  for (let i2 = 0; i2 < encoded.length; i2 += 2) {
    const encodedByte = encoded.slice(i2, i2 + 2).toLowerCase();
    if (encodedByte in HEX_TO_SHORT) {
      out[i2 / 2] = HEX_TO_SHORT[encodedByte];
    } else {
      throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
    }
  }
  return out;
}
__name(fromHex, "fromHex");
function toHex(bytes) {
  let out = "";
  for (let i2 = 0; i2 < bytes.byteLength; i2++) {
    out += SHORT_TO_HEX[bytes[i2]];
  }
  return out;
}
__name(toHex, "toHex");
var SHORT_TO_HEX;
var HEX_TO_SHORT;
var init_hex_encoding = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-hex-encoding/hex-encoding.js"() {
    init_functionsRoutes_0_9440137819328775();
    SHORT_TO_HEX = {};
    HEX_TO_SHORT = {};
    for (let i2 = 0; i2 < 256; i2++) {
      let encodedByte = i2.toString(16).toLowerCase();
      if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
      }
      SHORT_TO_HEX[i2] = encodedByte;
      HEX_TO_SHORT[encodedByte] = i2;
    }
    __name2(fromHex, "fromHex");
    __name2(toHex, "toHex");
  }
});
var TEXT_ENCODER;
var calculateBodyLength;
var init_calculateBodyLength_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-body-length/calculateBodyLength.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    TEXT_ENCODER = typeof TextEncoder == "function" ? new TextEncoder() : null;
    calculateBodyLength = /* @__PURE__ */ __name2((body) => {
      if (typeof body === "string") {
        if (TEXT_ENCODER) {
          return TEXT_ENCODER.encode(body).byteLength;
        }
        let len = body.length;
        for (let i2 = len - 1; i2 >= 0; i2--) {
          const code = body.charCodeAt(i2);
          if (code > 127 && code <= 2047)
            len++;
          else if (code > 2047 && code <= 65535)
            len += 2;
          if (code >= 56320 && code <= 57343)
            i2--;
        }
        return len;
      } else if (typeof body.byteLength === "number") {
        return body.byteLength;
      } else if (typeof body.size === "number") {
        return body.size;
      }
      throw new Error(`Body Length computation failed for ${body}`);
    }, "calculateBodyLength");
  }
});
var toUint8Array;
var init_toUint8Array_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/toUint8Array.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_fromUtf8_browser();
    toUint8Array = /* @__PURE__ */ __name2((data) => {
      if (typeof data === "string") {
        return fromUtf8(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    }, "toUint8Array");
  }
});
var isArrayBuffer;
var init_is_array_buffer = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/is-array-buffer/is-array-buffer.js"() {
    init_functionsRoutes_0_9440137819328775();
    isArrayBuffer = /* @__PURE__ */ __name2((arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]", "isArrayBuffer");
  }
});
var getEndpointFromConfig;
var init_getEndpointFromConfig_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/getEndpointFromConfig.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    getEndpointFromConfig = /* @__PURE__ */ __name2(async (serviceId) => void 0, "getEndpointFromConfig");
  }
});
var resolveParamsForS3;
var DOMAIN_PATTERN;
var IP_ADDRESS_PATTERN;
var DOTS_PATTERN;
var isDnsCompatibleBucketName;
var isArnBucketName;
var init_s3 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/service-customizations/s3.js"() {
    init_functionsRoutes_0_9440137819328775();
    resolveParamsForS3 = /* @__PURE__ */ __name2(async (endpointParams) => {
      const bucket = endpointParams?.Bucket || "";
      if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
      }
      if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
          throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
      } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
      }
      if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
      }
      return endpointParams;
    }, "resolveParamsForS3");
    DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
    IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
    DOTS_PATTERN = /\.\./;
    isDnsCompatibleBucketName = /* @__PURE__ */ __name2((bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName), "isDnsCompatibleBucketName");
    isArnBucketName = /* @__PURE__ */ __name2((bucketName) => {
      const [arn, partition2, service, , , bucket] = bucketName.split(":");
      const isArn = arn === "arn" && bucketName.split(":").length >= 6;
      const isValidArn = Boolean(isArn && partition2 && service && bucket);
      if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
      }
      return isValidArn;
    }, "isArnBucketName");
  }
});
var init_service_customizations = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/service-customizations/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_s3();
  }
});
var createConfigValueProvider;
var init_createConfigValueProvider = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/createConfigValueProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
    createConfigValueProvider = /* @__PURE__ */ __name2((configKey, canonicalEndpointParamKey, config, isClientContextParam = false) => {
      const configProvider = /* @__PURE__ */ __name2(async () => {
        let configValue;
        if (isClientContextParam) {
          const clientContextParams = config.clientContextParams;
          const nestedValue = clientContextParams?.[configKey];
          configValue = nestedValue ?? config[configKey] ?? config[canonicalEndpointParamKey];
        } else {
          configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        }
        if (typeof configValue === "function") {
          return configValue();
        }
        return configValue;
      }, "configProvider");
      if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
          return configValue;
        };
      }
      if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = credentials?.accountId ?? credentials?.AccountId;
          return configValue;
        };
      }
      if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async () => {
          if (config.isCustomEndpoint === false) {
            return void 0;
          }
          const endpoint = await configProvider();
          if (endpoint && typeof endpoint === "object") {
            if ("url" in endpoint) {
              return endpoint.url.href;
            }
            if ("hostname" in endpoint) {
              const { protocol, hostname, port, path } = endpoint;
              return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
            }
          }
          return endpoint;
        };
      }
      return configProvider;
    }, "createConfigValueProvider");
  }
});
var init_toEndpointV12 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/toEndpointV1.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
  }
});
function bindGetEndpointFromInstructions(getEndpointFromConfig2) {
  return async (commandInput, instructionsSupplier, clientConfig, context) => {
    if (!clientConfig.isCustomEndpoint) {
      let endpointFromConfig;
      if (clientConfig.serviceConfiguredEndpoint) {
        endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
      } else {
        endpointFromConfig = await getEndpointFromConfig2(clientConfig.serviceId);
      }
      if (endpointFromConfig) {
        clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
        clientConfig.isCustomEndpoint = true;
      }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
      throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    if (clientConfig.isCustomEndpoint && clientConfig.endpoint) {
      const customEndpoint = await clientConfig.endpoint();
      if (customEndpoint?.headers) {
        endpoint.headers ??= {};
        for (const [name, value] of Object.entries(customEndpoint.headers)) {
          endpoint.headers[name] = Array.isArray(value) ? value : [value];
        }
      }
    }
    return endpoint;
  };
}
__name(bindGetEndpointFromInstructions, "bindGetEndpointFromInstructions");
var resolveParams;
var init_getEndpointFromInstructions = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/getEndpointFromInstructions.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_service_customizations();
    init_createConfigValueProvider();
    init_toEndpointV12();
    __name2(bindGetEndpointFromInstructions, "bindGetEndpointFromInstructions");
    resolveParams = /* @__PURE__ */ __name2(async (commandInput, instructionsSupplier, clientConfig) => {
      const endpointParams = {};
      const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
      for (const [name, instruction] of Object.entries(instructions)) {
        switch (instruction.type) {
          case "staticContextParams":
            endpointParams[name] = instruction.value;
            break;
          case "contextParams":
            endpointParams[name] = commandInput[instruction.name];
            break;
          case "clientContextParams":
          case "builtInParams":
            endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig, instruction.type !== "builtInParams")();
            break;
          case "operationContextParams":
            endpointParams[name] = instruction.get(commandInput);
            break;
          default:
            throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
      }
      if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
      }
      if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await resolveParamsForS3(endpointParams);
      }
      return endpointParams;
    }, "resolveParams");
  }
});
function setFeature(context, feature, value) {
  if (!context.__smithy_context) {
    context.__smithy_context = { features: {} };
  } else if (!context.__smithy_context.features) {
    context.__smithy_context.features = {};
  }
  context.__smithy_context.features[feature] = value;
}
__name(setFeature, "setFeature");
function bindEndpointMiddleware(getEndpointFromConfig2) {
  const getEndpointFromInstructions2 = bindGetEndpointFromInstructions(getEndpointFromConfig2);
  return ({ config, instructions }) => {
    return (next, context) => async (args) => {
      if (config.isCustomEndpoint) {
        setFeature(context, "ENDPOINT_OVERRIDE", "N");
      }
      const endpoint = await getEndpointFromInstructions2(args.input, {
        getEndpointParameterInstructions() {
          return instructions;
        }
      }, { ...config }, context);
      context.endpointV2 = endpoint;
      context.authSchemes = endpoint.properties?.authSchemes;
      const authScheme = context.authSchemes?.[0];
      if (authScheme) {
        context["signing_region"] = authScheme.signingRegion;
        context["signing_service"] = authScheme.signingName;
        const smithyContext = getSmithyContext(context);
        const httpAuthOption = smithyContext?.selectedHttpAuthScheme?.httpAuthOption;
        if (httpAuthOption) {
          httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
            signing_region: authScheme.signingRegion,
            signingRegion: authScheme.signingRegion,
            signing_service: authScheme.signingName,
            signingName: authScheme.signingName,
            signingRegionSet: authScheme.signingRegionSet
          }, authScheme.properties);
        }
      }
      return next({
        ...args
      });
    };
  };
}
__name(bindEndpointMiddleware, "bindEndpointMiddleware");
var init_endpointMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/endpointMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    init_getEndpointFromInstructions();
    __name2(setFeature, "setFeature");
    __name2(bindEndpointMiddleware, "bindEndpointMiddleware");
  }
});
function bindGetEndpointPlugin(getEndpointFromConfig2) {
  const endpointMiddleware2 = bindEndpointMiddleware(getEndpointFromConfig2);
  return (config, instructions) => ({
    applyToStack: /* @__PURE__ */ __name2((clientStack) => {
      clientStack.addRelativeTo(endpointMiddleware2({
        config,
        instructions
      }), endpointMiddlewareOptions);
    }, "applyToStack")
  });
}
__name(bindGetEndpointPlugin, "bindGetEndpointPlugin");
var serializerMiddlewareOption2;
var endpointMiddlewareOptions;
var init_getEndpointPlugin = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/getEndpointPlugin.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_endpointMiddleware();
    serializerMiddlewareOption2 = {
      name: "serializerMiddleware",
      step: "serialize",
      tags: ["SERIALIZER"],
      override: true
    };
    endpointMiddlewareOptions = {
      step: "serialize",
      tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
      name: "endpointV2Middleware",
      override: true,
      relation: "before",
      toMiddleware: serializerMiddlewareOption2.name
    };
    __name2(bindGetEndpointPlugin, "bindGetEndpointPlugin");
  }
});
function bindResolveEndpointConfig(getEndpointFromConfig2) {
  return (input) => {
    const tls = input.tls ?? true;
    const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
    const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await normalizeProvider(endpoint)()) : void 0;
    const isCustomEndpoint = !!endpoint;
    const resolvedConfig = Object.assign(input, {
      endpoint: customEndpointProvider,
      tls,
      isCustomEndpoint,
      useDualstackEndpoint: normalizeProvider(useDualstackEndpoint ?? false),
      useFipsEndpoint: normalizeProvider(useFipsEndpoint ?? false)
    });
    let configuredEndpointPromise = void 0;
    resolvedConfig.serviceConfiguredEndpoint = async () => {
      if (input.serviceId && !configuredEndpointPromise) {
        configuredEndpointPromise = getEndpointFromConfig2(input.serviceId);
      }
      return configuredEndpointPromise;
    };
    return resolvedConfig;
  };
}
__name(bindResolveEndpointConfig, "bindResolveEndpointConfig");
var init_resolveEndpointConfig = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/resolveEndpointConfig.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    init_toEndpointV12();
    __name2(bindResolveEndpointConfig, "bindResolveEndpointConfig");
  }
});
var BinaryDecisionDiagram;
var init_BinaryDecisionDiagram = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/bdd/BinaryDecisionDiagram.js"() {
    init_functionsRoutes_0_9440137819328775();
    BinaryDecisionDiagram = class _BinaryDecisionDiagram {
      static {
        __name(this, "_BinaryDecisionDiagram");
      }
      static {
        __name2(this, "BinaryDecisionDiagram");
      }
      nodes;
      root;
      conditions;
      results;
      constructor(bdd2, root2, conditions, results) {
        this.nodes = bdd2;
        this.root = root2;
        this.conditions = conditions;
        this.results = results;
      }
      static from(bdd2, root2, conditions, results) {
        return new _BinaryDecisionDiagram(bdd2, root2, conditions, results);
      }
    };
  }
});
var EndpointCache;
var init_EndpointCache = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/cache/EndpointCache.js"() {
    init_functionsRoutes_0_9440137819328775();
    EndpointCache = class {
      static {
        __name(this, "EndpointCache");
      }
      static {
        __name2(this, "EndpointCache");
      }
      capacity;
      data = /* @__PURE__ */ new Map();
      parameters = [];
      constructor({ size, params }) {
        this.capacity = size ?? 50;
        if (params) {
          this.parameters = params;
        }
      }
      get(endpointParams, resolver) {
        const key = this.hash(endpointParams);
        if (key === false) {
          return resolver();
        }
        if (!this.data.has(key)) {
          if (this.data.size > this.capacity + 10) {
            const keys = this.data.keys();
            let i2 = 0;
            while (true) {
              const { value, done } = keys.next();
              this.data.delete(value);
              if (done || ++i2 > 10) {
                break;
              }
            }
          }
          this.data.set(key, resolver());
        }
        return this.data.get(key);
      }
      size() {
        return this.data.size;
      }
      hash(endpointParams) {
        let buffer = "";
        const { parameters } = this;
        if (parameters.length === 0) {
          return false;
        }
        for (const param of parameters) {
          const val = String(endpointParams[param] ?? "");
          if (val.includes("|;")) {
            return false;
          }
          buffer += val + "|;";
        }
        return buffer;
      }
    };
  }
});
var EndpointError;
var init_EndpointError = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/EndpointError.js"() {
    init_functionsRoutes_0_9440137819328775();
    EndpointError = class extends Error {
      static {
        __name(this, "EndpointError");
      }
      static {
        __name2(this, "EndpointError");
      }
      constructor(message) {
        super(message);
        this.name = "EndpointError";
      }
    };
  }
});
var init_EndpointFunctions = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/EndpointFunctions.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_EndpointRuleObject2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/EndpointRuleObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_ErrorRuleObject2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/ErrorRuleObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_RuleSetObject2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/RuleSetObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_TreeRuleObject2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/TreeRuleObject.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_shared2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/shared.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_types = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_EndpointError();
    init_EndpointFunctions();
    init_EndpointRuleObject2();
    init_ErrorRuleObject2();
    init_RuleSetObject2();
    init_TreeRuleObject2();
    init_shared2();
  }
});
var debugId;
var init_debugId = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/debugId.js"() {
    init_functionsRoutes_0_9440137819328775();
    debugId = "endpoints";
  }
});
function toDebugString(input) {
  if (typeof input !== "object" || input == null) {
    return input;
  }
  if ("ref" in input) {
    return `$${toDebugString(input.ref)}`;
  }
  if ("fn" in input) {
    return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
  }
  return JSON.stringify(input, null, 2);
}
__name(toDebugString, "toDebugString");
var init_toDebugString = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/toDebugString.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(toDebugString, "toDebugString");
  }
});
var init_debug = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_debugId();
    init_toDebugString();
  }
});
var customEndpointFunctions;
var init_customEndpointFunctions = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/customEndpointFunctions.js"() {
    init_functionsRoutes_0_9440137819328775();
    customEndpointFunctions = {};
  }
});
var booleanEquals;
var init_booleanEquals = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/booleanEquals.js"() {
    init_functionsRoutes_0_9440137819328775();
    booleanEquals = /* @__PURE__ */ __name2((value1, value2) => value1 === value2, "booleanEquals");
  }
});
function coalesce(...args) {
  for (const arg of args) {
    if (arg != null) {
      return arg;
    }
  }
  return void 0;
}
__name(coalesce, "coalesce");
var init_coalesce = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/coalesce.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(coalesce, "coalesce");
  }
});
var getAttrPathList;
var init_getAttrPathList = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/getAttrPathList.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    getAttrPathList = /* @__PURE__ */ __name2((path) => {
      const parts = path.split(".");
      const pathList = [];
      for (const part of parts) {
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
          if (part.indexOf("]") !== part.length - 1) {
            throw new EndpointError(`Path: '${path}' does not end with ']'`);
          }
          const arrayIndex = part.slice(squareBracketIndex + 1, -1);
          if (Number.isNaN(parseInt(arrayIndex))) {
            throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
          }
          if (squareBracketIndex !== 0) {
            pathList.push(part.slice(0, squareBracketIndex));
          }
          pathList.push(arrayIndex);
        } else {
          pathList.push(part);
        }
      }
      return pathList;
    }, "getAttrPathList");
  }
});
var getAttr;
var init_getAttr = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/getAttr.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    init_getAttrPathList();
    getAttr = /* @__PURE__ */ __name2((value, path) => getAttrPathList(path).reduce((acc, index) => {
      if (typeof acc !== "object") {
        throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
      } else if (Array.isArray(acc)) {
        const i2 = parseInt(index);
        return acc[i2 < 0 ? acc.length + i2 : i2];
      }
      return acc[index];
    }, value), "getAttr");
  }
});
var isSet;
var init_isSet = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/isSet.js"() {
    init_functionsRoutes_0_9440137819328775();
    isSet = /* @__PURE__ */ __name2((value) => value != null, "isSet");
  }
});
function ite(condition, trueValue, falseValue) {
  return condition ? trueValue : falseValue;
}
__name(ite, "ite");
var init_ite = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/ite.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(ite, "ite");
  }
});
var not;
var init_not = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/not.js"() {
    init_functionsRoutes_0_9440137819328775();
    not = /* @__PURE__ */ __name2((value) => !value, "not");
  }
});
var IP_V4_REGEX;
var isIpAddress;
var init_isIpAddress = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/isIpAddress.js"() {
    init_functionsRoutes_0_9440137819328775();
    IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
    isIpAddress = /* @__PURE__ */ __name2((value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]"), "isIpAddress");
  }
});
var DEFAULT_PORTS;
var parseURL;
var init_parseURL = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/parseURL.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es();
    init_isIpAddress();
    DEFAULT_PORTS = {
      [EndpointURLScheme.HTTP]: 80,
      [EndpointURLScheme.HTTPS]: 443
    };
    parseURL = /* @__PURE__ */ __name2((value) => {
      const whatwgURL = (() => {
        try {
          if (value instanceof URL) {
            return value;
          }
          if (typeof value === "object" && "hostname" in value) {
            const { hostname: hostname2, port, protocol: protocol2 = "", path = "", query = {} } = value;
            const url = new URL(`${protocol2}//${hostname2}${port ? `:${port}` : ""}${path}`);
            url.search = Object.entries(query).map(([k2, v]) => `${k2}=${v}`).join("&");
            return url;
          }
          return new URL(value);
        } catch (error) {
          return null;
        }
      })();
      if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
      }
      const urlString = whatwgURL.href;
      const { host, hostname, pathname, protocol, search } = whatwgURL;
      if (search) {
        return null;
      }
      const scheme = protocol.slice(0, -1);
      if (!Object.values(EndpointURLScheme).includes(scheme)) {
        return null;
      }
      const isIp = isIpAddress(hostname);
      const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
      const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
      return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp
      };
    }, "parseURL");
  }
});
function split(value, delimiter, limit) {
  if (limit === 1) {
    return [value];
  }
  if (value === "") {
    return [""];
  }
  const parts = value.split(delimiter);
  if (limit === 0) {
    return parts;
  }
  return parts.slice(0, limit - 1).concat(parts.slice(1).join(delimiter));
}
__name(split, "split");
var init_split = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/split.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(split, "split");
  }
});
var stringEquals;
var init_stringEquals = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/stringEquals.js"() {
    init_functionsRoutes_0_9440137819328775();
    stringEquals = /* @__PURE__ */ __name2((value1, value2) => value1 === value2, "stringEquals");
  }
});
var substring;
var init_substring = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/substring.js"() {
    init_functionsRoutes_0_9440137819328775();
    substring = /* @__PURE__ */ __name2((input, start, stop, reverse) => {
      if (input == null || start >= stop || input.length < stop || /[^\u0000-\u007f]/.test(input)) {
        return null;
      }
      if (!reverse) {
        return input.substring(start, stop);
      }
      return input.substring(input.length - stop, input.length - start);
    }, "substring");
  }
});
var uriEncode;
var init_uriEncode = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/uriEncode.js"() {
    init_functionsRoutes_0_9440137819328775();
    uriEncode = /* @__PURE__ */ __name2((value) => encodeURIComponent(value).replace(/[!*'()]/g, (c2) => `%${c2.charCodeAt(0).toString(16).toUpperCase()}`), "uriEncode");
  }
});
var init_lib = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_booleanEquals();
    init_coalesce();
    init_getAttr();
    init_isSet();
    init_transport();
    init_ite();
    init_not();
    init_parseURL();
    init_split();
    init_stringEquals();
    init_substring();
    init_uriEncode();
  }
});
var endpointFunctions;
var init_endpointFunctions = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/endpointFunctions.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_lib();
    endpointFunctions = {
      booleanEquals,
      coalesce,
      getAttr,
      isSet,
      isValidHostLabel,
      ite,
      not,
      parseURL,
      split,
      stringEquals,
      substring,
      uriEncode
    };
  }
});
var evaluateTemplate;
var init_evaluateTemplate = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateTemplate.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_lib();
    evaluateTemplate = /* @__PURE__ */ __name2((template, options) => {
      const evaluatedTemplateArr = [];
      const { referenceRecord, endpointParams } = options;
      let currentIndex = 0;
      while (currentIndex < template.length) {
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(currentIndex));
          break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex));
          break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
          currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
          const [refName, attrName] = parameterName.split("#");
          evaluatedTemplateArr.push(getAttr(referenceRecord[refName] ?? endpointParams[refName], attrName));
        } else {
          evaluatedTemplateArr.push(referenceRecord[parameterName] ?? endpointParams[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
      }
      return evaluatedTemplateArr.join("");
    }, "evaluateTemplate");
  }
});
var getReferenceValue;
var init_getReferenceValue = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getReferenceValue.js"() {
    init_functionsRoutes_0_9440137819328775();
    getReferenceValue = /* @__PURE__ */ __name2(({ ref }, options) => {
      return options.referenceRecord[ref] ?? options.endpointParams[ref];
    }, "getReferenceValue");
  }
});
var evaluateExpression;
var callFunction;
var group;
var init_evaluateExpression = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateExpression.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    init_customEndpointFunctions();
    init_endpointFunctions();
    init_evaluateTemplate();
    init_getReferenceValue();
    evaluateExpression = /* @__PURE__ */ __name2((obj, keyName, options) => {
      if (typeof obj === "string") {
        return evaluateTemplate(obj, options);
      } else if (obj["fn"]) {
        return group.callFunction(obj, options);
      } else if (obj["ref"]) {
        return getReferenceValue(obj, options);
      }
      throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
    }, "evaluateExpression");
    callFunction = /* @__PURE__ */ __name2(({ fn, argv }, options) => {
      const evaluatedArgs = Array(argv.length);
      for (let i2 = 0; i2 < evaluatedArgs.length; ++i2) {
        const arg = argv[i2];
        if (typeof arg === "boolean" || typeof arg === "number") {
          evaluatedArgs[i2] = arg;
        } else {
          evaluatedArgs[i2] = group.evaluateExpression(arg, "arg", options);
        }
      }
      const namespaceSeparatorIndex = fn.indexOf(".");
      if (namespaceSeparatorIndex !== -1) {
        const namespaceFunctions = customEndpointFunctions[fn.slice(0, namespaceSeparatorIndex)];
        const customFunction = namespaceFunctions?.[fn.slice(namespaceSeparatorIndex + 1)];
        if (typeof customFunction === "function") {
          return customFunction(...evaluatedArgs);
        }
      }
      const callable = endpointFunctions[fn];
      if (typeof callable === "function") {
        return callable(...evaluatedArgs);
      }
      throw new Error(`function ${fn} not loaded in endpointFunctions.`);
    }, "callFunction");
    group = {
      evaluateExpression,
      callFunction
    };
  }
});
var init_callFunction = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/callFunction.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_evaluateExpression();
  }
});
var evaluateCondition;
var init_evaluateCondition = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateCondition.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_debug();
    init_types();
    init_callFunction();
    evaluateCondition = /* @__PURE__ */ __name2((condition, options) => {
      const { assign } = condition;
      if (assign && assign in options.referenceRecord) {
        throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
      }
      const value = callFunction(condition, options);
      options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(condition)} = ${toDebugString(value)}`);
      const result = value === "" ? true : !!value;
      if (assign != null) {
        return { result, toAssign: { name: assign, value } };
      }
      return { result };
    }, "evaluateCondition");
  }
});
var getEndpointHeaders;
var init_getEndpointHeaders = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointHeaders.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    init_evaluateExpression();
    getEndpointHeaders = /* @__PURE__ */ __name2((headers, options) => Object.entries(headers ?? {}).reduce((acc, [headerKey, headerVal]) => {
      acc[headerKey] = headerVal.map((headerValEntry) => {
        const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
        if (typeof processedExpr !== "string") {
          throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
        }
        return processedExpr;
      });
      return acc;
    }, {}), "getEndpointHeaders");
  }
});
var getEndpointProperties;
var getEndpointProperty;
var group2;
var init_getEndpointProperties = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointProperties.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    init_evaluateTemplate();
    getEndpointProperties = /* @__PURE__ */ __name2((properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => {
      acc[propertyKey] = group2.getEndpointProperty(propertyVal, options);
      return acc;
    }, {}), "getEndpointProperties");
    getEndpointProperty = /* @__PURE__ */ __name2((property, options) => {
      if (Array.isArray(property)) {
        return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
      }
      switch (typeof property) {
        case "string":
          return evaluateTemplate(property, options);
        case "object":
          if (property === null) {
            throw new EndpointError(`Unexpected endpoint property: ${property}`);
          }
          return group2.getEndpointProperties(property, options);
        case "boolean":
          return property;
        default:
          throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
      }
    }, "getEndpointProperty");
    group2 = {
      getEndpointProperty,
      getEndpointProperties
    };
  }
});
var getEndpointUrl;
var init_getEndpointUrl = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointUrl.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    init_evaluateExpression();
    getEndpointUrl = /* @__PURE__ */ __name2((endpointUrl, options) => {
      const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
      if (typeof expression === "string") {
        try {
          return new URL(expression);
        } catch (error) {
          console.error(`Failed to construct URL with ${expression}`, error);
          throw error;
        }
      }
      throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
    }, "getEndpointUrl");
  }
});
var RESULT;
var decideEndpoint;
var init_decideEndpoint = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/decideEndpoint.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_types();
    init_evaluateCondition();
    init_evaluateExpression();
    init_getEndpointHeaders();
    init_getEndpointProperties();
    init_getEndpointUrl();
    RESULT = 1e8;
    decideEndpoint = /* @__PURE__ */ __name2((bdd2, options) => {
      const { nodes: nodes2, root: root2, results, conditions } = bdd2;
      let ref = root2;
      const referenceRecord = {};
      const closure = {
        referenceRecord,
        endpointParams: options.endpointParams,
        logger: options.logger
      };
      while (ref !== 1 && ref !== -1 && ref < RESULT) {
        const node_i = 3 * (Math.abs(ref) - 1);
        const [condition_i, highRef, lowRef] = [nodes2[node_i], nodes2[node_i + 1], nodes2[node_i + 2]];
        const [fn, argv, assign] = conditions[condition_i];
        const evaluation = evaluateCondition({ fn, assign, argv }, closure);
        if (evaluation.toAssign) {
          const { name, value } = evaluation.toAssign;
          referenceRecord[name] = value;
        }
        ref = ref >= 0 === evaluation.result ? highRef : lowRef;
      }
      if (ref >= RESULT) {
        const result = results[ref - RESULT];
        if (result[0] === -1) {
          const [, errorExpression] = result;
          throw new EndpointError(evaluateExpression(errorExpression, "Error", closure));
        }
        const [url, properties, headers] = result;
        return {
          url: getEndpointUrl(url, closure),
          properties: getEndpointProperties(properties, closure),
          headers: getEndpointHeaders(headers ?? {}, closure)
        };
      }
      throw new EndpointError(`No matching endpoint.`);
    }, "decideEndpoint");
  }
});
var getEndpointFromInstructions;
var resolveEndpointConfig;
var endpointMiddleware;
var getEndpointPlugin;
var init_index_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/endpoints/index.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_getEndpointFromConfig_browser();
    init_getEndpointFromInstructions();
    init_endpointMiddleware();
    init_getEndpointPlugin();
    init_resolveEndpointConfig();
    init_BinaryDecisionDiagram();
    init_EndpointCache();
    init_decideEndpoint();
    init_isIpAddress();
    init_transport();
    init_customEndpointFunctions();
    init_types();
    getEndpointFromInstructions = bindGetEndpointFromInstructions(getEndpointFromConfig);
    resolveEndpointConfig = bindResolveEndpointConfig(getEndpointFromConfig);
    endpointMiddleware = bindEndpointMiddleware(getEndpointFromConfig);
    getEndpointPlugin = bindGetEndpointPlugin(getEndpointFromConfig);
  }
});
var Uint8ArrayBlobAdapter;
var _getRandomValues;
var v4;
var generateIdempotencyToken;
var init_index_browser2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/serde/index.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_fromBase64_browser();
    init_toBase64_browser();
    init_Uint8ArrayBlobAdapter();
    init_fromUtf8_browser();
    init_toUtf8_browser();
    init_v4();
    init_date_utils();
    init_lazy_json();
    init_schema_date_utils();
    init_split_header();
    init_NumericValue();
    init_hex_encoding();
    init_calculateBodyLength_browser();
    init_toUint8Array_browser();
    init_is_array_buffer();
    Uint8ArrayBlobAdapter = class extends bindUint8ArrayBlobAdapter(toUtf8, fromUtf8, toBase64, fromBase64) {
      static {
        __name(this, "Uint8ArrayBlobAdapter");
      }
      static {
        __name2(this, "Uint8ArrayBlobAdapter");
      }
    };
    _getRandomValues = /* @__PURE__ */ __name2((array) => crypto.getRandomValues(array), "_getRandomValues");
    v4 = bindV4(_getRandomValues);
    generateIdempotencyToken = v4;
  }
});
var collectBody;
var init_collect_stream_body = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    collectBody = /* @__PURE__ */ __name2(async (streamBody = new Uint8Array(), context) => {
      if (streamBody instanceof Uint8Array) {
        return Uint8ArrayBlobAdapter.mutate(streamBody);
      }
      if (!streamBody) {
        return Uint8ArrayBlobAdapter.mutate(new Uint8Array());
      }
      const fromContext = context.streamCollector(streamBody);
      return Uint8ArrayBlobAdapter.mutate(await fromContext);
    }, "collectBody");
  }
});
function extendedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c2) {
    return "%" + c2.charCodeAt(0).toString(16).toUpperCase();
  });
}
__name(extendedEncodeURIComponent, "extendedEncodeURIComponent");
var init_extended_encode_uri_component = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(extendedEncodeURIComponent, "extendedEncodeURIComponent");
  }
});
var SerdeContext;
var init_SerdeContext = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/SerdeContext.js"() {
    init_functionsRoutes_0_9440137819328775();
    SerdeContext = class {
      static {
        __name(this, "SerdeContext");
      }
      static {
        __name2(this, "SerdeContext");
      }
      serdeContext;
      setSerdeContext(serdeContext) {
        this.serdeContext = serdeContext;
      }
    };
  }
});
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  __name2(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    __name(fulfilled, "fulfilled");
    __name2(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    __name(rejected, "rejected");
    __name2(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    __name2(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
__name(__awaiter, "__awaiter");
function __generator(thisArg, body) {
  var _ = { label: 0, sent: /* @__PURE__ */ __name2(function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, "sent"), trys: [], ops: [] }, f2, y, t, g2 = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g2.next = verb(0), g2["throw"] = verb(1), g2["return"] = verb(2), typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  __name(verb, "verb");
  __name2(verb, "verb");
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (g2 && (g2 = 0, op[0] && (_ = 0)), _) try {
      if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e2) {
      op = [6, e2];
      y = 0;
    } finally {
      f2 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
  __name(step, "step");
  __name2(step, "step");
}
__name(__generator, "__generator");
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: /* @__PURE__ */ __name2(function() {
      if (o && i2 >= o.length) o = void 0;
      return { value: o && o[i2++], done: !o };
    }, "next")
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
__name(__values, "__values");
var init_tslib_es6 = __esm({
  "../node_modules/tslib/tslib.es6.mjs"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(__awaiter, "__awaiter");
    __name2(__generator, "__generator");
    __name2(__values, "__values");
  }
});
var fromUtf82;
var init_fromUtf8_browser2 = __esm({
  "../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    fromUtf82 = /* @__PURE__ */ __name2((input) => new TextEncoder().encode(input), "fromUtf8");
  }
});
var init_toUint8Array = __esm({
  "../node_modules/@smithy/util-utf8/dist-es/toUint8Array.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_fromUtf8_browser2();
  }
});
var init_toUtf8_browser2 = __esm({
  "../node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_dist_es2 = __esm({
  "../node_modules/@smithy/util-utf8/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_fromUtf8_browser2();
    init_toUint8Array();
    init_toUtf8_browser2();
  }
});
function convertToBuffer(data) {
  if (data instanceof Uint8Array)
    return data;
  if (typeof data === "string") {
    return fromUtf83(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data);
}
__name(convertToBuffer, "convertToBuffer");
var fromUtf83;
var init_convertToBuffer = __esm({
  "../node_modules/@aws-crypto/util/build/module/convertToBuffer.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es2();
    fromUtf83 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
      return Buffer.from(input, "utf8");
    } : fromUtf82;
    __name2(convertToBuffer, "convertToBuffer");
  }
});
function isEmptyData(data) {
  if (typeof data === "string") {
    return data.length === 0;
  }
  return data.byteLength === 0;
}
__name(isEmptyData, "isEmptyData");
var init_isEmptyData = __esm({
  "../node_modules/@aws-crypto/util/build/module/isEmptyData.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(isEmptyData, "isEmptyData");
  }
});
function numToUint8(num) {
  return new Uint8Array([
    (num & 4278190080) >> 24,
    (num & 16711680) >> 16,
    (num & 65280) >> 8,
    num & 255
  ]);
}
__name(numToUint8, "numToUint8");
var init_numToUint8 = __esm({
  "../node_modules/@aws-crypto/util/build/module/numToUint8.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(numToUint8, "numToUint8");
  }
});
function uint32ArrayFrom(a_lookUpTable2) {
  if (!Uint32Array.from) {
    var return_array = new Uint32Array(a_lookUpTable2.length);
    var a_index = 0;
    while (a_index < a_lookUpTable2.length) {
      return_array[a_index] = a_lookUpTable2[a_index];
      a_index += 1;
    }
    return return_array;
  }
  return Uint32Array.from(a_lookUpTable2);
}
__name(uint32ArrayFrom, "uint32ArrayFrom");
var init_uint32ArrayFrom = __esm({
  "../node_modules/@aws-crypto/util/build/module/uint32ArrayFrom.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(uint32ArrayFrom, "uint32ArrayFrom");
  }
});
var init_module = __esm({
  "../node_modules/@aws-crypto/util/build/module/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_convertToBuffer();
    init_isEmptyData();
    init_numToUint8();
    init_uint32ArrayFrom();
  }
});
var AwsCrc32;
var init_aws_crc32 = __esm({
  "../node_modules/@aws-crypto/crc32/build/module/aws_crc32.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_tslib_es6();
    init_module();
    init_module2();
    AwsCrc32 = /** @class */
    (function() {
      function AwsCrc322() {
        this.crc32 = new Crc32();
      }
      __name(AwsCrc322, "AwsCrc322");
      __name2(AwsCrc322, "AwsCrc32");
      AwsCrc322.prototype.update = function(toHash) {
        if (isEmptyData(toHash))
          return;
        this.crc32.update(convertToBuffer(toHash));
      };
      AwsCrc322.prototype.digest = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            return [2, numToUint8(this.crc32.digest())];
          });
        });
      };
      AwsCrc322.prototype.reset = function() {
        this.crc32 = new Crc32();
      };
      return AwsCrc322;
    })();
  }
});
var Crc32;
var a_lookUpTable;
var lookupTable;
var init_module2 = __esm({
  "../node_modules/@aws-crypto/crc32/build/module/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_tslib_es6();
    init_module();
    init_aws_crc32();
    Crc32 = /** @class */
    (function() {
      function Crc322() {
        this.checksum = 4294967295;
      }
      __name(Crc322, "Crc322");
      __name2(Crc322, "Crc32");
      Crc322.prototype.update = function(data) {
        var e_1, _a;
        try {
          for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var byte = data_1_1.value;
            this.checksum = this.checksum >>> 8 ^ lookupTable[(this.checksum ^ byte) & 255];
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        return this;
      };
      Crc322.prototype.digest = function() {
        return (this.checksum ^ 4294967295) >>> 0;
      };
      return Crc322;
    })();
    a_lookUpTable = [
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ];
    lookupTable = uint32ArrayFrom(a_lookUpTable);
  }
});
function negate(bytes) {
  for (let i2 = 0; i2 < 8; i2++) {
    bytes[i2] ^= 255;
  }
  for (let i2 = 7; i2 > -1; i2--) {
    bytes[i2]++;
    if (bytes[i2] !== 0)
      break;
  }
}
__name(negate, "negate");
var Int64;
var init_Int64 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/Int64.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    Int64 = class _Int64 {
      static {
        __name(this, "_Int64");
      }
      static {
        __name2(this, "Int64");
      }
      bytes;
      constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
          throw new Error("Int64 buffers must be exactly 8 bytes");
        }
      }
      static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
          throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i2 = 7, remaining = Math.abs(Math.round(number)); i2 > -1 && remaining > 0; i2--, remaining /= 256) {
          bytes[i2] = remaining;
        }
        if (number < 0) {
          negate(bytes);
        }
        return new _Int64(bytes);
      }
      valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 128;
        if (negative) {
          negate(bytes);
        }
        return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
      }
      toString() {
        return String(this.valueOf());
      }
    };
    __name2(negate, "negate");
  }
});
var HeaderMarshaller;
var HEADER_VALUE_TYPE;
var BOOLEAN_TAG;
var BYTE_TAG;
var SHORT_TAG;
var INT_TAG;
var LONG_TAG;
var BINARY_TAG;
var STRING_TAG;
var TIMESTAMP_TAG;
var UUID_TAG;
var UUID_PATTERN;
var init_HeaderMarshaller = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/HeaderMarshaller.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    init_Int64();
    HeaderMarshaller = class {
      static {
        __name(this, "HeaderMarshaller");
      }
      static {
        __name2(this, "HeaderMarshaller");
      }
      toUtf8;
      fromUtf8;
      constructor(toUtf82, fromUtf84) {
        this.toUtf8 = toUtf82;
        this.fromUtf8 = fromUtf84;
      }
      format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
          const bytes = this.fromUtf8(headerName);
          chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
          out.set(chunk, position);
          position += chunk.byteLength;
        }
        return out;
      }
      formatHeaderValue(header) {
        switch (header.type) {
          case "boolean":
            return Uint8Array.from([header.value ? 0 : 1]);
          case "byte":
            return Uint8Array.from([2, header.value]);
          case "short":
            const shortView = new DataView(new ArrayBuffer(3));
            shortView.setUint8(0, 3);
            shortView.setInt16(1, header.value, false);
            return new Uint8Array(shortView.buffer);
          case "integer":
            const intView = new DataView(new ArrayBuffer(5));
            intView.setUint8(0, 4);
            intView.setInt32(1, header.value, false);
            return new Uint8Array(intView.buffer);
          case "long":
            const longBytes = new Uint8Array(9);
            longBytes[0] = 5;
            longBytes.set(header.value.bytes, 1);
            return longBytes;
          case "binary":
            const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
            binView.setUint8(0, 6);
            binView.setUint16(1, header.value.byteLength, false);
            const binBytes = new Uint8Array(binView.buffer);
            binBytes.set(header.value, 3);
            return binBytes;
          case "string":
            const utf8Bytes = this.fromUtf8(header.value);
            const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
            strView.setUint8(0, 7);
            strView.setUint16(1, utf8Bytes.byteLength, false);
            const strBytes = new Uint8Array(strView.buffer);
            strBytes.set(utf8Bytes, 3);
            return strBytes;
          case "timestamp":
            const tsBytes = new Uint8Array(9);
            tsBytes[0] = 8;
            tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
            return tsBytes;
          case "uuid":
            if (!UUID_PATTERN.test(header.value)) {
              throw new Error(`Invalid UUID received: ${header.value}`);
            }
            const uuidBytes = new Uint8Array(17);
            uuidBytes[0] = 9;
            uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
            return uuidBytes;
        }
      }
      parse(headers) {
        const out = {};
        let position = 0;
        while (position < headers.byteLength) {
          const nameLength = headers.getUint8(position++);
          const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
          position += nameLength;
          switch (headers.getUint8(position++)) {
            case 0:
              out[name] = {
                type: BOOLEAN_TAG,
                value: true
              };
              break;
            case 1:
              out[name] = {
                type: BOOLEAN_TAG,
                value: false
              };
              break;
            case 2:
              out[name] = {
                type: BYTE_TAG,
                value: headers.getInt8(position++)
              };
              break;
            case 3:
              out[name] = {
                type: SHORT_TAG,
                value: headers.getInt16(position, false)
              };
              position += 2;
              break;
            case 4:
              out[name] = {
                type: INT_TAG,
                value: headers.getInt32(position, false)
              };
              position += 4;
              break;
            case 5:
              out[name] = {
                type: LONG_TAG,
                value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
              };
              position += 8;
              break;
            case 6:
              const binaryLength = headers.getUint16(position, false);
              position += 2;
              out[name] = {
                type: BINARY_TAG,
                value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
              };
              position += binaryLength;
              break;
            case 7:
              const stringLength = headers.getUint16(position, false);
              position += 2;
              out[name] = {
                type: STRING_TAG,
                value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
              };
              position += stringLength;
              break;
            case 8:
              out[name] = {
                type: TIMESTAMP_TAG,
                value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
              };
              position += 8;
              break;
            case 9:
              const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
              position += 16;
              out[name] = {
                type: UUID_TAG,
                value: `${toHex(uuidBytes.subarray(0, 4))}-${toHex(uuidBytes.subarray(4, 6))}-${toHex(uuidBytes.subarray(6, 8))}-${toHex(uuidBytes.subarray(8, 10))}-${toHex(uuidBytes.subarray(10))}`
              };
              break;
            default:
              throw new Error(`Unrecognized header type tag`);
          }
        }
        return out;
      }
    };
    (function(HEADER_VALUE_TYPE3) {
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolTrue"] = 0] = "boolTrue";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolFalse"] = 1] = "boolFalse";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byte"] = 2] = "byte";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["short"] = 3] = "short";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["integer"] = 4] = "integer";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["long"] = 5] = "long";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byteArray"] = 6] = "byteArray";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["string"] = 7] = "string";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["timestamp"] = 8] = "timestamp";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["uuid"] = 9] = "uuid";
    })(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
    BOOLEAN_TAG = "boolean";
    BYTE_TAG = "byte";
    SHORT_TAG = "short";
    INT_TAG = "integer";
    LONG_TAG = "long";
    BINARY_TAG = "binary";
    STRING_TAG = "string";
    TIMESTAMP_TAG = "timestamp";
    UUID_TAG = "uuid";
    UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  }
});
function splitMessage({ byteLength, byteOffset, buffer }) {
  if (byteLength < MINIMUM_MESSAGE_LENGTH) {
    throw new Error("Provided message too short to accommodate event stream message overhead");
  }
  const view = new DataView(buffer, byteOffset, byteLength);
  const messageLength = view.getUint32(0, false);
  if (byteLength !== messageLength) {
    throw new Error("Reported message length does not match received message length");
  }
  const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
  const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
  const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
  const checksummer = new Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
  if (expectedPreludeChecksum !== checksummer.digest()) {
    throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`);
  }
  checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
  if (expectedMessageChecksum !== checksummer.digest()) {
    throw new Error(`The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`);
  }
  return {
    headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
    body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH))
  };
}
__name(splitMessage, "splitMessage");
var PRELUDE_MEMBER_LENGTH;
var PRELUDE_LENGTH;
var CHECKSUM_LENGTH;
var MINIMUM_MESSAGE_LENGTH;
var init_splitMessage = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/splitMessage.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_module2();
    PRELUDE_MEMBER_LENGTH = 4;
    PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
    CHECKSUM_LENGTH = 4;
    MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
    __name2(splitMessage, "splitMessage");
  }
});
var EventStreamCodec;
var init_EventStreamCodec = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/EventStreamCodec.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_module2();
    init_HeaderMarshaller();
    init_splitMessage();
    EventStreamCodec = class {
      static {
        __name(this, "EventStreamCodec");
      }
      static {
        __name2(this, "EventStreamCodec");
      }
      headerMarshaller;
      messageBuffer;
      isEndOfStream;
      constructor(toUtf82, fromUtf84) {
        this.headerMarshaller = new HeaderMarshaller(toUtf82, fromUtf84);
        this.messageBuffer = [];
        this.isEndOfStream = false;
      }
      feed(message) {
        this.messageBuffer.push(this.decode(message));
      }
      endOfStream() {
        this.isEndOfStream = true;
      }
      getMessage() {
        const message = this.messageBuffer.pop();
        const isEndOfStream = this.isEndOfStream;
        return {
          getMessage() {
            return message;
          },
          isEndOfStream() {
            return isEndOfStream;
          }
        };
      }
      getAvailableMessages() {
        const messages = this.messageBuffer;
        this.messageBuffer = [];
        const isEndOfStream = this.isEndOfStream;
        return {
          getMessages() {
            return messages;
          },
          isEndOfStream() {
            return isEndOfStream;
          }
        };
      }
      encode({ headers: rawHeaders, body }) {
        const headers = this.headerMarshaller.format(rawHeaders);
        const length = headers.byteLength + body.byteLength + 16;
        const out = new Uint8Array(length);
        const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
        const checksum = new Crc32();
        view.setUint32(0, length, false);
        view.setUint32(4, headers.byteLength, false);
        view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
        out.set(headers, 12);
        out.set(body, headers.byteLength + 12);
        view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
        return out;
      }
      decode(message) {
        const { headers, body } = splitMessage(message);
        return { headers: this.headerMarshaller.parse(headers), body };
      }
      formatHeaders(rawHeaders) {
        return this.headerMarshaller.format(rawHeaders);
      }
    };
  }
});
var MessageDecoderStream;
var init_MessageDecoderStream = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/MessageDecoderStream.js"() {
    init_functionsRoutes_0_9440137819328775();
    MessageDecoderStream = class {
      static {
        __name(this, "MessageDecoderStream");
      }
      static {
        __name2(this, "MessageDecoderStream");
      }
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const bytes of this.options.inputStream) {
          const decoded = this.options.decoder.decode(bytes);
          yield decoded;
        }
      }
    };
  }
});
var MessageEncoderStream;
var init_MessageEncoderStream = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/MessageEncoderStream.js"() {
    init_functionsRoutes_0_9440137819328775();
    MessageEncoderStream = class {
      static {
        __name(this, "MessageEncoderStream");
      }
      static {
        __name2(this, "MessageEncoderStream");
      }
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const msg of this.options.messageStream) {
          const encoded = this.options.encoder.encode(msg);
          yield encoded;
        }
        if (this.options.includeEndFrame) {
          yield new Uint8Array(0);
        }
      }
    };
  }
});
var SmithyMessageDecoderStream;
var init_SmithyMessageDecoderStream = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/SmithyMessageDecoderStream.js"() {
    init_functionsRoutes_0_9440137819328775();
    SmithyMessageDecoderStream = class {
      static {
        __name(this, "SmithyMessageDecoderStream");
      }
      static {
        __name2(this, "SmithyMessageDecoderStream");
      }
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const message of this.options.messageStream) {
          const deserialized = await this.options.deserializer(message);
          if (deserialized === void 0)
            continue;
          yield deserialized;
        }
      }
    };
  }
});
var SmithyMessageEncoderStream;
var init_SmithyMessageEncoderStream = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/SmithyMessageEncoderStream.js"() {
    init_functionsRoutes_0_9440137819328775();
    SmithyMessageEncoderStream = class {
      static {
        __name(this, "SmithyMessageEncoderStream");
      }
      static {
        __name2(this, "SmithyMessageEncoderStream");
      }
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const chunk of this.options.inputStream) {
          const payloadBuf = this.options.serializer(chunk);
          yield payloadBuf;
        }
      }
    };
  }
});
function getChunkedStream(source) {
  let currentMessageTotalLength = 0;
  let currentMessagePendingLength = 0;
  let currentMessage = null;
  let messageLengthBuffer = null;
  const allocateMessage = /* @__PURE__ */ __name2((size) => {
    if (typeof size !== "number") {
      throw new Error("Attempted to allocate an event message where size was not a number: " + size);
    }
    currentMessageTotalLength = size;
    currentMessagePendingLength = 4;
    currentMessage = new Uint8Array(size);
    const currentMessageView = new DataView(currentMessage.buffer);
    currentMessageView.setUint32(0, size, false);
  }, "allocateMessage");
  const iterator = /* @__PURE__ */ __name2(async function* () {
    const sourceIterator = source[Symbol.asyncIterator]();
    while (true) {
      const { value, done } = await sourceIterator.next();
      if (done) {
        if (!currentMessageTotalLength) {
          return;
        } else if (currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage;
        } else {
          throw new Error("Truncated event message received.");
        }
        return;
      }
      const chunkLength = value.length;
      let currentOffset = 0;
      while (currentOffset < chunkLength) {
        if (!currentMessage) {
          const bytesRemaining = chunkLength - currentOffset;
          if (!messageLengthBuffer) {
            messageLengthBuffer = new Uint8Array(4);
          }
          const numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
          messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
          currentMessagePendingLength += numBytesForTotal;
          currentOffset += numBytesForTotal;
          if (currentMessagePendingLength < 4) {
            break;
          }
          allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
          messageLengthBuffer = null;
        }
        const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
        currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
        currentMessagePendingLength += numBytesToWrite;
        currentOffset += numBytesToWrite;
        if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage;
          currentMessage = null;
          currentMessageTotalLength = 0;
          currentMessagePendingLength = 0;
        }
      }
    }
  }, "iterator");
  return {
    [Symbol.asyncIterator]: iterator
  };
}
__name(getChunkedStream, "getChunkedStream");
var init_getChunkedStream = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/getChunkedStream.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(getChunkedStream, "getChunkedStream");
  }
});
function getUnmarshalledStream(source, options) {
  const messageUnmarshaller = getMessageUnmarshaller(options.deserializer, options.toUtf8);
  return {
    [Symbol.asyncIterator]: async function* () {
      for await (const chunk of source) {
        const message = options.eventStreamCodec.decode(chunk);
        const type = await messageUnmarshaller(message);
        if (type === void 0)
          continue;
        yield type;
      }
    }
  };
}
__name(getUnmarshalledStream, "getUnmarshalledStream");
function getMessageUnmarshaller(deserializer, toUtf82) {
  return async function(message) {
    const { value: messageType } = message.headers[":message-type"];
    if (messageType === "error") {
      const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
      unmodeledError.name = message.headers[":error-code"].value;
      throw unmodeledError;
    } else if (messageType === "exception") {
      const code = message.headers[":exception-type"].value;
      const exception = { [code]: message };
      const deserializedException = await deserializer(exception);
      if (deserializedException.$unknown) {
        const error = new Error(toUtf82(message.body));
        error.name = code;
        throw error;
      }
      throw deserializedException[code];
    } else if (messageType === "event") {
      const event = {
        [message.headers[":event-type"].value]: message
      };
      const deserialized = await deserializer(event);
      if (deserialized.$unknown)
        return;
      return deserialized;
    } else {
      throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
    }
  };
}
__name(getMessageUnmarshaller, "getMessageUnmarshaller");
var init_getUnmarshalledStream = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/getUnmarshalledStream.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(getUnmarshalledStream, "getUnmarshalledStream");
    __name2(getMessageUnmarshaller, "getMessageUnmarshaller");
  }
});
var EventStreamMarshaller;
var eventStreamSerdeProvider;
var init_EventStreamMarshaller = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/EventStreamMarshaller.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_EventStreamCodec();
    init_MessageDecoderStream();
    init_MessageEncoderStream();
    init_SmithyMessageDecoderStream();
    init_SmithyMessageEncoderStream();
    init_getChunkedStream();
    init_getUnmarshalledStream();
    EventStreamMarshaller = class {
      static {
        __name(this, "EventStreamMarshaller");
      }
      static {
        __name2(this, "EventStreamMarshaller");
      }
      eventStreamCodec;
      utfEncoder;
      constructor({ utf8Encoder, utf8Decoder }) {
        this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
      }
      deserialize(body, deserializer) {
        const inputStream = getChunkedStream(body);
        return new SmithyMessageDecoderStream({
          messageStream: new MessageDecoderStream({ inputStream, decoder: this.eventStreamCodec }),
          deserializer: getMessageUnmarshaller(deserializer, this.utfEncoder)
        });
      }
      serialize(inputStream, serializer) {
        return new MessageEncoderStream({
          messageStream: new SmithyMessageEncoderStream({ inputStream, serializer }),
          encoder: this.eventStreamCodec,
          includeEndFrame: true
        });
      }
    };
    eventStreamSerdeProvider = /* @__PURE__ */ __name2((options) => new EventStreamMarshaller(options), "eventStreamSerdeProvider");
  }
});
var readableStreamToIterable;
var iterableToReadableStream;
var init_utils = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde/utils.js"() {
    init_functionsRoutes_0_9440137819328775();
    readableStreamToIterable = /* @__PURE__ */ __name2((readableStream) => ({
      [Symbol.asyncIterator]: async function* () {
        const reader = readableStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done)
              return;
            yield value;
          }
        } finally {
          reader.releaseLock();
        }
      }
    }), "readableStreamToIterable");
    iterableToReadableStream = /* @__PURE__ */ __name2((asyncIterable) => {
      const iterator = asyncIterable[Symbol.asyncIterator]();
      return new ReadableStream({
        async pull(controller) {
          const { done, value } = await iterator.next();
          if (done) {
            return controller.close();
          }
          controller.enqueue(value);
        }
      });
    }, "iterableToReadableStream");
  }
});
var EventStreamMarshaller2;
var isReadableStream;
var eventStreamSerdeProvider2;
var init_EventStreamMarshaller_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde/EventStreamMarshaller.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_EventStreamMarshaller();
    init_utils();
    EventStreamMarshaller2 = class {
      static {
        __name(this, "EventStreamMarshaller2");
      }
      static {
        __name2(this, "EventStreamMarshaller");
      }
      universalMarshaller;
      constructor({ utf8Encoder, utf8Decoder }) {
        this.universalMarshaller = new EventStreamMarshaller({
          utf8Decoder,
          utf8Encoder
        });
      }
      deserialize(body, deserializer) {
        const bodyIterable = isReadableStream(body) ? readableStreamToIterable(body) : body;
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
      }
      serialize(input, serializer) {
        const serializedIterable = this.universalMarshaller.serialize(input, serializer);
        return typeof ReadableStream === "function" ? iterableToReadableStream(serializedIterable) : serializedIterable;
      }
    };
    isReadableStream = /* @__PURE__ */ __name2((body) => typeof ReadableStream === "function" && body instanceof ReadableStream, "isReadableStream");
    eventStreamSerdeProvider2 = /* @__PURE__ */ __name2((options) => new EventStreamMarshaller2(options), "eventStreamSerdeProvider");
  }
});
var resolveEventStreamSerdeConfig;
var init_EventStreamSerdeConfig = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-config-resolver/EventStreamSerdeConfig.js"() {
    init_functionsRoutes_0_9440137819328775();
    resolveEventStreamSerdeConfig = /* @__PURE__ */ __name2((input) => Object.assign(input, {
      eventStreamMarshaller: input.eventStreamSerdeProvider(input)
    }), "resolveEventStreamSerdeConfig");
  }
});
var EventStreamSerde;
var init_EventStreamSerde = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/EventStreamSerde.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    EventStreamSerde = class {
      static {
        __name(this, "EventStreamSerde");
      }
      static {
        __name2(this, "EventStreamSerde");
      }
      marshaller;
      serializer;
      deserializer;
      serdeContext;
      defaultContentType;
      constructor({ marshaller, serializer, deserializer, serdeContext, defaultContentType }) {
        this.marshaller = marshaller;
        this.serializer = serializer;
        this.deserializer = deserializer;
        this.serdeContext = serdeContext;
        this.defaultContentType = defaultContentType;
      }
      async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
        const marshaller = this.marshaller;
        const eventStreamMember = requestSchema.getEventStreamMember();
        const unionSchema = requestSchema.getMemberSchema(eventStreamMember);
        const serializer = this.serializer;
        const defaultContentType = this.defaultContentType;
        const initialRequestMarker = /* @__PURE__ */ Symbol("initialRequestMarker");
        const eventStreamIterable = {
          async *[Symbol.asyncIterator]() {
            if (initialRequest) {
              const headers = {
                ":event-type": { type: "string", value: "initial-request" },
                ":message-type": { type: "string", value: "event" },
                ":content-type": { type: "string", value: defaultContentType }
              };
              serializer.write(requestSchema, initialRequest);
              const body = serializer.flush();
              yield {
                [initialRequestMarker]: true,
                headers,
                body
              };
            }
            for await (const page of eventStream) {
              yield page;
            }
          }
        };
        return marshaller.serialize(eventStreamIterable, (event) => {
          if (event[initialRequestMarker]) {
            return {
              headers: event.headers,
              body: event.body
            };
          }
          let unionMember = "";
          for (const key in event) {
            if (key !== "__type") {
              unionMember = key;
              break;
            }
          }
          const { additionalHeaders, body, eventType, explicitPayloadContentType } = this.writeEventBody(unionMember, unionSchema, event);
          const headers = {
            ":event-type": { type: "string", value: eventType },
            ":message-type": { type: "string", value: "event" },
            ":content-type": { type: "string", value: explicitPayloadContentType ?? defaultContentType },
            ...additionalHeaders
          };
          return {
            headers,
            body
          };
        });
      }
      async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
        const marshaller = this.marshaller;
        const eventStreamMember = responseSchema.getEventStreamMember();
        const unionSchema = responseSchema.getMemberSchema(eventStreamMember);
        const memberSchemas = unionSchema.getMemberSchemas();
        const initialResponseMarker = /* @__PURE__ */ Symbol("initialResponseMarker");
        const asyncIterable = marshaller.deserialize(response.body, async (event) => {
          let unionMember = "";
          for (const key in event) {
            if (key !== "__type") {
              unionMember = key;
              break;
            }
          }
          const body = event[unionMember].body;
          if (unionMember === "initial-response") {
            const dataObject = await this.deserializer.read(responseSchema, body);
            delete dataObject[eventStreamMember];
            return {
              [initialResponseMarker]: true,
              ...dataObject
            };
          } else if (unionMember in memberSchemas) {
            const eventStreamSchema = memberSchemas[unionMember];
            if (eventStreamSchema.isStructSchema()) {
              const out = {};
              let hasBindings = false;
              for (const [name, member2] of eventStreamSchema.structIterator()) {
                const { eventHeader, eventPayload } = member2.getMergedTraits();
                hasBindings = hasBindings || Boolean(eventHeader || eventPayload);
                if (eventPayload) {
                  if (member2.isBlobSchema()) {
                    out[name] = body;
                  } else if (member2.isStringSchema()) {
                    out[name] = (this.serdeContext?.utf8Encoder ?? toUtf8)(body);
                  } else if (member2.isStructSchema()) {
                    out[name] = await this.deserializer.read(member2, body);
                  }
                } else if (eventHeader) {
                  const value = event[unionMember].headers[name]?.value;
                  if (value != null) {
                    if (member2.isNumericSchema()) {
                      if (value && typeof value === "object" && "bytes" in value) {
                        out[name] = BigInt(value.toString());
                      } else {
                        out[name] = Number(value);
                      }
                    } else {
                      out[name] = value;
                    }
                  }
                }
              }
              if (hasBindings) {
                return {
                  [unionMember]: out
                };
              }
              if (body.byteLength === 0) {
                return {
                  [unionMember]: {}
                };
              }
            }
            return {
              [unionMember]: await this.deserializer.read(eventStreamSchema, body)
            };
          } else {
            return {
              $unknown: event
            };
          }
        });
        const asyncIterator = asyncIterable[Symbol.asyncIterator]();
        const firstEvent = await asyncIterator.next();
        if (firstEvent.done) {
          return asyncIterable;
        }
        if (firstEvent.value?.[initialResponseMarker]) {
          if (!responseSchema) {
            throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
          }
          for (const key in firstEvent.value) {
            initialResponseContainer[key] = firstEvent.value[key];
          }
        }
        return {
          async *[Symbol.asyncIterator]() {
            if (!firstEvent?.value?.[initialResponseMarker]) {
              yield firstEvent.value;
            }
            while (true) {
              const { done, value } = await asyncIterator.next();
              if (done) {
                break;
              }
              yield value;
            }
          }
        };
      }
      writeEventBody(unionMember, unionSchema, event) {
        const serializer = this.serializer;
        let eventType = unionMember;
        let explicitPayloadMember = null;
        let explicitPayloadContentType;
        const isKnownSchema = (() => {
          const struct = unionSchema.getSchema();
          return struct[4].includes(unionMember);
        })();
        const additionalHeaders = {};
        if (!isKnownSchema) {
          const [type, value] = event[unionMember];
          eventType = type;
          serializer.write(15, value);
        } else {
          const eventSchema = unionSchema.getMemberSchema(unionMember);
          if (eventSchema.isStructSchema()) {
            for (const [memberName, memberSchema] of eventSchema.structIterator()) {
              const { eventHeader, eventPayload } = memberSchema.getMergedTraits();
              if (eventPayload) {
                explicitPayloadMember = memberName;
              } else if (eventHeader) {
                const value = event[unionMember][memberName];
                let type = "binary";
                if (memberSchema.isNumericSchema()) {
                  if ((-2) ** 31 <= value && value <= 2 ** 31 - 1) {
                    type = "integer";
                  } else {
                    type = "long";
                  }
                } else if (memberSchema.isTimestampSchema()) {
                  type = "timestamp";
                } else if (memberSchema.isStringSchema()) {
                  type = "string";
                } else if (memberSchema.isBooleanSchema()) {
                  type = "boolean";
                }
                if (value != null) {
                  additionalHeaders[memberName] = {
                    type,
                    value
                  };
                  delete event[unionMember][memberName];
                }
              }
            }
            if (explicitPayloadMember !== null) {
              const payloadSchema = eventSchema.getMemberSchema(explicitPayloadMember);
              if (payloadSchema.isBlobSchema()) {
                explicitPayloadContentType = "application/octet-stream";
              } else if (payloadSchema.isStringSchema()) {
                explicitPayloadContentType = "text/plain";
              }
              serializer.write(payloadSchema, event[unionMember][explicitPayloadMember]);
            } else {
              serializer.write(eventSchema, event[unionMember]);
            }
          } else if (eventSchema.isUnitSchema()) {
            serializer.write(eventSchema, {});
          } else {
            throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
          }
        }
        const messageSerialization = serializer.flush() ?? new Uint8Array();
        const body = typeof messageSerialization === "string" ? (this.serdeContext?.utf8Decoder ?? fromUtf8)(messageSerialization) : messageSerialization;
        return {
          body,
          eventType,
          explicitPayloadContentType,
          additionalHeaders
        };
      }
    };
  }
});
var index_browser_exports = {};
__export(index_browser_exports, {
  EventStreamCodec: /* @__PURE__ */ __name(() => EventStreamCodec, "EventStreamCodec"),
  EventStreamMarshaller: /* @__PURE__ */ __name(() => EventStreamMarshaller2, "EventStreamMarshaller"),
  EventStreamSerde: /* @__PURE__ */ __name(() => EventStreamSerde, "EventStreamSerde"),
  HeaderMarshaller: /* @__PURE__ */ __name(() => HeaderMarshaller, "HeaderMarshaller"),
  Int64: /* @__PURE__ */ __name(() => Int64, "Int64"),
  MessageDecoderStream: /* @__PURE__ */ __name(() => MessageDecoderStream, "MessageDecoderStream"),
  MessageEncoderStream: /* @__PURE__ */ __name(() => MessageEncoderStream, "MessageEncoderStream"),
  SmithyMessageDecoderStream: /* @__PURE__ */ __name(() => SmithyMessageDecoderStream, "SmithyMessageDecoderStream"),
  SmithyMessageEncoderStream: /* @__PURE__ */ __name(() => SmithyMessageEncoderStream, "SmithyMessageEncoderStream"),
  UniversalEventStreamMarshaller: /* @__PURE__ */ __name(() => EventStreamMarshaller, "UniversalEventStreamMarshaller"),
  eventStreamSerdeProvider: /* @__PURE__ */ __name(() => eventStreamSerdeProvider2, "eventStreamSerdeProvider"),
  getChunkedStream: /* @__PURE__ */ __name(() => getChunkedStream, "getChunkedStream"),
  getMessageUnmarshaller: /* @__PURE__ */ __name(() => getMessageUnmarshaller, "getMessageUnmarshaller"),
  getUnmarshalledStream: /* @__PURE__ */ __name(() => getUnmarshalledStream, "getUnmarshalledStream"),
  iterableToReadableStream: /* @__PURE__ */ __name(() => iterableToReadableStream, "iterableToReadableStream"),
  readableStreamToIterable: /* @__PURE__ */ __name(() => readableStreamToIterable, "readableStreamToIterable"),
  resolveEventStreamSerdeConfig: /* @__PURE__ */ __name(() => resolveEventStreamSerdeConfig, "resolveEventStreamSerdeConfig"),
  universalEventStreamSerdeProvider: /* @__PURE__ */ __name(() => eventStreamSerdeProvider, "universalEventStreamSerdeProvider")
});
var init_index_browser3 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/event-streams/index.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_EventStreamCodec();
    init_HeaderMarshaller();
    init_Int64();
    init_MessageDecoderStream();
    init_MessageEncoderStream();
    init_SmithyMessageDecoderStream();
    init_SmithyMessageEncoderStream();
    init_EventStreamMarshaller_browser();
    init_utils();
    init_EventStreamMarshaller();
    init_getChunkedStream();
    init_getUnmarshalledStream();
    init_EventStreamSerdeConfig();
    init_EventStreamSerde();
  }
});
var HttpProtocol;
var init_HttpProtocol = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/HttpProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_schema2();
    init_transport();
    init_SerdeContext();
    HttpProtocol = class extends SerdeContext {
      static {
        __name(this, "HttpProtocol");
      }
      static {
        __name2(this, "HttpProtocol");
      }
      options;
      compositeErrorRegistry;
      constructor(options) {
        super();
        this.options = options;
        this.compositeErrorRegistry = TypeRegistry.for(options.defaultNamespace);
        for (const etr of options.errorTypeRegistries ?? []) {
          this.compositeErrorRegistry.copyFrom(etr);
        }
      }
      getRequestType() {
        return HttpRequest;
      }
      getResponseType() {
        return HttpResponse;
      }
      setSerdeContext(serdeContext) {
        this.serdeContext = serdeContext;
        this.serializer.setSerdeContext(serdeContext);
        this.deserializer.setSerdeContext(serdeContext);
        if (this.getPayloadCodec()) {
          this.getPayloadCodec().setSerdeContext(serdeContext);
        }
      }
      updateServiceEndpoint(request, endpoint) {
        if ("url" in endpoint) {
          request.protocol = endpoint.url.protocol;
          request.hostname = endpoint.url.hostname;
          request.port = endpoint.url.port ? Number(endpoint.url.port) : void 0;
          request.path = endpoint.url.pathname;
          request.fragment = endpoint.url.hash || void 0;
          request.username = endpoint.url.username || void 0;
          request.password = endpoint.url.password || void 0;
          if (!request.query) {
            request.query = {};
          }
          for (const [k2, v] of endpoint.url.searchParams.entries()) {
            request.query[k2] = v;
          }
          if (endpoint.headers) {
            for (const name in endpoint.headers) {
              request.headers[name] = endpoint.headers[name].join(", ");
            }
          }
          return request;
        } else {
          request.protocol = endpoint.protocol;
          request.hostname = endpoint.hostname;
          request.port = endpoint.port ? Number(endpoint.port) : void 0;
          request.path = endpoint.path;
          request.query = {
            ...endpoint.query
          };
          if (endpoint.headers) {
            for (const name in endpoint.headers) {
              request.headers[name] = endpoint.headers[name];
            }
          }
          return request;
        }
      }
      setHostPrefix(request, operationSchema, input) {
        if (this.serdeContext?.disableHostPrefix) {
          return;
        }
        const inputNs = NormalizedSchema.of(operationSchema.input);
        const opTraits = translateTraits(operationSchema.traits ?? {});
        if (opTraits.endpoint) {
          let hostPrefix = opTraits.endpoint?.[0];
          if (typeof hostPrefix === "string") {
            for (const [name, member2] of inputNs.structIterator()) {
              if (!member2.getMergedTraits().hostLabel) {
                continue;
              }
              const replacement = input[name];
              if (typeof replacement !== "string") {
                throw new Error(`@smithy/core/schema - ${name} in input must be a string as hostLabel.`);
              }
              hostPrefix = hostPrefix.replace(`{${name}}`, replacement);
            }
            request.hostname = hostPrefix + request.hostname;
          }
        }
      }
      deserializeMetadata(output) {
        return {
          httpStatusCode: output.statusCode,
          requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
          extendedRequestId: output.headers["x-amz-id-2"],
          cfId: output.headers["x-amz-cf-id"]
        };
      }
      async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
        const eventStreamSerde = await this.loadEventStreamCapability();
        return eventStreamSerde.serializeEventStream({
          eventStream,
          requestSchema,
          initialRequest
        });
      }
      async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
        const eventStreamSerde = await this.loadEventStreamCapability();
        return eventStreamSerde.deserializeEventStream({
          response,
          responseSchema,
          initialResponseContainer
        });
      }
      async loadEventStreamCapability() {
        const { EventStreamSerde: EventStreamSerde2, eventStreamSerdeProvider: eventStreamSerdeProvider3 } = await Promise.resolve().then(() => (init_index_browser3(), index_browser_exports));
        const marshaller = this.resolveEventStreamMarshaller(eventStreamSerdeProvider3);
        return new EventStreamSerde2({
          marshaller,
          serializer: this.serializer,
          deserializer: this.deserializer,
          serdeContext: this.serdeContext,
          defaultContentType: this.getDefaultContentType()
        });
      }
      resolveEventStreamMarshaller(importedProvider) {
        const context = this.serdeContext;
        if (context.eventStreamMarshaller) {
          return context.eventStreamMarshaller;
        }
        return importedProvider(this.serdeContext);
      }
      getDefaultContentType() {
        throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
      }
      async deserializeHttpMessage(schema, context, response, arg4, arg5) {
        void schema;
        void context;
        void response;
        void arg4;
        void arg5;
        return [];
      }
      getEventStreamMarshaller() {
        const context = this.serdeContext;
        if (!context.eventStreamMarshaller) {
          throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
        }
        return context.eventStreamMarshaller;
      }
    };
  }
});
var init_HttpBindingProtocol = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/HttpBindingProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var RpcProtocol;
var init_RpcProtocol = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/RpcProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_schema2();
    init_transport();
    init_HttpProtocol();
    init_collect_stream_body();
    RpcProtocol = class extends HttpProtocol {
      static {
        __name(this, "RpcProtocol");
      }
      static {
        __name2(this, "RpcProtocol");
      }
      async serializeRequest(operationSchema, _input, context) {
        const serializer = this.serializer;
        const query = {};
        const headers = {};
        const endpoint = await context.endpoint();
        const ns = NormalizedSchema.of(operationSchema?.input);
        const schema = ns.getSchema();
        let payload;
        const input = _input && typeof _input === "object" ? _input : {};
        const request = new HttpRequest({
          protocol: "",
          hostname: "",
          port: void 0,
          path: "/",
          fragment: void 0,
          query,
          headers,
          body: void 0
        });
        if (endpoint) {
          this.updateServiceEndpoint(request, endpoint);
          this.setHostPrefix(request, operationSchema, input);
        }
        if (input) {
          const eventStreamMember = ns.getEventStreamMember();
          if (eventStreamMember) {
            if (input[eventStreamMember]) {
              const initialRequest = {};
              for (const [memberName, memberSchema] of ns.structIterator()) {
                if (memberName !== eventStreamMember && input[memberName]) {
                  serializer.write(memberSchema, input[memberName]);
                  initialRequest[memberName] = serializer.flush();
                }
              }
              payload = await this.serializeEventStream({
                eventStream: input[eventStreamMember],
                requestSchema: ns,
                initialRequest
              });
            }
          } else {
            serializer.write(schema, input);
            payload = serializer.flush();
          }
        }
        request.headers = Object.assign(request.headers, headers);
        request.query = query;
        request.body = payload;
        request.method = "POST";
        return request;
      }
      async deserializeResponse(operationSchema, context, response) {
        const deserializer = this.deserializer;
        const ns = NormalizedSchema.of(operationSchema.output);
        const dataObject = {};
        if (response.statusCode >= 300) {
          const bytes = await collectBody(response.body, context);
          if (bytes.byteLength > 0) {
            Object.assign(dataObject, await deserializer.read(15, bytes));
          }
          await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
          throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
        }
        for (const header in response.headers) {
          const value = response.headers[header];
          delete response.headers[header];
          response.headers[header.toLowerCase()] = value;
        }
        const eventStreamMember = ns.getEventStreamMember();
        if (eventStreamMember) {
          dataObject[eventStreamMember] = await this.deserializeEventStream({
            response,
            responseSchema: ns,
            initialResponseContainer: dataObject
          });
        } else {
          const bytes = await collectBody(response.body, context);
          if (bytes.byteLength > 0) {
            Object.assign(dataObject, await deserializer.read(ns, bytes));
          }
        }
        dataObject.$metadata = this.deserializeMetadata(response);
        return dataObject;
      }
    };
  }
});
var init_resolve_path = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/resolve-path.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_requestBuilder = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/requestBuilder.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
function determineTimestampFormat(ns, settings) {
  if (settings.timestampFormat.useTrait) {
    if (ns.isTimestampSchema() && (ns.getSchema() === 5 || ns.getSchema() === 6 || ns.getSchema() === 7)) {
      return ns.getSchema();
    }
  }
  const { httpLabel, httpPrefixHeaders, httpHeader, httpQuery } = ns.getMergedTraits();
  const bindingFormat = settings.httpBindings ? typeof httpPrefixHeaders === "string" || Boolean(httpHeader) ? 6 : Boolean(httpQuery) || Boolean(httpLabel) ? 5 : void 0 : void 0;
  return bindingFormat ?? settings.timestampFormat.default;
}
__name(determineTimestampFormat, "determineTimestampFormat");
var init_determineTimestampFormat = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/serde/determineTimestampFormat.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(determineTimestampFormat, "determineTimestampFormat");
  }
});
var FromStringShapeDeserializer;
var init_FromStringShapeDeserializer = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/serde/FromStringShapeDeserializer.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_schema2();
    init_index_browser2();
    init_SerdeContext();
    init_determineTimestampFormat();
    FromStringShapeDeserializer = class extends SerdeContext {
      static {
        __name(this, "FromStringShapeDeserializer");
      }
      static {
        __name2(this, "FromStringShapeDeserializer");
      }
      settings;
      constructor(settings) {
        super();
        this.settings = settings;
      }
      read(_schema, data) {
        const ns = NormalizedSchema.of(_schema);
        if (ns.isListSchema()) {
          return splitHeader(data).map((item) => this.read(ns.getValueSchema(), item));
        }
        if (ns.isBlobSchema()) {
          return (this.serdeContext?.base64Decoder ?? fromBase64)(data);
        }
        if (ns.isTimestampSchema()) {
          const format2 = determineTimestampFormat(ns, this.settings);
          switch (format2) {
            case 5:
              return _parseRfc3339DateTimeWithOffset(data);
            case 6:
              return _parseRfc7231DateTime(data);
            case 7:
              return _parseEpochTimestamp(data);
            default:
              console.warn("Missing timestamp format, parsing value with Date constructor:", data);
              return new Date(data);
          }
        }
        if (ns.isStringSchema()) {
          const mediaType = ns.getMergedTraits().mediaType;
          let intermediateValue = data;
          if (mediaType) {
            if (ns.getMergedTraits().httpHeader) {
              intermediateValue = this.base64ToUtf8(intermediateValue);
            }
            const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
            if (isJson) {
              intermediateValue = LazyJsonString.from(intermediateValue);
            }
            return intermediateValue;
          }
        }
        if (ns.isNumericSchema()) {
          return Number(data);
        }
        if (ns.isBigIntegerSchema()) {
          return BigInt(data);
        }
        if (ns.isBigDecimalSchema()) {
          return new NumericValue(data, "bigDecimal");
        }
        if (ns.isBooleanSchema()) {
          return String(data).toLowerCase() === "true";
        }
        return data;
      }
      base64ToUtf8(base64String) {
        return (this.serdeContext?.utf8Encoder ?? toUtf8)((this.serdeContext?.base64Decoder ?? fromBase64)(base64String));
      }
    };
  }
});
var init_HttpInterceptingShapeDeserializer = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeDeserializer.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_ToStringShapeSerializer = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/serde/ToStringShapeSerializer.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_HttpInterceptingShapeSerializer = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeSerializer.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var getHttpHandlerExtensionConfiguration;
var resolveHttpHandlerRuntimeConfig;
var init_httpExtensionConfiguration = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/protocol-http/extensions/httpExtensionConfiguration.js"() {
    init_functionsRoutes_0_9440137819328775();
    getHttpHandlerExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      return {
        setHttpHandler(handler) {
          runtimeConfig.httpHandler = handler;
        },
        httpHandler() {
          return runtimeConfig.httpHandler;
        },
        updateHttpClientConfig(key, value) {
          runtimeConfig.httpHandler?.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs() {
          return runtimeConfig.httpHandler.httpHandlerConfigs();
        }
      };
    }, "getHttpHandlerExtensionConfiguration");
    resolveHttpHandlerRuntimeConfig = /* @__PURE__ */ __name2((httpHandlerExtensionConfiguration) => {
      return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler()
      };
    }, "resolveHttpHandlerRuntimeConfig");
  }
});
function contentLengthMiddleware(bodyLengthChecker) {
  return (next) => async (args) => {
    const request = args.request;
    if (HttpRequest.isInstance(request)) {
      const { body, headers } = request;
      if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) {
        try {
          const length = bodyLengthChecker(body);
          request.headers = {
            ...request.headers,
            [CONTENT_LENGTH_HEADER]: String(length)
          };
        } catch (error) {
        }
      }
    }
    return next({
      ...args,
      request
    });
  };
}
__name(contentLengthMiddleware, "contentLengthMiddleware");
var CONTENT_LENGTH_HEADER;
var contentLengthMiddlewareOptions;
var getContentLengthPlugin;
var init_contentLengthMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/middleware-content-length/contentLengthMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    CONTENT_LENGTH_HEADER = "content-length";
    __name2(contentLengthMiddleware, "contentLengthMiddleware");
    contentLengthMiddlewareOptions = {
      step: "build",
      tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
      name: "contentLengthMiddleware",
      override: true
    };
    getContentLengthPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
      }, "applyToStack")
    }), "getContentLengthPlugin");
  }
});
var escapeUri;
var hexEncode;
var init_escape_uri = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/util-uri-escape/escape-uri.js"() {
    init_functionsRoutes_0_9440137819328775();
    escapeUri = /* @__PURE__ */ __name2((uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode), "escapeUri");
    hexEncode = /* @__PURE__ */ __name2((c2) => `%${c2.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode");
  }
});
function buildQueryString(query) {
  const parts = [];
  for (let key of Object.keys(query).sort()) {
    const value = query[key];
    key = escapeUri(key);
    if (Array.isArray(value)) {
      for (let i2 = 0, iLen = value.length; i2 < iLen; i2++) {
        parts.push(`${key}=${escapeUri(value[i2])}`);
      }
    } else {
      let qsEntry = key;
      if (value || typeof value === "string") {
        qsEntry += `=${escapeUri(value)}`;
      }
      parts.push(qsEntry);
    }
  }
  return parts.join("&");
}
__name(buildQueryString, "buildQueryString");
var init_buildQueryString = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/querystring-builder/buildQueryString.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_escape_uri();
    __name2(buildQueryString, "buildQueryString");
  }
});
var init_protocols = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/protocols/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_collect_stream_body();
    init_extended_encode_uri_component();
    init_HttpBindingProtocol();
    init_HttpProtocol();
    init_RpcProtocol();
    init_requestBuilder();
    init_resolve_path();
    init_FromStringShapeDeserializer();
    init_HttpInterceptingShapeDeserializer();
    init_HttpInterceptingShapeSerializer();
    init_ToStringShapeSerializer();
    init_determineTimestampFormat();
    init_SerdeContext();
    init_transport();
    init_transport();
    init_httpExtensionConfiguration();
    init_contentLengthMiddleware();
    init_escape_uri();
    init_buildQueryString();
    init_transport();
  }
});
var THROTTLING_ERROR_CODES;
var TRANSIENT_ERROR_CODES;
var TRANSIENT_ERROR_STATUS_CODES;
var NODEJS_TIMEOUT_ERROR_CODES;
var NODEJS_NETWORK_ERROR_CODES;
var init_constants = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/service-error-classification/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    THROTTLING_ERROR_CODES = [
      "BandwidthLimitExceeded",
      "EC2ThrottledException",
      "LimitExceededException",
      "PriorRequestNotComplete",
      "ProvisionedThroughputExceededException",
      "RequestLimitExceeded",
      "RequestThrottled",
      "RequestThrottledException",
      "SlowDown",
      "ThrottledException",
      "Throttling",
      "ThrottlingException",
      "TooManyRequestsException",
      "TransactionInProgressException"
    ];
    TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
    TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
    NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];
    NODEJS_NETWORK_ERROR_CODES = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND", "EAI_AGAIN"];
  }
});
function isNodeJsHttp2TransientError(error) {
  return error.code === "ERR_HTTP2_STREAM_ERROR" && error.message.includes("NGHTTP2_REFUSED_STREAM");
}
__name(isNodeJsHttp2TransientError, "isNodeJsHttp2TransientError");
var isRetryableByTrait;
var isClockSkewCorrectedError;
var isBrowserNetworkError;
var isThrottlingError;
var isTransientError;
var isServerError;
var init_service_error_classification = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/service-error-classification/service-error-classification.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_constants();
    isRetryableByTrait = /* @__PURE__ */ __name2((error) => error?.$retryable !== void 0, "isRetryableByTrait");
    isClockSkewCorrectedError = /* @__PURE__ */ __name2((error) => error.$metadata?.clockSkewCorrected, "isClockSkewCorrectedError");
    isBrowserNetworkError = /* @__PURE__ */ __name2((error) => {
      const errorMessages = /* @__PURE__ */ new Set([
        "Failed to fetch",
        "NetworkError when attempting to fetch resource",
        "The Internet connection appears to be offline",
        "Load failed",
        "Network request failed"
      ]);
      const isValid = error && error instanceof TypeError;
      if (!isValid) {
        return false;
      }
      return errorMessages.has(error.message);
    }, "isBrowserNetworkError");
    isThrottlingError = /* @__PURE__ */ __name2((error) => error.$metadata?.httpStatusCode === 429 || THROTTLING_ERROR_CODES.includes(error.name) || error.$retryable?.throttling == true, "isThrottlingError");
    isTransientError = /* @__PURE__ */ __name2((error, depth = 0) => isRetryableByTrait(error) || isClockSkewCorrectedError(error) || error.name === "InvalidSignatureException" && error.message?.includes("Signature expired") || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") || NODEJS_NETWORK_ERROR_CODES.includes(error?.code || "") || TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || isNodeJsHttp2TransientError(error) || error.cause !== void 0 && depth <= 10 && isTransientError(error.cause, depth + 1), "isTransientError");
    isServerError = /* @__PURE__ */ __name2((error) => {
      if (error.$metadata?.httpStatusCode !== void 0) {
        const statusCode = error.$metadata.httpStatusCode;
        if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
          return true;
        }
        return false;
      }
      return false;
    }, "isServerError");
    __name2(isNodeJsHttp2TransientError, "isNodeJsHttp2TransientError");
  }
});
var MAXIMUM_RETRY_DELAY;
var INITIAL_RETRY_TOKENS;
var NO_RETRY_INCREMENT;
var INVOCATION_ID_HEADER;
var REQUEST_HEADER;
var init_constants2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    MAXIMUM_RETRY_DELAY = 20 * 1e3;
    INITIAL_RETRY_TOKENS = 500;
    NO_RETRY_INCREMENT = 1;
    INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
    REQUEST_HEADER = "amz-sdk-request";
  }
});
function parseRetryAfterHeader(response, logger2) {
  if (!HttpResponse.isInstance(response)) {
    return;
  }
  for (const header of Object.keys(response.headers)) {
    const h2 = header.toLowerCase();
    if (h2 === "retry-after") {
      const retryAfter = response.headers[header];
      let retryAfterSeconds = NaN;
      if (retryAfter.endsWith("GMT")) {
        try {
          const date2 = parseRfc7231DateTime(retryAfter);
          retryAfterSeconds = (date2.getTime() - Date.now()) / 1e3;
        } catch (e2) {
          logger2?.trace?.("Failed to parse retry-after header");
          logger2?.trace?.(e2);
        }
      } else if (retryAfter.match(/ GMT, ((\d+)|(\d+\.\d+))$/)) {
        retryAfterSeconds = Number(retryAfter.match(/ GMT, ([\d.]+)$/)?.[1]);
      } else if (retryAfter.match(/^((\d+)|(\d+\.\d+))$/)) {
        retryAfterSeconds = Number(retryAfter);
      } else if (Date.parse(retryAfter) >= Date.now()) {
        retryAfterSeconds = (Date.parse(retryAfter) - Date.now()) / 1e3;
      }
      if (isNaN(retryAfterSeconds)) {
        return;
      }
      return new Date(Date.now() + retryAfterSeconds * 1e3);
    } else if (h2 === "x-amz-retry-after") {
      const v = response.headers[header];
      const backoffMilliseconds = Number(v);
      if (isNaN(backoffMilliseconds)) {
        logger2?.trace?.(`Failed to parse x-amz-retry-after=${v}`);
        return;
      }
      return new Date(Date.now() + backoffMilliseconds);
    }
  }
}
__name(parseRetryAfterHeader, "parseRetryAfterHeader");
var init_parseRetryAfterHeader = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/parseRetryAfterHeader.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_index_browser2();
    __name2(parseRetryAfterHeader, "parseRetryAfterHeader");
  }
});
var asSdkError;
var init_util2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/util.js"() {
    init_functionsRoutes_0_9440137819328775();
    asSdkError = /* @__PURE__ */ __name2((error) => {
      if (error instanceof Error)
        return error;
      if (error instanceof Object)
        return Object.assign(new Error(), error);
      if (typeof error === "string")
        return new Error(error);
      return new Error(`AWS SDK error wrapper for ${error}`);
    }, "asSdkError");
  }
});
function bindRetryMiddleware(isStreamingPayload2) {
  return (options) => (next, context) => async (args) => {
    let retryStrategy = await options.retryStrategy();
    const maxAttempts = await options.maxAttempts();
    if (isRetryStrategyV2(retryStrategy)) {
      retryStrategy = retryStrategy;
      let retryToken = await retryStrategy.acquireInitialRetryToken((context["partition_id"] ?? "") + (context.__retryLongPoll ? ":longpoll" : ""));
      let lastError = new Error();
      let attempts = 0;
      let totalRetryDelay = 0;
      const { request } = args;
      const isRequest = HttpRequest.isInstance(request);
      if (isRequest) {
        request.headers[INVOCATION_ID_HEADER] = v4();
      }
      while (true) {
        try {
          if (isRequest) {
            request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
          }
          const { response, output } = await next(args);
          retryStrategy.recordSuccess(retryToken);
          output.$metadata.attempts = attempts + 1;
          output.$metadata.totalRetryDelay = totalRetryDelay;
          return { response, output };
        } catch (e2) {
          const retryErrorInfo = getRetryErrorInfo(e2, options.logger);
          lastError = asSdkError(e2);
          if (isRequest && isStreamingPayload2(request)) {
            (context.logger instanceof NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
            throw lastError;
          }
          try {
            retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
          } catch (refreshError) {
            if (!lastError.$metadata) {
              lastError.$metadata = {};
            }
            lastError.$metadata.attempts = attempts + 1;
            lastError.$metadata.totalRetryDelay = totalRetryDelay;
            throw lastError;
          }
          attempts = retryToken.getRetryCount();
          const delay = retryToken.getRetryDelay();
          totalRetryDelay += (retryToken?.$retryLog?.acquisitionDelay ?? 0) + delay;
          if (delay > 0) {
            await cooldown(delay);
          }
        }
      }
    } else {
      retryStrategy = retryStrategy;
      if (retryStrategy?.mode) {
        context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
      }
      return retryStrategy.retry(next, args);
    }
  };
}
__name(bindRetryMiddleware, "bindRetryMiddleware");
function bindGetRetryPlugin(isStreamingPayload2) {
  const retryMiddleware2 = bindRetryMiddleware(isStreamingPayload2);
  return (options) => ({
    applyToStack: /* @__PURE__ */ __name2((clientStack) => {
      clientStack.add(retryMiddleware2(options), retryMiddlewareOptions);
    }, "applyToStack")
  });
}
__name(bindGetRetryPlugin, "bindGetRetryPlugin");
var cooldown;
var isRetryStrategyV2;
var getRetryErrorInfo;
var getRetryErrorType;
var retryMiddlewareOptions;
var init_retryMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/retryMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_protocols();
    init_index_browser2();
    init_service_error_classification();
    init_constants2();
    init_parseRetryAfterHeader();
    init_util2();
    __name2(bindRetryMiddleware, "bindRetryMiddleware");
    cooldown = /* @__PURE__ */ __name2((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "cooldown");
    isRetryStrategyV2 = /* @__PURE__ */ __name2((retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined", "isRetryStrategyV2");
    getRetryErrorInfo = /* @__PURE__ */ __name2((error, logger2) => {
      const errorInfo = {
        error,
        errorType: getRetryErrorType(error)
      };
      const retryAfterHint = parseRetryAfterHeader(error.$response, logger2);
      if (retryAfterHint) {
        errorInfo.retryAfterHint = retryAfterHint;
      }
      return errorInfo;
    }, "getRetryErrorInfo");
    getRetryErrorType = /* @__PURE__ */ __name2((error) => {
      if (isThrottlingError(error))
        return "THROTTLING";
      if (isTransientError(error))
        return "TRANSIENT";
      if (isServerError(error))
        return "SERVER_ERROR";
      return "CLIENT_ERROR";
    }, "getRetryErrorType");
    retryMiddlewareOptions = {
      name: "retryMiddleware",
      tags: ["RETRY"],
      step: "finalizeRequest",
      priority: "high",
      override: true
    };
    __name2(bindGetRetryPlugin, "bindGetRetryPlugin");
  }
});
var DefaultRateLimiter;
var init_DefaultRateLimiter = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/DefaultRateLimiter.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_service_error_classification();
    DefaultRateLimiter = class _DefaultRateLimiter {
      static {
        __name(this, "_DefaultRateLimiter");
      }
      static {
        __name2(this, "DefaultRateLimiter");
      }
      static setTimeoutFn = /* @__PURE__ */ __name2((fn, delay) => setTimeout(fn, delay), "setTimeoutFn");
      beta;
      minCapacity;
      minFillRate;
      scaleConstant;
      smooth;
      enabled = false;
      availableTokens = 0;
      lastMaxRate = 0;
      measuredTxRate = 0;
      requestCount = 0;
      fillRate;
      lastThrottleTime;
      lastTimestamp = 0;
      lastTxRateBucket;
      maxCapacity;
      timeWindow = 0;
      constructor(options) {
        this.beta = options?.beta ?? 0.7;
        this.minCapacity = options?.minCapacity ?? 1;
        this.minFillRate = options?.minFillRate ?? 0.5;
        this.scaleConstant = options?.scaleConstant ?? 0.4;
        this.smooth = options?.smooth ?? 0.8;
        this.lastThrottleTime = this.getCurrentTimeInSeconds();
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
      }
      async getSendToken() {
        return this.acquireTokenBucket(1);
      }
      updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        const retryErrorInfo = response;
        const isThrottling = retryErrorInfo?.errorType === "THROTTLING" || isThrottlingError(retryErrorInfo?.error ?? response);
        if (isThrottling) {
          const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
          this.lastMaxRate = rateToUse;
          this.calculateTimeWindow();
          this.lastThrottleTime = this.getCurrentTimeInSeconds();
          calculatedRate = this.cubicThrottle(rateToUse);
          this.enableTokenBucket();
        } else {
          this.calculateTimeWindow();
          calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
      }
      getCurrentTimeInSeconds() {
        return Date.now() / 1e3;
      }
      async acquireTokenBucket(amount) {
        if (!this.enabled) {
          return;
        }
        this.refillTokenBucket();
        while (amount > this.availableTokens) {
          const delay = (amount - this.availableTokens) / this.fillRate * 1e3;
          await new Promise((resolve) => _DefaultRateLimiter.setTimeoutFn(resolve, delay));
          this.refillTokenBucket();
        }
        this.availableTokens = this.availableTokens - amount;
      }
      refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
          this.lastTimestamp = timestamp;
          return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.availableTokens = Math.min(this.maxCapacity, this.availableTokens + fillAmount);
        this.lastTimestamp = timestamp;
      }
      calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
      }
      cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
      }
      cubicSuccess(timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
      }
      enableTokenBucket() {
        this.enabled = true;
      }
      updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.availableTokens = Math.min(this.availableTokens, this.maxCapacity);
      }
      updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
          const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
          this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
          this.requestCount = 0;
          this.lastTxRateBucket = timeBucket;
        }
      }
      getPrecise(num) {
        return parseFloat(num.toFixed(8));
      }
    };
  }
});
var Retry;
var init_retries_2026_config = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/retries-2026-config.js"() {
    init_functionsRoutes_0_9440137819328775();
    Retry = class _Retry {
      static {
        __name(this, "_Retry");
      }
      static {
        __name2(this, "Retry");
      }
      static v2026 = typeof process !== "undefined" && process.env?.SMITHY_NEW_RETRIES_2026 === "true";
      static delay() {
        return _Retry.v2026 ? 50 : 100;
      }
      static throttlingDelay() {
        return _Retry.v2026 ? 1e3 : 500;
      }
      static cost() {
        return _Retry.v2026 ? 14 : 5;
      }
      static throttlingCost() {
        return _Retry.v2026 ? 5 : 10;
      }
      static modifiedCostType() {
        return _Retry.v2026 ? "THROTTLING" : "TRANSIENT";
      }
    };
  }
});
var DefaultRetryBackoffStrategy;
var init_DefaultRetryBackoffStrategy = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/DefaultRetryBackoffStrategy.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_constants2();
    init_retries_2026_config();
    DefaultRetryBackoffStrategy = class {
      static {
        __name(this, "DefaultRetryBackoffStrategy");
      }
      static {
        __name2(this, "DefaultRetryBackoffStrategy");
      }
      x = Retry.delay();
      computeNextBackoffDelay(i2) {
        const b2 = Math.random();
        const r2 = 2;
        const t_i = b2 * Math.min(this.x * r2 ** i2, MAXIMUM_RETRY_DELAY);
        return Math.floor(t_i);
      }
      setDelayBase(delay) {
        this.x = delay;
      }
    };
  }
});
var DefaultRetryToken;
var init_DefaultRetryToken = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/DefaultRetryToken.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_constants2();
    DefaultRetryToken = class {
      static {
        __name(this, "DefaultRetryToken");
      }
      static {
        __name2(this, "DefaultRetryToken");
      }
      delay;
      count;
      cost;
      longPoll;
      $retryLog = {
        acquisitionDelay: 0
      };
      constructor(delay, count, cost, longPoll) {
        this.delay = delay;
        this.count = count;
        this.cost = cost;
        this.longPoll = longPoll;
      }
      getRetryCount() {
        return this.count;
      }
      getRetryDelay() {
        return Math.min(MAXIMUM_RETRY_DELAY, this.delay);
      }
      getRetryCost() {
        return this.cost;
      }
      isLongPoll() {
        return this.longPoll;
      }
    };
  }
});
var RETRY_MODES;
var DEFAULT_MAX_ATTEMPTS;
var DEFAULT_RETRY_MODE;
var init_config2 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/config.js"() {
    init_functionsRoutes_0_9440137819328775();
    (function(RETRY_MODES2) {
      RETRY_MODES2["STANDARD"] = "standard";
      RETRY_MODES2["ADAPTIVE"] = "adaptive";
    })(RETRY_MODES || (RETRY_MODES = {}));
    DEFAULT_MAX_ATTEMPTS = 3;
    DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;
  }
});
var refusal;
var StandardRetryStrategy;
var init_StandardRetryStrategy = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/StandardRetryStrategy.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_DefaultRetryBackoffStrategy();
    init_DefaultRetryToken();
    init_config2();
    init_constants2();
    init_retries_2026_config();
    refusal = {
      incompatible: 1,
      attempts: 2,
      capacity: 3
    };
    StandardRetryStrategy = class {
      static {
        __name(this, "StandardRetryStrategy");
      }
      static {
        __name2(this, "StandardRetryStrategy");
      }
      mode = RETRY_MODES.STANDARD;
      retryBackoffStrategy;
      capacity = INITIAL_RETRY_TOKENS;
      maxAttemptsProvider;
      baseDelay;
      constructor(arg1) {
        if (typeof arg1 === "number") {
          this.maxAttemptsProvider = async () => arg1;
        } else if (typeof arg1 === "function") {
          this.maxAttemptsProvider = arg1;
        } else if (arg1 && typeof arg1 === "object") {
          this.maxAttemptsProvider = async () => arg1.maxAttempts;
          this.baseDelay = arg1.baseDelay;
          this.retryBackoffStrategy = arg1.backoff;
        }
        this.maxAttemptsProvider ??= async () => DEFAULT_MAX_ATTEMPTS;
        this.baseDelay ??= Retry.delay();
        this.retryBackoffStrategy ??= new DefaultRetryBackoffStrategy();
      }
      async acquireInitialRetryToken(retryTokenScope) {
        return new DefaultRetryToken(Retry.delay(), 0, void 0, Retry.v2026 && retryTokenScope.includes(":longpoll"));
      }
      async refreshRetryTokenForRetry(token, errorInfo) {
        const maxAttempts = await this.getMaxAttempts();
        const retryCode = this.retryCode(token, errorInfo, maxAttempts);
        const shouldRetry = retryCode === 0;
        const isLongPoll = token.isLongPoll?.();
        if (shouldRetry || isLongPoll) {
          const errorType = errorInfo.errorType;
          this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? Retry.throttlingDelay() : this.baseDelay);
          const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
          let retryDelay = delayFromErrorType;
          if (errorInfo.retryAfterHint instanceof Date) {
            retryDelay = Math.max(delayFromErrorType, Math.min(errorInfo.retryAfterHint.getTime() - Date.now(), delayFromErrorType + 5e3));
          }
          if (!shouldRetry) {
            const longPollBackoff = Retry.v2026 && retryCode === refusal.capacity && isLongPoll ? retryDelay : 0;
            if (longPollBackoff > 0) {
              await new Promise((r2) => setTimeout(r2, longPollBackoff));
            }
          } else {
            const capacityCost = this.getCapacityCost(errorType);
            this.capacity -= capacityCost;
            const nextToken = new DefaultRetryToken(0, token.getRetryCount() + 1, capacityCost, token.isLongPoll?.() ?? false);
            await new Promise((r2) => setTimeout(r2, retryDelay));
            nextToken.$retryLog.acquisitionDelay = retryDelay;
            return nextToken;
          }
        }
        throw new Error("No retry token available");
      }
      recordSuccess(token) {
        this.capacity = Math.min(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
      }
      getCapacity() {
        return this.capacity;
      }
      async maxAttempts() {
        return this.maxAttemptsProvider();
      }
      async getMaxAttempts() {
        try {
          return await this.maxAttemptsProvider();
        } catch (error) {
          console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
          return DEFAULT_MAX_ATTEMPTS;
        }
      }
      retryCode(tokenToRenew, errorInfo, maxAttempts) {
        const attempts = tokenToRenew.getRetryCount() + 1;
        const retryableStatus = this.isRetryableError(errorInfo.errorType) ? 0 : refusal.incompatible;
        const attemptStatus = attempts < maxAttempts ? 0 : refusal.attempts;
        const capacityStatus = this.capacity >= this.getCapacityCost(errorInfo.errorType) ? 0 : refusal.capacity;
        return retryableStatus || attemptStatus || capacityStatus;
      }
      getCapacityCost(errorType) {
        return errorType === Retry.modifiedCostType() ? Retry.throttlingCost() : Retry.cost();
      }
      isRetryableError(errorType) {
        return errorType === "THROTTLING" || errorType === "TRANSIENT";
      }
    };
  }
});
var AdaptiveRetryStrategy;
var init_AdaptiveRetryStrategy = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/util-retry/AdaptiveRetryStrategy.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_DefaultRateLimiter();
    init_StandardRetryStrategy();
    init_config2();
    AdaptiveRetryStrategy = class {
      static {
        __name(this, "AdaptiveRetryStrategy");
      }
      static {
        __name2(this, "AdaptiveRetryStrategy");
      }
      mode = RETRY_MODES.ADAPTIVE;
      rateLimiter;
      standardRetryStrategy;
      constructor(maxAttemptsProvider, options) {
        const { rateLimiter } = options ?? {};
        this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
        this.standardRetryStrategy = options ? new StandardRetryStrategy({
          maxAttempts: typeof maxAttemptsProvider === "number" ? maxAttemptsProvider : 3,
          ...options
        }) : new StandardRetryStrategy(maxAttemptsProvider);
      }
      async acquireInitialRetryToken(retryTokenScope) {
        const token = await this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
        await this.rateLimiter.getSendToken();
        return token;
      }
      async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        this.rateLimiter.updateClientSendingRate(errorInfo);
        const token = await this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
        await this.rateLimiter.getSendToken();
        return token;
      }
      recordSuccess(token) {
        this.rateLimiter.updateClientSendingRate({});
        this.standardRetryStrategy.recordSuccess(token);
      }
      async maxAttemptsProvider() {
        return this.standardRetryStrategy.maxAttempts();
      }
    };
  }
});
var resolveRetryConfig;
var init_configurations = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/configurations.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_AdaptiveRetryStrategy();
    init_StandardRetryStrategy();
    init_config2();
    init_retries_2026_config();
    resolveRetryConfig = /* @__PURE__ */ __name2((input, defaults) => {
      const { retryStrategy, retryMode } = input;
      const { defaultMaxAttempts = DEFAULT_MAX_ATTEMPTS, defaultBaseDelay = Retry.delay() } = defaults ?? {};
      const maxAttemptsProvider = normalizeProvider(input.maxAttempts ?? defaultMaxAttempts);
      let controller = retryStrategy ? Promise.resolve(retryStrategy) : void 0;
      const getDefault = /* @__PURE__ */ __name2(async () => {
        const maxAttempts = await maxAttemptsProvider();
        const adaptive = await normalizeProvider(retryMode)() === RETRY_MODES.ADAPTIVE;
        if (adaptive) {
          return new AdaptiveRetryStrategy(maxAttemptsProvider, {
            maxAttempts,
            baseDelay: defaultBaseDelay
          });
        }
        return new StandardRetryStrategy({
          maxAttempts,
          baseDelay: defaultBaseDelay
        });
      }, "getDefault");
      return Object.assign(input, {
        maxAttempts: maxAttemptsProvider,
        retryStrategy: /* @__PURE__ */ __name2(() => controller ??= getDefault(), "retryStrategy")
      });
    }, "resolveRetryConfig");
  }
});
var retryMiddleware;
var getRetryPlugin;
var init_index_browser4 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/retry/index.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_isStreamingPayload_browser();
    init_retryMiddleware();
    init_config2();
    init_retries_2026_config();
    init_configurations();
    retryMiddleware = bindRetryMiddleware(isStreamingPayload);
    getRetryPlugin = bindGetRetryPlugin(isStreamingPayload);
  }
});
function setFeature2(context, feature, value) {
  if (!context.__aws_sdk_context) {
    context.__aws_sdk_context = {
      features: {}
    };
  } else if (!context.__aws_sdk_context.features) {
    context.__aws_sdk_context.features = {};
  }
  context.__aws_sdk_context.features[feature] = value;
}
__name(setFeature2, "setFeature2");
var init_setFeature = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser4();
    Retry.v2026 ||= typeof process === "object" && process.env?.AWS_NEW_RETRIES_2026 === "true";
    __name2(setFeature2, "setFeature");
  }
});
function resolveHostHeaderConfig(input) {
  return input;
}
__name(resolveHostHeaderConfig, "resolveHostHeaderConfig");
var hostHeaderMiddleware;
var hostHeaderMiddlewareOptions;
var getHostHeaderPlugin;
var init_hostHeaderMiddleware = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-host-header/hostHeaderMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    __name2(resolveHostHeaderConfig, "resolveHostHeaderConfig");
    hostHeaderMiddleware = /* @__PURE__ */ __name2((options) => (next) => async (args) => {
      if (!HttpRequest.isInstance(args.request))
        return next(args);
      const { request } = args;
      const { handlerProtocol = "" } = options.requestHandler.metadata || {};
      if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
        delete request.headers["host"];
        request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
      } else if (!request.headers["host"]) {
        let host = request.hostname;
        if (request.port != null)
          host += `:${request.port}`;
        request.headers["host"] = host;
      }
      return next(args);
    }, "hostHeaderMiddleware");
    hostHeaderMiddlewareOptions = {
      name: "hostHeaderMiddleware",
      step: "build",
      priority: "low",
      tags: ["HOST"],
      override: true
    };
    getHostHeaderPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
      }, "applyToStack")
    }), "getHostHeaderPlugin");
  }
});
var loggerMiddleware;
var loggerMiddlewareOptions;
var getLoggerPlugin;
var init_loggerMiddleware = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-logger/loggerMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    loggerMiddleware = /* @__PURE__ */ __name2(() => (next, context) => async (args) => {
      try {
        const response = await next(args);
        const { clientName, commandName, logger: logger2, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
        const { $metadata, ...outputWithoutMetadata } = response.output;
        logger2?.info?.({
          clientName,
          commandName,
          input: inputFilterSensitiveLog(args.input),
          output: outputFilterSensitiveLog(outputWithoutMetadata),
          metadata: $metadata
        });
        return response;
      } catch (error) {
        const { clientName, commandName, logger: logger2, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        logger2?.error?.({
          clientName,
          commandName,
          input: inputFilterSensitiveLog(args.input),
          error,
          metadata: error.$metadata
        });
        throw error;
      }
    }, "loggerMiddleware");
    loggerMiddlewareOptions = {
      name: "loggerMiddleware",
      tags: ["LOGGER"],
      step: "initialize",
      override: true
    };
    getLoggerPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
      }, "applyToStack")
    }), "getLoggerPlugin");
  }
});
var getRecursionDetectionPlugin;
var init_getRecursionDetectionPlugin_browser = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-recursion-detection/getRecursionDetectionPlugin.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    getRecursionDetectionPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
      }, "applyToStack")
    }), "getRecursionDetectionPlugin");
  }
});
var resolveAuthOptions;
var init_resolveAuthOptions = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/resolveAuthOptions.js"() {
    init_functionsRoutes_0_9440137819328775();
    resolveAuthOptions = /* @__PURE__ */ __name2((candidateAuthOptions, authSchemePreference) => {
      if (!authSchemePreference || authSchemePreference.length === 0) {
        return candidateAuthOptions;
      }
      const preferredAuthOptions = [];
      for (const preferredSchemeName of authSchemePreference) {
        for (const candidateAuthOption of candidateAuthOptions) {
          const candidateAuthSchemeName = candidateAuthOption.schemeId.split("#")[1];
          if (candidateAuthSchemeName === preferredSchemeName) {
            preferredAuthOptions.push(candidateAuthOption);
          }
        }
      }
      for (const candidateAuthOption of candidateAuthOptions) {
        if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) {
          preferredAuthOptions.push(candidateAuthOption);
        }
      }
      return preferredAuthOptions;
    }, "resolveAuthOptions");
  }
});
function convertHttpAuthSchemesToMap(httpAuthSchemes) {
  const map = /* @__PURE__ */ new Map();
  for (const scheme of httpAuthSchemes) {
    map.set(scheme.schemeId, scheme);
  }
  return map;
}
__name(convertHttpAuthSchemesToMap, "convertHttpAuthSchemesToMap");
var httpAuthSchemeMiddleware;
var init_httpAuthSchemeMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    init_resolveAuthOptions();
    __name2(convertHttpAuthSchemesToMap, "convertHttpAuthSchemesToMap");
    httpAuthSchemeMiddleware = /* @__PURE__ */ __name2((config, mwOptions) => (next, context) => async (args) => {
      const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
      const authSchemePreference = config.authSchemePreference ? await config.authSchemePreference() : [];
      const resolvedOptions = resolveAuthOptions(options, authSchemePreference);
      const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
      const smithyContext = getSmithyContext(context);
      const failureReasons = [];
      for (const option of resolvedOptions) {
        const scheme = authSchemes.get(option.schemeId);
        if (!scheme) {
          failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
          continue;
        }
        const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
        if (!identityProvider) {
          failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
          continue;
        }
        const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
        option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
        option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
        smithyContext.selectedHttpAuthScheme = {
          httpAuthOption: option,
          identity: await identityProvider(option.identityProperties),
          signer: scheme.signer
        };
        break;
      }
      if (!smithyContext.selectedHttpAuthScheme) {
        throw new Error(failureReasons.join("\n"));
      }
      return next(args);
    }, "httpAuthSchemeMiddleware");
  }
});
var httpAuthSchemeEndpointRuleSetMiddlewareOptions;
var getHttpAuthSchemeEndpointRuleSetPlugin;
var init_getHttpAuthSchemeEndpointRuleSetPlugin = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpAuthSchemeMiddleware();
    httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
      step: "serialize",
      tags: ["HTTP_AUTH_SCHEME"],
      name: "httpAuthSchemeMiddleware",
      override: true,
      relation: "before",
      toMiddleware: "endpointV2Middleware"
    };
    getHttpAuthSchemeEndpointRuleSetPlugin = /* @__PURE__ */ __name2((config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
        clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
          httpAuthSchemeParametersProvider,
          identityProviderConfigProvider
        }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
      }, "applyToStack")
    }), "getHttpAuthSchemeEndpointRuleSetPlugin");
  }
});
var init_getHttpAuthSchemePlugin = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/getHttpAuthSchemePlugin.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_middleware_http_auth_scheme = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpAuthSchemeMiddleware();
    init_getHttpAuthSchemeEndpointRuleSetPlugin();
    init_getHttpAuthSchemePlugin();
  }
});
var defaultErrorHandler;
var defaultSuccessHandler;
var httpSigningMiddleware;
var init_httpSigningMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-signing/httpSigningMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_transport();
    defaultErrorHandler = /* @__PURE__ */ __name2((signingProperties) => (error) => {
      throw error;
    }, "defaultErrorHandler");
    defaultSuccessHandler = /* @__PURE__ */ __name2((httpResponse, signingProperties) => {
    }, "defaultSuccessHandler");
    httpSigningMiddleware = /* @__PURE__ */ __name2((config) => (next, context) => async (args) => {
      if (!HttpRequest.isInstance(args.request)) {
        return next(args);
      }
      const smithyContext = getSmithyContext(context);
      const scheme = smithyContext.selectedHttpAuthScheme;
      if (!scheme) {
        throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
      }
      const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
      const output = await next({
        ...args,
        request: await signer.sign(args.request, identity, signingProperties)
      }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
      (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
      return output;
    }, "httpSigningMiddleware");
  }
});
var httpSigningMiddlewareOptions;
var getHttpSigningPlugin;
var init_getHttpSigningMiddleware = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-signing/getHttpSigningMiddleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpSigningMiddleware();
    httpSigningMiddlewareOptions = {
      step: "finalizeRequest",
      tags: ["HTTP_SIGNING"],
      name: "httpSigningMiddleware",
      aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
      override: true,
      relation: "after",
      toMiddleware: "retryMiddleware"
    };
    getHttpSigningPlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
        clientStack.addRelativeTo(httpSigningMiddleware(config), httpSigningMiddlewareOptions);
      }, "applyToStack")
    }), "getHttpSigningPlugin");
  }
});
var init_middleware_http_signing = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-signing/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpSigningMiddleware();
    init_getHttpSigningMiddleware();
  }
});
var normalizeProvider2;
var init_normalizeProvider2 = __esm({
  "../node_modules/@smithy/core/dist-es/normalizeProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
    normalizeProvider2 = /* @__PURE__ */ __name2((input) => {
      if (typeof input === "function")
        return input;
      const promisified = Promise.resolve(input);
      return () => promisified;
    }, "normalizeProvider");
  }
});
function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
  return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(async function* paginateOperation(config, input, ...additionalArguments) {
    const _input = input;
    let token = config.startingToken ?? _input[inputTokenName];
    let hasNext = true;
    let page;
    while (hasNext) {
      _input[inputTokenName] = token;
      if (pageSizeTokenName) {
        _input[pageSizeTokenName] = _input[pageSizeTokenName] ?? config.pageSize;
      }
      if (config.client instanceof ClientCtor) {
        page = await makePagedClientRequest(CommandCtor, config.client, input, config.withCommand, ...additionalArguments);
      } else {
        throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
      }
      yield page;
      const prevToken = token;
      token = get(page, outputTokenName);
      hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
    }
    return void 0;
  }, "paginateOperation"), "paginateOperation");
}
__name(createPaginator, "createPaginator");
var makePagedClientRequest;
var get;
var init_createPaginator = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/pagination/createPaginator.js"() {
    init_functionsRoutes_0_9440137819328775();
    makePagedClientRequest = /* @__PURE__ */ __name2(async (CommandCtor, client, input, withCommand = (_) => _, ...args) => {
      let command = new CommandCtor(input);
      command = withCommand(command) ?? command;
      return await client.send(command, ...args);
    }, "makePagedClientRequest");
    __name2(createPaginator, "createPaginator");
    get = /* @__PURE__ */ __name2((fromObject, path) => {
      let cursor = fromObject;
      const pathComponents = path.split(".");
      for (const step of pathComponents) {
        if (!cursor || typeof cursor !== "object") {
          return void 0;
        }
        cursor = cursor[step];
      }
      return cursor;
    }, "get");
  }
});
var init_setFeature2 = __esm({
  "../node_modules/@smithy/core/dist-es/setFeature.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var DefaultIdentityProviderConfig;
var init_DefaultIdentityProviderConfig = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/DefaultIdentityProviderConfig.js"() {
    init_functionsRoutes_0_9440137819328775();
    DefaultIdentityProviderConfig = class {
      static {
        __name(this, "DefaultIdentityProviderConfig");
      }
      static {
        __name2(this, "DefaultIdentityProviderConfig");
      }
      authSchemes = /* @__PURE__ */ new Map();
      constructor(config) {
        for (const key in config) {
          const value = config[key];
          if (value !== void 0) {
            this.authSchemes.set(key, value);
          }
        }
      }
      getIdentityProvider(schemeId) {
        return this.authSchemes.get(schemeId);
      }
    };
  }
});
var init_httpApiKeyAuth = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/httpAuthSchemes/httpApiKeyAuth.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_httpBearerAuth = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/httpAuthSchemes/httpBearerAuth.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_noAuth = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/httpAuthSchemes/noAuth.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_httpAuthSchemes = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/httpAuthSchemes/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpApiKeyAuth();
    init_httpBearerAuth();
    init_noAuth();
  }
});
var createIsIdentityExpiredFunction;
var EXPIRATION_MS;
var isIdentityExpired;
var doesIdentityRequireRefresh;
var memoizeIdentityProvider;
var init_memoizeIdentityProvider = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/memoizeIdentityProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
    createIsIdentityExpiredFunction = /* @__PURE__ */ __name2((expirationMs) => /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function isIdentityExpired2(identity) {
      return doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
    }, "isIdentityExpired2"), "isIdentityExpired"), "createIsIdentityExpiredFunction");
    EXPIRATION_MS = 3e5;
    isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
    doesIdentityRequireRefresh = /* @__PURE__ */ __name2((identity) => identity.expiration !== void 0, "doesIdentityRequireRefresh");
    memoizeIdentityProvider = /* @__PURE__ */ __name2((provider, isExpired, requiresRefresh) => {
      if (provider === void 0) {
        return void 0;
      }
      const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
      let resolved;
      let pending;
      let hasResult;
      let isConstant = false;
      const coalesceProvider = /* @__PURE__ */ __name2(async (options) => {
        if (!pending) {
          pending = normalizedProvider(options);
        }
        try {
          resolved = await pending;
          hasResult = true;
          isConstant = false;
        } finally {
          pending = void 0;
        }
        return resolved;
      }, "coalesceProvider");
      if (isExpired === void 0) {
        return async (options) => {
          if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider(options);
          }
          return resolved;
        };
      }
      return async (options) => {
        if (!hasResult || options?.forceRefresh) {
          resolved = await coalesceProvider(options);
        }
        if (isConstant) {
          return resolved;
        }
        if (!requiresRefresh(resolved)) {
          isConstant = true;
          return resolved;
        }
        if (isExpired(resolved)) {
          await coalesceProvider(options);
          return resolved;
        }
        return resolved;
      };
    }, "memoizeIdentityProvider");
  }
});
var init_util_identity_and_auth = __esm({
  "../node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_DefaultIdentityProviderConfig();
    init_httpAuthSchemes();
    init_memoizeIdentityProvider();
  }
});
var init_dist_es3 = __esm({
  "../node_modules/@smithy/core/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_middleware_http_auth_scheme();
    init_middleware_http_signing();
    init_normalizeProvider2();
    init_createPaginator();
    init_setFeature2();
    init_util_identity_and_auth();
  }
});
function isValidUserAgentAppId(appId) {
  if (appId === void 0) {
    return true;
  }
  return typeof appId === "string" && appId.length <= 50;
}
__name(isValidUserAgentAppId, "isValidUserAgentAppId");
function resolveUserAgentConfig(input) {
  const normalizedAppIdProvider = normalizeProvider2(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
  const { customUserAgent } = input;
  return Object.assign(input, {
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
    userAgentAppId: /* @__PURE__ */ __name2(async () => {
      const appId = await normalizedAppIdProvider();
      if (!isValidUserAgentAppId(appId)) {
        const logger2 = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
        if (typeof appId !== "string") {
          logger2?.warn("userAgentAppId must be a string or undefined.");
        } else if (appId.length > 50) {
          logger2?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
        }
      }
      return appId;
    }, "userAgentAppId")
  });
}
__name(resolveUserAgentConfig, "resolveUserAgentConfig");
var DEFAULT_UA_APP_ID;
var init_configurations2 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/configurations.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es3();
    DEFAULT_UA_APP_ID = void 0;
    __name2(isValidUserAgentAppId, "isValidUserAgentAppId");
    __name2(resolveUserAgentConfig, "resolveUserAgentConfig");
  }
});
var partitionsInfo;
var init_partitions = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/partitions.js"() {
    init_functionsRoutes_0_9440137819328775();
    partitionsInfo = {
      "partitions": [
        {
          "id": "aws",
          "outputs": {
            "dnsSuffix": "amazonaws.com",
            "dualStackDnsSuffix": "api.aws",
            "implicitGlobalRegion": "us-east-1",
            "name": "aws",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
          "regions": {
            "af-south-1": {
              "description": "Africa (Cape Town)"
            },
            "ap-east-1": {
              "description": "Asia Pacific (Hong Kong)"
            },
            "ap-east-2": {
              "description": "Asia Pacific (Taipei)"
            },
            "ap-northeast-1": {
              "description": "Asia Pacific (Tokyo)"
            },
            "ap-northeast-2": {
              "description": "Asia Pacific (Seoul)"
            },
            "ap-northeast-3": {
              "description": "Asia Pacific (Osaka)"
            },
            "ap-south-1": {
              "description": "Asia Pacific (Mumbai)"
            },
            "ap-south-2": {
              "description": "Asia Pacific (Hyderabad)"
            },
            "ap-southeast-1": {
              "description": "Asia Pacific (Singapore)"
            },
            "ap-southeast-2": {
              "description": "Asia Pacific (Sydney)"
            },
            "ap-southeast-3": {
              "description": "Asia Pacific (Jakarta)"
            },
            "ap-southeast-4": {
              "description": "Asia Pacific (Melbourne)"
            },
            "ap-southeast-5": {
              "description": "Asia Pacific (Malaysia)"
            },
            "ap-southeast-6": {
              "description": "Asia Pacific (New Zealand)"
            },
            "ap-southeast-7": {
              "description": "Asia Pacific (Thailand)"
            },
            "aws-global": {
              "description": "aws global region"
            },
            "ca-central-1": {
              "description": "Canada (Central)"
            },
            "ca-west-1": {
              "description": "Canada West (Calgary)"
            },
            "eu-central-1": {
              "description": "Europe (Frankfurt)"
            },
            "eu-central-2": {
              "description": "Europe (Zurich)"
            },
            "eu-north-1": {
              "description": "Europe (Stockholm)"
            },
            "eu-south-1": {
              "description": "Europe (Milan)"
            },
            "eu-south-2": {
              "description": "Europe (Spain)"
            },
            "eu-west-1": {
              "description": "Europe (Ireland)"
            },
            "eu-west-2": {
              "description": "Europe (London)"
            },
            "eu-west-3": {
              "description": "Europe (Paris)"
            },
            "il-central-1": {
              "description": "Israel (Tel Aviv)"
            },
            "me-central-1": {
              "description": "Middle East (UAE)"
            },
            "me-south-1": {
              "description": "Middle East (Bahrain)"
            },
            "mx-central-1": {
              "description": "Mexico (Central)"
            },
            "sa-east-1": {
              "description": "South America (Sao Paulo)"
            },
            "us-east-1": {
              "description": "US East (N. Virginia)"
            },
            "us-east-2": {
              "description": "US East (Ohio)"
            },
            "us-west-1": {
              "description": "US West (N. California)"
            },
            "us-west-2": {
              "description": "US West (Oregon)"
            }
          }
        },
        {
          "id": "aws-cn",
          "outputs": {
            "dnsSuffix": "amazonaws.com.cn",
            "dualStackDnsSuffix": "api.amazonwebservices.com.cn",
            "implicitGlobalRegion": "cn-northwest-1",
            "name": "aws-cn",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^cn\\-\\w+\\-\\d+$",
          "regions": {
            "aws-cn-global": {
              "description": "aws-cn global region"
            },
            "cn-north-1": {
              "description": "China (Beijing)"
            },
            "cn-northwest-1": {
              "description": "China (Ningxia)"
            }
          }
        },
        {
          "id": "aws-eusc",
          "outputs": {
            "dnsSuffix": "amazonaws.eu",
            "dualStackDnsSuffix": "api.amazonwebservices.eu",
            "implicitGlobalRegion": "eusc-de-east-1",
            "name": "aws-eusc",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^eusc\\-(de)\\-\\w+\\-\\d+$",
          "regions": {
            "eusc-de-east-1": {
              "description": "AWS European Sovereign Cloud (Germany)"
            }
          }
        },
        {
          "id": "aws-iso",
          "outputs": {
            "dnsSuffix": "c2s.ic.gov",
            "dualStackDnsSuffix": "api.aws.ic.gov",
            "implicitGlobalRegion": "us-iso-east-1",
            "name": "aws-iso",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^us\\-iso\\-\\w+\\-\\d+$",
          "regions": {
            "aws-iso-global": {
              "description": "aws-iso global region"
            },
            "us-iso-east-1": {
              "description": "US ISO East"
            },
            "us-iso-west-1": {
              "description": "US ISO WEST"
            }
          }
        },
        {
          "id": "aws-iso-b",
          "outputs": {
            "dnsSuffix": "sc2s.sgov.gov",
            "dualStackDnsSuffix": "api.aws.scloud",
            "implicitGlobalRegion": "us-isob-east-1",
            "name": "aws-iso-b",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^us\\-isob\\-\\w+\\-\\d+$",
          "regions": {
            "aws-iso-b-global": {
              "description": "aws-iso-b global region"
            },
            "us-isob-east-1": {
              "description": "US ISOB East (Ohio)"
            },
            "us-isob-west-1": {
              "description": "US ISOB West"
            }
          }
        },
        {
          "id": "aws-iso-e",
          "outputs": {
            "dnsSuffix": "cloud.adc-e.uk",
            "dualStackDnsSuffix": "api.cloud-aws.adc-e.uk",
            "implicitGlobalRegion": "eu-isoe-west-1",
            "name": "aws-iso-e",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^eu\\-isoe\\-\\w+\\-\\d+$",
          "regions": {
            "aws-iso-e-global": {
              "description": "aws-iso-e global region"
            },
            "eu-isoe-west-1": {
              "description": "EU ISOE West"
            }
          }
        },
        {
          "id": "aws-iso-f",
          "outputs": {
            "dnsSuffix": "csp.hci.ic.gov",
            "dualStackDnsSuffix": "api.aws.hci.ic.gov",
            "implicitGlobalRegion": "us-isof-south-1",
            "name": "aws-iso-f",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^us\\-isof\\-\\w+\\-\\d+$",
          "regions": {
            "aws-iso-f-global": {
              "description": "aws-iso-f global region"
            },
            "us-isof-east-1": {
              "description": "US ISOF EAST"
            },
            "us-isof-south-1": {
              "description": "US ISOF SOUTH"
            }
          }
        },
        {
          "id": "aws-us-gov",
          "outputs": {
            "dnsSuffix": "amazonaws.com",
            "dualStackDnsSuffix": "api.aws",
            "implicitGlobalRegion": "us-gov-west-1",
            "name": "aws-us-gov",
            "supportsDualStack": true,
            "supportsFIPS": true
          },
          "regionRegex": "^us\\-gov\\-\\w+\\-\\d+$",
          "regions": {
            "aws-us-gov-global": {
              "description": "aws-us-gov global region"
            },
            "us-gov-east-1": {
              "description": "AWS GovCloud (US-East)"
            },
            "us-gov-west-1": {
              "description": "AWS GovCloud (US-West)"
            }
          }
        }
      ],
      "version": "1.1"
    };
  }
});
var selectedPartitionsInfo;
var selectedUserAgentPrefix;
var partition;
var getUserAgentPrefix;
var init_partition = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/partition.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_partitions();
    selectedPartitionsInfo = partitionsInfo;
    selectedUserAgentPrefix = "";
    partition = /* @__PURE__ */ __name2((value) => {
      const { partitions } = selectedPartitionsInfo;
      for (const partition2 of partitions) {
        const { regions, outputs } = partition2;
        for (const [region, regionData] of Object.entries(regions)) {
          if (region === value) {
            return {
              ...outputs,
              ...regionData
            };
          }
        }
      }
      for (const partition2 of partitions) {
        const { regionRegex, outputs } = partition2;
        if (new RegExp(regionRegex).test(value)) {
          return {
            ...outputs
          };
        }
      }
      const DEFAULT_PARTITION = partitions.find((partition2) => partition2.id === "aws");
      if (!DEFAULT_PARTITION) {
        throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
      }
      return {
        ...DEFAULT_PARTITION.outputs
      };
    }, "partition");
    getUserAgentPrefix = /* @__PURE__ */ __name2(() => selectedUserAgentPrefix, "getUserAgentPrefix");
  }
});
async function checkFeatures(context, config, args) {
  const request = args.request;
  if (request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") {
    setFeature2(context, "PROTOCOL_RPC_V2_CBOR", "M");
  }
  if (typeof config.retryStrategy === "function") {
    const retryStrategy = await config.retryStrategy();
    if (typeof retryStrategy.mode === "string") {
      switch (retryStrategy.mode) {
        case RETRY_MODES.ADAPTIVE:
          setFeature2(context, "RETRY_MODE_ADAPTIVE", "F");
          break;
        case RETRY_MODES.STANDARD:
          setFeature2(context, "RETRY_MODE_STANDARD", "E");
          break;
      }
    }
  }
  if (typeof config.accountIdEndpointMode === "function") {
    const endpointV2 = context.endpointV2;
    if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
      setFeature2(context, "ACCOUNT_ID_ENDPOINT", "O");
    }
    switch (await config.accountIdEndpointMode?.()) {
      case "disabled":
        setFeature2(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        setFeature2(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        setFeature2(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
  if (identity?.$source) {
    const credentials = identity;
    if (credentials.accountId) {
      setFeature2(context, "RESOLVED_ACCOUNT_ID", "T");
    }
    for (const [key, value] of Object.entries(credentials.$source ?? {})) {
      setFeature2(context, key, value);
    }
  }
}
__name(checkFeatures, "checkFeatures");
var ACCOUNT_ID_ENDPOINT_REGEX;
var init_check_features = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/check-features.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser4();
    init_setFeature();
    ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
    __name2(checkFeatures, "checkFeatures");
  }
});
var USER_AGENT;
var X_AMZ_USER_AGENT;
var SPACE;
var UA_NAME_SEPARATOR;
var UA_NAME_ESCAPE_REGEX;
var UA_VALUE_ESCAPE_REGEX;
var UA_ESCAPE_CHAR;
var init_constants3 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    USER_AGENT = "user-agent";
    X_AMZ_USER_AGENT = "x-amz-user-agent";
    SPACE = " ";
    UA_NAME_SEPARATOR = "/";
    UA_NAME_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w]/g;
    UA_VALUE_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w#]/g;
    UA_ESCAPE_CHAR = "-";
  }
});
function encodeFeatures(features) {
  let buffer = "";
  for (const key in features) {
    const val = features[key];
    if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
      if (buffer.length) {
        buffer += "," + val;
      } else {
        buffer += val;
      }
      continue;
    }
    break;
  }
  return buffer;
}
__name(encodeFeatures, "encodeFeatures");
var BYTE_LIMIT;
var init_encode_features = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/encode-features.js"() {
    init_functionsRoutes_0_9440137819328775();
    BYTE_LIMIT = 1024;
    __name2(encodeFeatures, "encodeFeatures");
  }
});
var userAgentMiddleware;
var escapeUserAgent;
var getUserAgentMiddlewareOptions;
var getUserAgentPlugin;
var init_user_agent_middleware = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/user-agent-middleware.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_partition();
    init_check_features();
    init_constants3();
    init_encode_features();
    userAgentMiddleware = /* @__PURE__ */ __name2((options) => (next, context) => async (args) => {
      const { request } = args;
      if (!HttpRequest.isInstance(request)) {
        return next(args);
      }
      const { headers } = request;
      const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
      const defaultUserAgent2 = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
      await checkFeatures(context, options, args);
      const awsContext = context;
      defaultUserAgent2.push(`m/${encodeFeatures(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
      const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
      const appId = await options.userAgentAppId();
      if (appId) {
        defaultUserAgent2.push(escapeUserAgent([`app`, `${appId}`]));
      }
      const prefix = getUserAgentPrefix();
      const sdkUserAgentValue = (prefix ? [prefix] : []).concat([...defaultUserAgent2, ...userAgent, ...customUserAgent]).join(SPACE);
      const normalUAValue = [
        ...defaultUserAgent2.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent
      ].join(SPACE);
      if (options.runtime !== "browser") {
        if (normalUAValue) {
          headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
        }
        headers[USER_AGENT] = sdkUserAgentValue;
      } else {
        headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
      }
      return next({
        ...args,
        request
      });
    }, "userAgentMiddleware");
    escapeUserAgent = /* @__PURE__ */ __name2((userAgentPair) => {
      const name = userAgentPair[0].split(UA_NAME_SEPARATOR).map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR)).join(UA_NAME_SEPARATOR);
      const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
      const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
      const prefix = name.substring(0, prefixSeparatorIndex);
      let uaName = name.substring(prefixSeparatorIndex + 1);
      if (prefix === "api") {
        uaName = uaName.toLowerCase();
      }
      return [prefix, uaName, version].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
        switch (index) {
          case 0:
            return item;
          case 1:
            return `${acc}/${item}`;
          default:
            return `${acc}#${item}`;
        }
      }, "");
    }, "escapeUserAgent");
    getUserAgentMiddlewareOptions = {
      name: "getUserAgentMiddleware",
      step: "build",
      priority: "low",
      tags: ["SET_USER_AGENT", "USER_AGENT"],
      override: true
    };
    getUserAgentPlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: /* @__PURE__ */ __name2((clientStack) => {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
      }, "applyToStack")
    }), "getUserAgentPlugin");
  }
});
var createDefaultUserAgentProvider;
var fallback;
var init_defaultUserAgent = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-user-agent-browser/defaultUserAgent.js"() {
    init_functionsRoutes_0_9440137819328775();
    createDefaultUserAgentProvider = /* @__PURE__ */ __name2(({ serviceId, clientVersion }) => async (config) => {
      const navigator = typeof window !== "undefined" ? window.navigator : void 0;
      const uaString = navigator?.userAgent ?? "";
      const osName = navigator?.userAgentData?.platform ?? fallback.os(uaString) ?? "other";
      const osVersion = void 0;
      const brands = navigator?.userAgentData?.brands ?? [];
      const brand = brands[brands.length - 1];
      const browserName = brand?.brand ?? fallback.browser(uaString) ?? "unknown";
      const browserVersion = brand?.version ?? "unknown";
      const sections = [
        ["aws-sdk-js", clientVersion],
        ["ua", "2.1"],
        [`os/${osName}`, osVersion],
        ["lang/js"],
        ["md/browser", `${browserName}_${browserVersion}`]
      ];
      if (serviceId) {
        sections.push([`api/${serviceId}`, clientVersion]);
      }
      const appId = await config?.userAgentAppId?.();
      if (appId) {
        sections.push([`app/${appId}`]);
      }
      return sections;
    }, "createDefaultUserAgentProvider");
    fallback = {
      os(ua) {
        if (/iPhone|iPad|iPod/.test(ua))
          return "iOS";
        if (/Macintosh|Mac OS X/.test(ua))
          return "macOS";
        if (/Windows NT/.test(ua))
          return "Windows";
        if (/Android/.test(ua))
          return "Android";
        if (/Linux/.test(ua))
          return "Linux";
        return void 0;
      },
      browser(ua) {
        if (/EdgiOS|EdgA|Edg\//.test(ua))
          return "Microsoft Edge";
        if (/Firefox\//.test(ua))
          return "Firefox";
        if (/Chrome\//.test(ua))
          return "Chrome";
        if (/Safari\//.test(ua))
          return "Safari";
        return void 0;
      }
    };
  }
});
var init_isIpAddress2 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/isIpAddress.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser();
  }
});
var isVirtualHostableS3Bucket;
var init_isVirtualHostableS3Bucket = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/isVirtualHostableS3Bucket.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser();
    init_isIpAddress2();
    isVirtualHostableS3Bucket = /* @__PURE__ */ __name2((value, allowSubDomains = false) => {
      if (allowSubDomains) {
        for (const label of value.split(".")) {
          if (!isVirtualHostableS3Bucket(label)) {
            return false;
          }
        }
        return true;
      }
      if (!isValidHostLabel(value)) {
        return false;
      }
      if (value.length < 3 || value.length > 63) {
        return false;
      }
      if (value !== value.toLowerCase()) {
        return false;
      }
      if (isIpAddress(value)) {
        return false;
      }
      return true;
    }, "isVirtualHostableS3Bucket");
  }
});
var ARN_DELIMITER;
var RESOURCE_DELIMITER;
var parseArn;
var init_parseArn = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/parseArn.js"() {
    init_functionsRoutes_0_9440137819328775();
    ARN_DELIMITER = ":";
    RESOURCE_DELIMITER = "/";
    parseArn = /* @__PURE__ */ __name2((value) => {
      const segments = value.split(ARN_DELIMITER);
      if (segments.length < 6)
        return null;
      const [arn, partition2, service, region, accountId, ...resourcePath] = segments;
      if (arn !== "arn" || partition2 === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "")
        return null;
      const resourceId = resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat();
      return {
        partition: partition2,
        service,
        region,
        accountId,
        resourceId
      };
    }, "parseArn");
  }
});
var awsEndpointFunctions;
var init_aws = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/aws.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser();
    init_isVirtualHostableS3Bucket();
    init_parseArn();
    init_partition();
    awsEndpointFunctions = {
      isVirtualHostableS3Bucket,
      parseArn,
      partition
    };
    customEndpointFunctions.aws = awsEndpointFunctions;
  }
});
var memoize;
var init_memoize = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/property-provider/memoize.js"() {
    init_functionsRoutes_0_9440137819328775();
    memoize = /* @__PURE__ */ __name2((provider, isExpired, requiresRefresh) => {
      let resolved;
      let pending;
      let hasResult;
      let isConstant = false;
      const coalesceProvider = /* @__PURE__ */ __name2(async () => {
        if (!pending) {
          pending = provider();
        }
        try {
          resolved = await pending;
          hasResult = true;
          isConstant = false;
        } finally {
          pending = void 0;
        }
        return resolved;
      }, "coalesceProvider");
      if (isExpired === void 0) {
        return async (options) => {
          if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider();
          }
          return resolved;
        };
      }
      return async (options) => {
        if (!hasResult || options?.forceRefresh) {
          resolved = await coalesceProvider();
        }
        if (isConstant) {
          return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
          isConstant = true;
          return resolved;
        }
        if (isExpired(resolved)) {
          await coalesceProvider();
          return resolved;
        }
        return resolved;
      };
    }, "memoize");
  }
});
var validRegions;
var checkRegion;
var init_checkRegion = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/checkRegion.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_transport();
    validRegions = /* @__PURE__ */ new Set();
    checkRegion = /* @__PURE__ */ __name2((region, check = isValidHostLabel) => {
      if (!validRegions.has(region) && !check(region)) {
        if (region === "*") {
          console.warn(`@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.`);
        } else {
          throw new Error(`Region not accepted: region="${region}" is not a valid hostname component.`);
        }
      } else {
        validRegions.add(region);
      }
    }, "checkRegion");
  }
});
var isFipsRegion;
var init_isFipsRegion = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/isFipsRegion.js"() {
    init_functionsRoutes_0_9440137819328775();
    isFipsRegion = /* @__PURE__ */ __name2((region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips")), "isFipsRegion");
  }
});
var getRealRegion;
var init_getRealRegion = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/getRealRegion.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_isFipsRegion();
    getRealRegion = /* @__PURE__ */ __name2((region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region, "getRealRegion");
  }
});
var resolveRegionConfig;
var init_resolveRegionConfig = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/resolveRegionConfig.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_checkRegion();
    init_getRealRegion();
    init_isFipsRegion();
    resolveRegionConfig = /* @__PURE__ */ __name2((input) => {
      const { region, useFipsEndpoint } = input;
      if (!region) {
        throw new Error("Region is missing");
      }
      return Object.assign(input, {
        region: /* @__PURE__ */ __name2(async () => {
          const providedRegion = typeof region === "function" ? await region() : region;
          const realRegion = getRealRegion(providedRegion);
          checkRegion(realRegion);
          return realRegion;
        }, "region"),
        useFipsEndpoint: /* @__PURE__ */ __name2(async () => {
          const providedRegion = typeof region === "string" ? region : await region();
          if (isFipsRegion(providedRegion)) {
            return true;
          }
          return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        }, "useFipsEndpoint")
      });
    }, "resolveRegionConfig");
  }
});
var DEFAULTS_MODE_OPTIONS;
var init_constants4 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/defaults-mode/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
  }
});
var resolveDefaultsModeConfig;
var useMobileConfiguration;
var init_resolveDefaultsModeConfig_browser = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/defaults-mode/resolveDefaultsModeConfig.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_memoize();
    init_constants4();
    resolveDefaultsModeConfig = /* @__PURE__ */ __name2(({ defaultsMode } = {}) => memoize(async () => {
      const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
      switch (mode?.toLowerCase()) {
        case "auto":
          return Promise.resolve(useMobileConfiguration() ? "mobile" : "standard");
        case "mobile":
        case "in-region":
        case "cross-region":
        case "standard":
        case "legacy":
          return Promise.resolve(mode?.toLocaleLowerCase());
        case void 0:
          return Promise.resolve("legacy");
        default:
          throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
      }
    }), "resolveDefaultsModeConfig");
    useMobileConfiguration = /* @__PURE__ */ __name2(() => {
      const navigator = window?.navigator;
      if (navigator?.connection) {
        const { effectiveType, rtt, downlink } = navigator?.connection;
        const slow = typeof effectiveType === "string" && effectiveType !== "4g" || Number(rtt) > 100 || Number(downlink) < 10;
        if (slow) {
          return true;
        }
      }
      return navigator?.userAgentData?.mobile || typeof navigator?.maxTouchPoints === "number" && navigator?.maxTouchPoints > 1;
    }, "useMobileConfiguration");
  }
});
var DEFAULT_USE_DUALSTACK_ENDPOINT;
var DEFAULT_USE_FIPS_ENDPOINT;
var init_index_browser5 = __esm({
  "../node_modules/@smithy/core/dist-es/submodules/config/index.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_resolveRegionConfig();
    init_resolveDefaultsModeConfig_browser();
    DEFAULT_USE_DUALSTACK_ENDPOINT = false;
    DEFAULT_USE_FIPS_ENDPOINT = false;
  }
});
var getAwsRegionExtensionConfiguration;
var resolveAwsRegionExtensionConfiguration;
var init_extensions2 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/region-config-resolver/extensions.js"() {
    init_functionsRoutes_0_9440137819328775();
    getAwsRegionExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      return {
        setRegion(region) {
          runtimeConfig.region = region;
        },
        region() {
          return runtimeConfig.region;
        }
      };
    }, "getAwsRegionExtensionConfiguration");
    resolveAwsRegionExtensionConfiguration = /* @__PURE__ */ __name2((awsRegionExtensionConfiguration) => {
      return {
        region: awsRegionExtensionConfiguration.region()
      };
    }, "resolveAwsRegionExtensionConfiguration");
  }
});
var init_index_browser6 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/client/index.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_setCredentialFeature();
    init_hostHeaderMiddleware();
    init_loggerMiddleware();
    init_getRecursionDetectionPlugin_browser();
    init_configurations2();
    init_user_agent_middleware();
    init_defaultUserAgent();
    init_aws();
    init_extensions2();
  }
});
var getDateHeader;
var init_getDateHeader = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    getDateHeader = /* @__PURE__ */ __name2((response) => HttpResponse.isInstance(response) ? response.headers?.date ?? response.headers?.Date : void 0, "getDateHeader");
  }
});
var getSkewCorrectedDate;
var init_getSkewCorrectedDate = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js"() {
    init_functionsRoutes_0_9440137819328775();
    getSkewCorrectedDate = /* @__PURE__ */ __name2((systemClockOffset) => new Date(Date.now() + systemClockOffset), "getSkewCorrectedDate");
  }
});
var isClockSkewed;
var init_isClockSkewed = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/isClockSkewed.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_getSkewCorrectedDate();
    isClockSkewed = /* @__PURE__ */ __name2((clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 3e5, "isClockSkewed");
  }
});
var getUpdatedSystemClockOffset;
var init_getUpdatedSystemClockOffset = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_isClockSkewed();
    getUpdatedSystemClockOffset = /* @__PURE__ */ __name2((clockTime, currentSystemClockOffset) => {
      const clockTimeInMs = Date.parse(clockTime);
      if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
      }
      return currentSystemClockOffset;
    }, "getUpdatedSystemClockOffset");
  }
});
var init_utils2 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_getDateHeader();
    init_getSkewCorrectedDate();
    init_getUpdatedSystemClockOffset();
  }
});
var throwSigningPropertyError;
var validateSigningProperties;
var AwsSdkSigV4Signer;
var init_AwsSdkSigV4Signer = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_utils2();
    throwSigningPropertyError = /* @__PURE__ */ __name2((name, property) => {
      if (!property) {
        throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
      }
      return property;
    }, "throwSigningPropertyError");
    validateSigningProperties = /* @__PURE__ */ __name2(async (signingProperties) => {
      const context = throwSigningPropertyError("context", signingProperties.context);
      const config = throwSigningPropertyError("config", signingProperties.config);
      const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
      const signerFunction = throwSigningPropertyError("signer", config.signer);
      const signer = await signerFunction(authScheme);
      const signingRegion = signingProperties?.signingRegion;
      const signingRegionSet = signingProperties?.signingRegionSet;
      const signingName = signingProperties?.signingName;
      return {
        config,
        signer,
        signingRegion,
        signingRegionSet,
        signingName
      };
    }, "validateSigningProperties");
    AwsSdkSigV4Signer = class {
      static {
        __name(this, "AwsSdkSigV4Signer");
      }
      static {
        __name2(this, "AwsSdkSigV4Signer");
      }
      async sign(httpRequest, identity, signingProperties) {
        if (!HttpRequest.isInstance(httpRequest)) {
          throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        }
        const validatedProps = await validateSigningProperties(signingProperties);
        const { config, signer } = validatedProps;
        let { signingRegion, signingName } = validatedProps;
        const handlerExecutionContext = signingProperties.context;
        if (handlerExecutionContext?.authSchemes?.length ?? 0 > 1) {
          const [first, second] = handlerExecutionContext.authSchemes;
          if (first?.name === "sigv4a" && second?.name === "sigv4") {
            signingRegion = second?.signingRegion ?? signingRegion;
            signingName = second?.signingName ?? signingName;
          }
        }
        signingProperties._preRequestSystemClockOffset = config.systemClockOffset;
        const signedRequest = await signer.sign(httpRequest, {
          signingDate: getSkewCorrectedDate(config.systemClockOffset),
          signingRegion,
          signingService: signingName
        });
        return signedRequest;
      }
      errorHandler(signingProperties) {
        return (error) => {
          const errorException = error;
          const serverTime = errorException.ServerTime ?? getDateHeader(errorException.$response);
          if (serverTime) {
            const config = throwSigningPropertyError("config", signingProperties.config);
            const preRequestOffset = signingProperties._preRequestSystemClockOffset;
            const newOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
            const isLocalCorrection = newOffset !== config.systemClockOffset;
            const isConcurrentCorrection = preRequestOffset !== void 0 && preRequestOffset !== newOffset;
            const clockSkewCorrected = isLocalCorrection || isConcurrentCorrection;
            if (clockSkewCorrected && errorException.$metadata) {
              config.systemClockOffset = newOffset;
              errorException.$metadata.clockSkewCorrected = true;
            }
          }
          throw error;
        };
      }
      successHandler(httpResponse, signingProperties) {
        const dateHeader = getDateHeader(httpResponse);
        if (dateHeader) {
          const config = throwSigningPropertyError("config", signingProperties.config);
          config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
        }
      }
    };
  }
});
var init_getBearerTokenEnvKey = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getBearerTokenEnvKey.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_resolveAwsSdkSigV4AConfig = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4AConfig.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
function negate2(bytes) {
  for (let i2 = 0; i2 < 8; i2++) {
    bytes[i2] ^= 255;
  }
  for (let i2 = 7; i2 > -1; i2--) {
    bytes[i2]++;
    if (bytes[i2] !== 0)
      break;
  }
}
__name(negate2, "negate2");
var HeaderFormatter;
var HEADER_VALUE_TYPE2;
var UUID_PATTERN2;
var Int642;
var init_HeaderFormatter = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    HeaderFormatter = class {
      static {
        __name(this, "HeaderFormatter");
      }
      static {
        __name2(this, "HeaderFormatter");
      }
      format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
          const bytes = fromUtf8(headerName);
          chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
          out.set(chunk, position);
          position += chunk.byteLength;
        }
        return out;
      }
      formatHeaderValue(header) {
        switch (header.type) {
          case "boolean":
            return Uint8Array.from([header.value ? 0 : 1]);
          case "byte":
            return Uint8Array.from([2, header.value]);
          case "short":
            const shortView = new DataView(new ArrayBuffer(3));
            shortView.setUint8(0, 3);
            shortView.setInt16(1, header.value, false);
            return new Uint8Array(shortView.buffer);
          case "integer":
            const intView = new DataView(new ArrayBuffer(5));
            intView.setUint8(0, 4);
            intView.setInt32(1, header.value, false);
            return new Uint8Array(intView.buffer);
          case "long":
            const longBytes = new Uint8Array(9);
            longBytes[0] = 5;
            longBytes.set(header.value.bytes, 1);
            return longBytes;
          case "binary":
            const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
            binView.setUint8(0, 6);
            binView.setUint16(1, header.value.byteLength, false);
            const binBytes = new Uint8Array(binView.buffer);
            binBytes.set(header.value, 3);
            return binBytes;
          case "string":
            const utf8Bytes = fromUtf8(header.value);
            const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
            strView.setUint8(0, 7);
            strView.setUint16(1, utf8Bytes.byteLength, false);
            const strBytes = new Uint8Array(strView.buffer);
            strBytes.set(utf8Bytes, 3);
            return strBytes;
          case "timestamp":
            const tsBytes = new Uint8Array(9);
            tsBytes[0] = 8;
            tsBytes.set(Int642.fromNumber(header.value.valueOf()).bytes, 1);
            return tsBytes;
          case "uuid":
            if (!UUID_PATTERN2.test(header.value)) {
              throw new Error(`Invalid UUID received: ${header.value}`);
            }
            const uuidBytes = new Uint8Array(17);
            uuidBytes[0] = 9;
            uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
            return uuidBytes;
        }
      }
    };
    (function(HEADER_VALUE_TYPE3) {
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolTrue"] = 0] = "boolTrue";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolFalse"] = 1] = "boolFalse";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byte"] = 2] = "byte";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["short"] = 3] = "short";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["integer"] = 4] = "integer";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["long"] = 5] = "long";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byteArray"] = 6] = "byteArray";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["string"] = 7] = "string";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["timestamp"] = 8] = "timestamp";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["uuid"] = 9] = "uuid";
    })(HEADER_VALUE_TYPE2 || (HEADER_VALUE_TYPE2 = {}));
    UUID_PATTERN2 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    Int642 = class _Int64 {
      static {
        __name(this, "_Int64");
      }
      static {
        __name2(this, "Int64");
      }
      bytes;
      constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
          throw new Error("Int64 buffers must be exactly 8 bytes");
        }
      }
      static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
          throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i2 = 7, remaining = Math.abs(Math.round(number)); i2 > -1 && remaining > 0; i2--, remaining /= 256) {
          bytes[i2] = remaining;
        }
        if (number < 0) {
          negate2(bytes);
        }
        return new _Int64(bytes);
      }
      valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 128;
        if (negative) {
          negate2(bytes);
        }
        return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
      }
      toString() {
        return String(this.valueOf());
      }
    };
    __name2(negate2, "negate");
  }
});
var ALGORITHM_QUERY_PARAM;
var CREDENTIAL_QUERY_PARAM;
var AMZ_DATE_QUERY_PARAM;
var SIGNED_HEADERS_QUERY_PARAM;
var EXPIRES_QUERY_PARAM;
var SIGNATURE_QUERY_PARAM;
var TOKEN_QUERY_PARAM;
var AUTH_HEADER;
var AMZ_DATE_HEADER;
var DATE_HEADER;
var GENERATED_HEADERS;
var SIGNATURE_HEADER;
var SHA256_HEADER;
var TOKEN_HEADER;
var ALWAYS_UNSIGNABLE_HEADERS;
var PROXY_HEADER_PATTERN;
var SEC_HEADER_PATTERN;
var ALGORITHM_IDENTIFIER;
var EVENT_ALGORITHM_IDENTIFIER;
var UNSIGNED_PAYLOAD;
var MAX_CACHE_SIZE;
var KEY_TYPE_IDENTIFIER;
var MAX_PRESIGNED_TTL;
var init_constants5 = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
    CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
    AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
    SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
    EXPIRES_QUERY_PARAM = "X-Amz-Expires";
    SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
    TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
    AUTH_HEADER = "authorization";
    AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
    DATE_HEADER = "date";
    GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
    SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
    SHA256_HEADER = "x-amz-content-sha256";
    TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
    ALWAYS_UNSIGNABLE_HEADERS = {
      authorization: true,
      "cache-control": true,
      connection: true,
      expect: true,
      from: true,
      "keep-alive": true,
      "max-forwards": true,
      pragma: true,
      referer: true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true,
      "user-agent": true,
      "x-amzn-trace-id": true
    };
    PROXY_HEADER_PATTERN = /^proxy-/;
    SEC_HEADER_PATTERN = /^sec-/;
    ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
    EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
    UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
    MAX_CACHE_SIZE = 50;
    KEY_TYPE_IDENTIFIER = "aws4_request";
    MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
  }
});
var getCanonicalQuery;
var init_getCanonicalQuery = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_constants5();
    getCanonicalQuery = /* @__PURE__ */ __name2(({ query = {} }) => {
      const keys = [];
      const serialized = {};
      for (const key of Object.keys(query)) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
          continue;
        }
        const encodedKey = escapeUri(key);
        keys.push(encodedKey);
        const value = query[key];
        if (typeof value === "string") {
          serialized[encodedKey] = `${encodedKey}=${escapeUri(value)}`;
        } else if (Array.isArray(value)) {
          serialized[encodedKey] = value.slice(0).reduce((encoded, value2) => encoded.concat([`${encodedKey}=${escapeUri(value2)}`]), []).sort().join("&");
        }
      }
      return keys.sort().map((key) => serialized[key]).filter((serialized2) => serialized2).join("&");
    }, "getCanonicalQuery");
  }
});
var iso8601;
var toDate;
var init_utilDate = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/utilDate.js"() {
    init_functionsRoutes_0_9440137819328775();
    iso8601 = /* @__PURE__ */ __name2((time2) => toDate(time2).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601");
    toDate = /* @__PURE__ */ __name2((time2) => {
      if (typeof time2 === "number") {
        return new Date(time2 * 1e3);
      }
      if (typeof time2 === "string") {
        if (Number(time2)) {
          return new Date(Number(time2) * 1e3);
        }
        return new Date(time2);
      }
      return time2;
    }, "toDate");
  }
});
var SignatureV4Base;
var init_SignatureV4Base = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_protocols();
    init_index_browser2();
    init_getCanonicalQuery();
    init_utilDate();
    SignatureV4Base = class {
      static {
        __name(this, "SignatureV4Base");
      }
      static {
        __name2(this, "SignatureV4Base");
      }
      service;
      regionProvider;
      credentialProvider;
      sha256;
      uriEscapePath;
      applyChecksum;
      constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = normalizeProvider(region);
        this.credentialProvider = normalizeProvider(credentials);
      }
      createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
      }
      async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
        const hash = new this.sha256();
        hash.update(toUint8Array(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${algorithmIdentifier}
${longDate}
${credentialScope}
${toHex(hashedRequest)}`;
      }
      getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
          const normalizedPathSegments = [];
          for (const pathSegment of path.split("/")) {
            if (pathSegment?.length === 0)
              continue;
            if (pathSegment === ".")
              continue;
            if (pathSegment === "..") {
              normalizedPathSegments.pop();
            } else {
              normalizedPathSegments.push(pathSegment);
            }
          }
          const normalizedPath = `${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`;
          const doubleEncoded = escapeUri(normalizedPath);
          return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
      }
      validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") {
          throw new Error("Resolved credential object is not valid");
        }
      }
      formatDate(now) {
        const longDate = iso8601(now).replace(/[\-:]/g, "");
        return {
          longDate,
          shortDate: longDate.slice(0, 8)
        };
      }
      getCanonicalHeaderList(headers) {
        return Object.keys(headers).sort().join(";");
      }
    };
  }
});
var signingKeyCache;
var cacheQueue;
var createScope;
var getSigningKey;
var hmac;
var init_credentialDerivation = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    init_constants5();
    signingKeyCache = {};
    cacheQueue = [];
    createScope = /* @__PURE__ */ __name2((shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`, "createScope");
    getSigningKey = /* @__PURE__ */ __name2(async (sha256Constructor, credentials, shortDate, region, service) => {
      const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
      const cacheKey = `${shortDate}:${region}:${service}:${toHex(credsHash)}:${credentials.sessionToken}`;
      if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
      }
      cacheQueue.push(cacheKey);
      while (cacheQueue.length > MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
      }
      let key = `AWS4${credentials.secretAccessKey}`;
      for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
      }
      return signingKeyCache[cacheKey] = key;
    }, "getSigningKey");
    hmac = /* @__PURE__ */ __name2((ctor, secret, data) => {
      const hash = new ctor(secret);
      hash.update(toUint8Array(data));
      return hash.digest();
    }, "hmac");
  }
});
var getCanonicalHeaders;
var init_getCanonicalHeaders = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_constants5();
    getCanonicalHeaders = /* @__PURE__ */ __name2(({ headers }, unsignableHeaders, signableHeaders) => {
      const canonical = {};
      for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == void 0) {
          continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || unsignableHeaders?.has(canonicalHeaderName) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
          if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
            continue;
          }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
      }
      return canonical;
    }, "getCanonicalHeaders");
  }
});
var getPayloadHash;
var init_getPayloadHash = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    init_constants5();
    getPayloadHash = /* @__PURE__ */ __name2(async ({ headers, body }, hashConstructor) => {
      for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === SHA256_HEADER) {
          return headers[headerName];
        }
      }
      if (body == void 0) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      } else if (typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update(toUint8Array(body));
        return toHex(await hashCtor.digest());
      }
      return UNSIGNED_PAYLOAD;
    }, "getPayloadHash");
  }
});
var hasHeader;
var init_headerUtil = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/headerUtil.js"() {
    init_functionsRoutes_0_9440137819328775();
    hasHeader = /* @__PURE__ */ __name2((soughtHeader, headers) => {
      soughtHeader = soughtHeader.toLowerCase();
      for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
          return true;
        }
      }
      return false;
    }, "hasHeader");
  }
});
var moveHeadersToQuery;
var init_moveHeadersToQuery = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    moveHeadersToQuery = /* @__PURE__ */ __name2((request, options = {}) => {
      const { headers, query = {} } = HttpRequest.clone(request);
      for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname) || options.hoistableHeaders?.has(lname)) {
          query[name] = headers[name];
          delete headers[name];
        }
      }
      return {
        ...request,
        headers,
        query
      };
    }, "moveHeadersToQuery");
  }
});
var prepareRequest;
var init_prepareRequest = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/prepareRequest.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_constants5();
    prepareRequest = /* @__PURE__ */ __name2((request) => {
      request = HttpRequest.clone(request);
      for (const headerName of Object.keys(request.headers)) {
        if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
          delete request.headers[headerName];
        }
      }
      return request;
    }, "prepareRequest");
  }
});
var SignatureV4;
var init_SignatureV4 = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/SignatureV4.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    init_HeaderFormatter();
    init_SignatureV4Base();
    init_constants5();
    init_credentialDerivation();
    init_getCanonicalHeaders();
    init_getPayloadHash();
    init_headerUtil();
    init_moveHeadersToQuery();
    init_prepareRequest();
    SignatureV4 = class extends SignatureV4Base {
      static {
        __name(this, "SignatureV4");
      }
      static {
        __name2(this, "SignatureV4");
      }
      headerFormatter = new HeaderFormatter();
      constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
        super({
          applyChecksum,
          credentials,
          region,
          service,
          sha256,
          uriEscapePath
        });
      }
      async presign(originalRequest, options = {}) {
        const { signingDate = /* @__PURE__ */ new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { longDate, shortDate } = this.formatDate(signingDate);
        if (expiresIn > MAX_PRESIGNED_TTL) {
          return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
        }
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders, hoistableHeaders });
        if (credentials.sessionToken) {
          request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
        request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
        request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
        return request;
      }
      async sign(toSign, options) {
        if (typeof toSign === "string") {
          return this.signString(toSign, options);
        } else if (toSign.headers && toSign.payload) {
          return this.signEvent(toSign, options);
        } else if (toSign.message) {
          return this.signMessage(toSign, options);
        } else {
          return this.signRequest(toSign, options);
        }
      }
      async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService, eventStreamCredentials }) {
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate, longDate } = this.formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = toHex(await hash.digest());
        const stringToSign = [
          EVENT_ALGORITHM_IDENTIFIER,
          longDate,
          scope,
          priorSignature,
          hashedHeaders,
          hashedPayload
        ].join("\n");
        return this.signString(stringToSign, {
          signingDate,
          signingRegion: region,
          signingService,
          eventStreamCredentials
        });
      }
      async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, eventStreamCredentials }) {
        const promise = this.signEvent({
          headers: this.headerFormatter.format(signableMessage.message.headers),
          payload: signableMessage.message.body
        }, {
          signingDate,
          signingRegion,
          signingService,
          priorSignature: signableMessage.priorSignature,
          eventStreamCredentials
        });
        return promise.then((signature) => {
          return { message: signableMessage.message, signature };
        });
      }
      async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, eventStreamCredentials } = {}) {
        const credentials = eventStreamCredentials ?? await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate } = this.formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update(toUint8Array(stringToSign));
        return toHex(await hash.digest());
      }
      async signRequest(requestToSign, { signingDate = /* @__PURE__ */ new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const request = prepareRequest(requestToSign);
        const { longDate, shortDate } = this.formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        request.headers[AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
          request.headers[TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await getPayloadHash(request, this.sha256);
        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
          request.headers[SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
        return request;
      }
      async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
        const hash = new this.sha256(await keyPromise);
        hash.update(toUint8Array(stringToSign));
        return toHex(await hash.digest());
      }
      getSigningKey(credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
      }
    };
  }
});
var init_signature_v4a_container = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/signature-v4a-container.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_dist_es4 = __esm({
  "../node_modules/@smithy/signature-v4/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_SignatureV4();
    init_constants5();
    init_credentialDerivation();
    init_signature_v4a_container();
  }
});
function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider }) {
  let credentialsProvider;
  if (credentials) {
    if (!credentials?.memoized) {
      credentialsProvider = memoizeIdentityProvider(credentials, isIdentityExpired, doesIdentityRequireRefresh);
    } else {
      credentialsProvider = credentials;
    }
  } else {
    if (credentialDefaultProvider) {
      credentialsProvider = normalizeProvider2(credentialDefaultProvider(Object.assign({}, config, {
        parentClientConfig: config
      })));
    } else {
      credentialsProvider = /* @__PURE__ */ __name2(async () => {
        throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
      }, "credentialsProvider");
    }
  }
  credentialsProvider.memoized = true;
  return credentialsProvider;
}
__name(normalizeCredentialProvider, "normalizeCredentialProvider");
function bindCallerConfig(config, credentialsProvider) {
  if (credentialsProvider.configBound) {
    return credentialsProvider;
  }
  const fn = /* @__PURE__ */ __name2(async (options) => credentialsProvider({ ...options, callerClientConfig: config }), "fn");
  fn.memoized = credentialsProvider.memoized;
  fn.configBound = true;
  return fn;
}
__name(bindCallerConfig, "bindCallerConfig");
var resolveAwsSdkSigV4Config;
var init_resolveAwsSdkSigV4Config = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser6();
    init_dist_es3();
    init_dist_es4();
    resolveAwsSdkSigV4Config = /* @__PURE__ */ __name2((config) => {
      let inputCredentials = config.credentials;
      let isUserSupplied = !!config.credentials;
      let resolvedCredentials = void 0;
      Object.defineProperty(config, "credentials", {
        set(credentials) {
          if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) {
            isUserSupplied = true;
          }
          inputCredentials = credentials;
          const memoizedProvider = normalizeCredentialProvider(config, {
            credentials: inputCredentials,
            credentialDefaultProvider: config.credentialDefaultProvider
          });
          const boundProvider = bindCallerConfig(config, memoizedProvider);
          if (isUserSupplied && !boundProvider.attributed) {
            const isCredentialObject = typeof inputCredentials === "object" && inputCredentials !== null;
            resolvedCredentials = /* @__PURE__ */ __name2(async (options) => {
              const creds = await boundProvider(options);
              const attributedCreds = creds;
              if (isCredentialObject && (!attributedCreds.$source || Object.keys(attributedCreds.$source).length === 0)) {
                return setCredentialFeature(attributedCreds, "CREDENTIALS_CODE", "e");
              }
              return attributedCreds;
            }, "resolvedCredentials");
            resolvedCredentials.memoized = boundProvider.memoized;
            resolvedCredentials.configBound = boundProvider.configBound;
            resolvedCredentials.attributed = true;
          } else {
            resolvedCredentials = boundProvider;
          }
        },
        get() {
          return resolvedCredentials;
        },
        enumerable: true,
        configurable: true
      });
      config.credentials = inputCredentials;
      const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256 } = config;
      let signer;
      if (config.signer) {
        signer = normalizeProvider2(config.signer);
      } else if (config.regionInfoProvider) {
        signer = /* @__PURE__ */ __name2(() => normalizeProvider2(config.region)().then(async (region) => [
          await config.regionInfoProvider(region, {
            useFipsEndpoint: await config.useFipsEndpoint(),
            useDualstackEndpoint: await config.useDualstackEndpoint()
          }) || {},
          region
        ]).then(([regionInfo, region]) => {
          const { signingRegion, signingService } = regionInfo;
          config.signingRegion = config.signingRegion || signingRegion || region;
          config.signingName = config.signingName || signingService || config.serviceId;
          const params = {
            ...config,
            credentials: config.credentials,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath
          };
          const SignerCtor = config.signerConstructor || SignatureV4;
          return new SignerCtor(params);
        }), "signer");
      } else {
        signer = /* @__PURE__ */ __name2(async (authScheme) => {
          authScheme = Object.assign({}, {
            name: "sigv4",
            signingName: config.signingName || config.defaultSigningName,
            signingRegion: await normalizeProvider2(config.region)(),
            properties: {}
          }, authScheme);
          const signingRegion = authScheme.signingRegion;
          const signingService = authScheme.signingName;
          config.signingRegion = config.signingRegion || signingRegion;
          config.signingName = config.signingName || signingService || config.serviceId;
          const params = {
            ...config,
            credentials: config.credentials,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath
          };
          const SignerCtor = config.signerConstructor || SignatureV4;
          return new SignerCtor(params);
        }, "signer");
      }
      const resolvedConfig = Object.assign(config, {
        systemClockOffset,
        signingEscapePath,
        signer
      });
      return resolvedConfig;
    }, "resolveAwsSdkSigV4Config");
    __name2(normalizeCredentialProvider, "normalizeCredentialProvider");
    __name2(bindCallerConfig, "bindCallerConfig");
  }
});
var init_aws_sdk = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_AwsSdkSigV4Signer();
    init_NODE_AUTH_SCHEME_PREFERENCE_OPTIONS();
    init_resolveAwsSdkSigV4AConfig();
    init_resolveAwsSdkSigV4Config();
  }
});
var init_httpAuthSchemes2 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_aws_sdk();
    init_getBearerTokenEnvKey();
  }
});
function createAwsAuthSigv4HttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "ses",
      region: authParameters.region
    },
    propertiesExtractor: /* @__PURE__ */ __name2((config, context) => ({
      signingProperties: {
        config,
        context
      }
    }), "propertiesExtractor")
  };
}
__name(createAwsAuthSigv4HttpAuthOption, "createAwsAuthSigv4HttpAuthOption");
var defaultSESHttpAuthSchemeParametersProvider;
var defaultSESHttpAuthSchemeProvider;
var resolveHttpAuthSchemeConfig;
var init_httpAuthSchemeProvider = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/auth/httpAuthSchemeProvider.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpAuthSchemes2();
    init_client3();
    defaultSESHttpAuthSchemeParametersProvider = /* @__PURE__ */ __name2(async (config, context, input) => {
      return {
        operation: getSmithyContext(context).operation,
        region: await normalizeProvider(config.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
      };
    }, "defaultSESHttpAuthSchemeParametersProvider");
    __name2(createAwsAuthSigv4HttpAuthOption, "createAwsAuthSigv4HttpAuthOption");
    defaultSESHttpAuthSchemeProvider = /* @__PURE__ */ __name2((authParameters) => {
      const options = [];
      switch (authParameters.operation) {
        default: {
          options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
      }
      return options;
    }, "defaultSESHttpAuthSchemeProvider");
    resolveHttpAuthSchemeConfig = /* @__PURE__ */ __name2((config) => {
      const config_0 = resolveAwsSdkSigV4Config(config);
      return Object.assign(config_0, {
        authSchemePreference: normalizeProvider(config.authSchemePreference ?? [])
      });
    }, "resolveHttpAuthSchemeConfig");
  }
});
var resolveClientEndpointParameters;
var commonParams;
var init_EndpointParameters = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/endpoint/EndpointParameters.js"() {
    init_functionsRoutes_0_9440137819328775();
    resolveClientEndpointParameters = /* @__PURE__ */ __name2((options) => {
      return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "ses"
      });
    }, "resolveClientEndpointParameters");
    commonParams = {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
    };
  }
});
var package_default;
var init_package = __esm({
  "../node_modules/@aws-sdk/client-ses/package.json"() {
    package_default = {
      name: "@aws-sdk/client-ses",
      description: "AWS SDK for JavaScript Ses Client for Node.js, Browser and React Native",
      version: "3.1073.0",
      scripts: {
        build: "concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
        "build:cjs": "node ../../scripts/compilation/inline",
        "build:es": "premove dist-es && tsc -p tsconfig.es.json",
        "build:include:deps": 'yarn g:turbo run build -F="$npm_package_name"',
        "build:types": "premove dist-types && tsc -p tsconfig.types.json",
        "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
        clean: "premove dist-cjs dist-es dist-types",
        "extract:docs": "api-extractor run --local",
        "generate:client": "node ../../scripts/generate-clients/single-service",
        test: "yarn g:vitest run --passWithNoTests",
        "test:watch": "yarn g:vitest watch --passWithNoTests",
        "test:integration": "yarn g:vitest run --passWithNoTests -c vitest.config.integ.mts",
        "test:integration:watch": "yarn g:vitest watch --passWithNoTests -c vitest.config.integ.mts",
        "test:e2e": "yarn g:vitest run -c vitest.config.e2e.mts",
        "test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.mts",
        "test:index": "tsc --noEmit ./test/index-types.ts && node ./test/index-objects.spec.mjs"
      },
      main: "./dist-cjs/index.js",
      types: "./dist-types/index.d.ts",
      module: "./dist-es/index.js",
      sideEffects: false,
      dependencies: {
        "@aws-crypto/sha256-browser": "5.2.0",
        "@aws-crypto/sha256-js": "5.2.0",
        "@aws-sdk/core": "^3.974.22",
        "@aws-sdk/credential-provider-node": "^3.972.57",
        "@aws-sdk/types": "^3.973.13",
        "@smithy/core": "^3.24.6",
        "@smithy/fetch-http-handler": "^5.4.6",
        "@smithy/node-http-handler": "^4.7.6",
        "@smithy/types": "^4.14.3",
        tslib: "^2.6.2"
      },
      devDependencies: {
        "@smithy/snapshot-testing": "^2.1.7",
        "@tsconfig/node20": "20.1.8",
        "@types/node": "^20.14.8",
        concurrently: "7.0.0",
        "downlevel-dts": "0.10.1",
        premove: "4.0.0",
        typescript: "~5.8.3",
        vitest: "^4.0.17"
      },
      engines: {
        node: ">=20.0.0"
      },
      typesVersions: {
        "<4.5": {
          "dist-types/*": [
            "dist-types/ts3.4/*"
          ]
        }
      },
      files: [
        "dist-*/**"
      ],
      author: {
        name: "AWS SDK for JavaScript Team",
        url: "https://aws.amazon.com/sdk-for-javascript/"
      },
      license: "Apache-2.0",
      browser: {
        "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
      },
      "react-native": {
        "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
      },
      homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-ses",
      repository: {
        type: "git",
        url: "https://github.com/aws/aws-sdk-js-v3.git",
        directory: "clients/client-ses"
      }
    };
  }
});
var SHA_256_HASH;
var SHA_256_HMAC_ALGO;
var EMPTY_DATA_SHA_256;
var init_constants6 = __esm({
  "../node_modules/@aws-crypto/sha256-browser/build/module/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    SHA_256_HASH = { name: "SHA-256" };
    SHA_256_HMAC_ALGO = {
      name: "HMAC",
      hash: SHA_256_HASH
    };
    EMPTY_DATA_SHA_256 = new Uint8Array([
      227,
      176,
      196,
      66,
      152,
      252,
      28,
      20,
      154,
      251,
      244,
      200,
      153,
      111,
      185,
      36,
      39,
      174,
      65,
      228,
      100,
      155,
      147,
      76,
      164,
      149,
      153,
      27,
      120,
      82,
      184,
      85
    ]);
  }
});
function locateWindow() {
  if (typeof window !== "undefined") {
    return window;
  } else if (typeof self !== "undefined") {
    return self;
  }
  return fallbackWindow;
}
__name(locateWindow, "locateWindow");
var fallbackWindow;
var init_dist_es5 = __esm({
  "../node_modules/@aws-sdk/util-locate-window/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    fallbackWindow = {};
    __name2(locateWindow, "locateWindow");
  }
});
var Sha256;
var init_webCryptoSha256 = __esm({
  "../node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_module();
    init_constants6();
    init_dist_es5();
    Sha256 = /** @class */
    (function() {
      function Sha2564(secret) {
        this.toHash = new Uint8Array(0);
        this.secret = secret;
        this.reset();
      }
      __name(Sha2564, "Sha2564");
      __name2(Sha2564, "Sha256");
      Sha2564.prototype.update = function(data) {
        if (isEmptyData(data)) {
          return;
        }
        var update = convertToBuffer(data);
        var typedArray = new Uint8Array(this.toHash.byteLength + update.byteLength);
        typedArray.set(this.toHash, 0);
        typedArray.set(update, this.toHash.byteLength);
        this.toHash = typedArray;
      };
      Sha2564.prototype.digest = function() {
        var _this = this;
        if (this.key) {
          return this.key.then(function(key) {
            return locateWindow().crypto.subtle.sign(SHA_256_HMAC_ALGO, key, _this.toHash).then(function(data) {
              return new Uint8Array(data);
            });
          });
        }
        if (isEmptyData(this.toHash)) {
          return Promise.resolve(EMPTY_DATA_SHA_256);
        }
        return Promise.resolve().then(function() {
          return locateWindow().crypto.subtle.digest(SHA_256_HASH, _this.toHash);
        }).then(function(data) {
          return Promise.resolve(new Uint8Array(data));
        });
      };
      Sha2564.prototype.reset = function() {
        var _this = this;
        this.toHash = new Uint8Array(0);
        if (this.secret && this.secret !== void 0) {
          this.key = new Promise(function(resolve, reject) {
            locateWindow().crypto.subtle.importKey("raw", convertToBuffer(_this.secret), SHA_256_HMAC_ALGO, false, ["sign"]).then(resolve, reject);
          });
          this.key.catch(function() {
          });
        }
      };
      return Sha2564;
    })();
  }
});
var BLOCK_SIZE;
var DIGEST_LENGTH;
var KEY;
var INIT;
var MAX_HASHABLE_LENGTH;
var init_constants7 = __esm({
  "../node_modules/@aws-crypto/sha256-js/build/module/constants.js"() {
    init_functionsRoutes_0_9440137819328775();
    BLOCK_SIZE = 64;
    DIGEST_LENGTH = 32;
    KEY = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    INIT = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ];
    MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
  }
});
var RawSha256;
var init_RawSha256 = __esm({
  "../node_modules/@aws-crypto/sha256-js/build/module/RawSha256.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_constants7();
    RawSha256 = /** @class */
    (function() {
      function RawSha2562() {
        this.state = Int32Array.from(INIT);
        this.temp = new Int32Array(64);
        this.buffer = new Uint8Array(64);
        this.bufferLength = 0;
        this.bytesHashed = 0;
        this.finished = false;
      }
      __name(RawSha2562, "RawSha2562");
      __name2(RawSha2562, "RawSha256");
      RawSha2562.prototype.update = function(data) {
        if (this.finished) {
          throw new Error("Attempted to update an already finished hash.");
        }
        var position = 0;
        var byteLength = data.byteLength;
        this.bytesHashed += byteLength;
        if (this.bytesHashed * 8 > MAX_HASHABLE_LENGTH) {
          throw new Error("Cannot hash more than 2^53 - 1 bits");
        }
        while (byteLength > 0) {
          this.buffer[this.bufferLength++] = data[position++];
          byteLength--;
          if (this.bufferLength === BLOCK_SIZE) {
            this.hashBuffer();
            this.bufferLength = 0;
          }
        }
      };
      RawSha2562.prototype.digest = function() {
        if (!this.finished) {
          var bitsHashed = this.bytesHashed * 8;
          var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
          var undecoratedLength = this.bufferLength;
          bufferView.setUint8(this.bufferLength++, 128);
          if (undecoratedLength % BLOCK_SIZE >= BLOCK_SIZE - 8) {
            for (var i2 = this.bufferLength; i2 < BLOCK_SIZE; i2++) {
              bufferView.setUint8(i2, 0);
            }
            this.hashBuffer();
            this.bufferLength = 0;
          }
          for (var i2 = this.bufferLength; i2 < BLOCK_SIZE - 8; i2++) {
            bufferView.setUint8(i2, 0);
          }
          bufferView.setUint32(BLOCK_SIZE - 8, Math.floor(bitsHashed / 4294967296), true);
          bufferView.setUint32(BLOCK_SIZE - 4, bitsHashed);
          this.hashBuffer();
          this.finished = true;
        }
        var out = new Uint8Array(DIGEST_LENGTH);
        for (var i2 = 0; i2 < 8; i2++) {
          out[i2 * 4] = this.state[i2] >>> 24 & 255;
          out[i2 * 4 + 1] = this.state[i2] >>> 16 & 255;
          out[i2 * 4 + 2] = this.state[i2] >>> 8 & 255;
          out[i2 * 4 + 3] = this.state[i2] >>> 0 & 255;
        }
        return out;
      };
      RawSha2562.prototype.hashBuffer = function() {
        var _a = this, buffer = _a.buffer, state = _a.state;
        var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
        for (var i2 = 0; i2 < BLOCK_SIZE; i2++) {
          if (i2 < 16) {
            this.temp[i2] = (buffer[i2 * 4] & 255) << 24 | (buffer[i2 * 4 + 1] & 255) << 16 | (buffer[i2 * 4 + 2] & 255) << 8 | buffer[i2 * 4 + 3] & 255;
          } else {
            var u = this.temp[i2 - 2];
            var t1_1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
            u = this.temp[i2 - 15];
            var t2_1 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
            this.temp[i2] = (t1_1 + this.temp[i2 - 7] | 0) + (t2_1 + this.temp[i2 - 16] | 0);
          }
          var t1 = (((state4 >>> 6 | state4 << 26) ^ (state4 >>> 11 | state4 << 21) ^ (state4 >>> 25 | state4 << 7)) + (state4 & state5 ^ ~state4 & state6) | 0) + (state7 + (KEY[i2] + this.temp[i2] | 0) | 0) | 0;
          var t2 = ((state0 >>> 2 | state0 << 30) ^ (state0 >>> 13 | state0 << 19) ^ (state0 >>> 22 | state0 << 10)) + (state0 & state1 ^ state0 & state2 ^ state1 & state2) | 0;
          state7 = state6;
          state6 = state5;
          state5 = state4;
          state4 = state3 + t1 | 0;
          state3 = state2;
          state2 = state1;
          state1 = state0;
          state0 = t1 + t2 | 0;
        }
        state[0] += state0;
        state[1] += state1;
        state[2] += state2;
        state[3] += state3;
        state[4] += state4;
        state[5] += state5;
        state[6] += state6;
        state[7] += state7;
      };
      return RawSha2562;
    })();
  }
});
function bufferFromSecret(secret) {
  var input = convertToBuffer(secret);
  if (input.byteLength > BLOCK_SIZE) {
    var bufferHash = new RawSha256();
    bufferHash.update(input);
    input = bufferHash.digest();
  }
  var buffer = new Uint8Array(BLOCK_SIZE);
  buffer.set(input);
  return buffer;
}
__name(bufferFromSecret, "bufferFromSecret");
var Sha2562;
var init_jsSha256 = __esm({
  "../node_modules/@aws-crypto/sha256-js/build/module/jsSha256.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_tslib_es6();
    init_constants7();
    init_RawSha256();
    init_module();
    Sha2562 = /** @class */
    (function() {
      function Sha2564(secret) {
        this.secret = secret;
        this.hash = new RawSha256();
        this.reset();
      }
      __name(Sha2564, "Sha2564");
      __name2(Sha2564, "Sha256");
      Sha2564.prototype.update = function(toHash) {
        if (isEmptyData(toHash) || this.error) {
          return;
        }
        try {
          this.hash.update(convertToBuffer(toHash));
        } catch (e2) {
          this.error = e2;
        }
      };
      Sha2564.prototype.digestSync = function() {
        if (this.error) {
          throw this.error;
        }
        if (this.outer) {
          if (!this.outer.finished) {
            this.outer.update(this.hash.digest());
          }
          return this.outer.digest();
        }
        return this.hash.digest();
      };
      Sha2564.prototype.digest = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            return [2, this.digestSync()];
          });
        });
      };
      Sha2564.prototype.reset = function() {
        this.hash = new RawSha256();
        if (this.secret) {
          this.outer = new RawSha256();
          var inner = bufferFromSecret(this.secret);
          var outer = new Uint8Array(BLOCK_SIZE);
          outer.set(inner);
          for (var i2 = 0; i2 < BLOCK_SIZE; i2++) {
            inner[i2] ^= 54;
            outer[i2] ^= 92;
          }
          this.hash.update(inner);
          this.outer.update(outer);
          for (var i2 = 0; i2 < inner.byteLength; i2++) {
            inner[i2] = 0;
          }
        }
      };
      return Sha2564;
    })();
    __name2(bufferFromSecret, "bufferFromSecret");
  }
});
var init_module3 = __esm({
  "../node_modules/@aws-crypto/sha256-js/build/module/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_jsSha256();
  }
});
function supportsWebCrypto(window2) {
  if (supportsSecureRandom(window2) && typeof window2.crypto.subtle === "object") {
    var subtle = window2.crypto.subtle;
    return supportsSubtleCrypto(subtle);
  }
  return false;
}
__name(supportsWebCrypto, "supportsWebCrypto");
function supportsSecureRandom(window2) {
  if (typeof window2 === "object" && typeof window2.crypto === "object") {
    var getRandomValues = window2.crypto.getRandomValues;
    return typeof getRandomValues === "function";
  }
  return false;
}
__name(supportsSecureRandom, "supportsSecureRandom");
function supportsSubtleCrypto(subtle) {
  return subtle && subtleCryptoMethods.every(function(methodName) {
    return typeof subtle[methodName] === "function";
  });
}
__name(supportsSubtleCrypto, "supportsSubtleCrypto");
var subtleCryptoMethods;
var init_supportsWebCrypto = __esm({
  "../node_modules/@aws-crypto/supports-web-crypto/build/module/supportsWebCrypto.js"() {
    init_functionsRoutes_0_9440137819328775();
    subtleCryptoMethods = [
      "decrypt",
      "digest",
      "encrypt",
      "exportKey",
      "generateKey",
      "importKey",
      "sign",
      "verify"
    ];
    __name2(supportsWebCrypto, "supportsWebCrypto");
    __name2(supportsSecureRandom, "supportsSecureRandom");
    __name2(supportsSubtleCrypto, "supportsSubtleCrypto");
  }
});
var init_module4 = __esm({
  "../node_modules/@aws-crypto/supports-web-crypto/build/module/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_supportsWebCrypto();
  }
});
var Sha2563;
var init_crossPlatformSha256 = __esm({
  "../node_modules/@aws-crypto/sha256-browser/build/module/crossPlatformSha256.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_webCryptoSha256();
    init_module3();
    init_module4();
    init_dist_es5();
    init_module();
    Sha2563 = /** @class */
    (function() {
      function Sha2564(secret) {
        if (supportsWebCrypto(locateWindow())) {
          this.hash = new Sha256(secret);
        } else {
          this.hash = new Sha2562(secret);
        }
      }
      __name(Sha2564, "Sha2564");
      __name2(Sha2564, "Sha256");
      Sha2564.prototype.update = function(data, encoding) {
        this.hash.update(convertToBuffer(data));
      };
      Sha2564.prototype.digest = function() {
        return this.hash.digest();
      };
      Sha2564.prototype.reset = function() {
        this.hash.reset();
      };
      return Sha2564;
    })();
  }
});
var init_module5 = __esm({
  "../node_modules/@aws-crypto/sha256-browser/build/module/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_crossPlatformSha256();
    init_webCryptoSha256();
  }
});
function createRequest(url, requestOptions) {
  return new Request(url, requestOptions);
}
__name(createRequest, "createRequest");
var init_create_request = __esm({
  "../node_modules/@smithy/fetch-http-handler/dist-es/create-request.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(createRequest, "createRequest");
  }
});
function requestTimeout(timeoutInMs = 0) {
  return new Promise((resolve, reject) => {
    if (timeoutInMs) {
      setTimeout(() => {
        const timeoutError = new Error(`Request did not complete within ${timeoutInMs} ms`);
        timeoutError.name = "TimeoutError";
        reject(timeoutError);
      }, timeoutInMs);
    }
  });
}
__name(requestTimeout, "requestTimeout");
var init_request_timeout = __esm({
  "../node_modules/@smithy/fetch-http-handler/dist-es/request-timeout.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(requestTimeout, "requestTimeout");
  }
});
function buildAbortError(abortSignal) {
  const reason = abortSignal && typeof abortSignal === "object" && "reason" in abortSignal ? abortSignal.reason : void 0;
  if (reason) {
    if (reason instanceof Error) {
      const abortError3 = new Error("Request aborted");
      abortError3.name = "AbortError";
      abortError3.cause = reason;
      return abortError3;
    }
    const abortError2 = new Error(String(reason));
    abortError2.name = "AbortError";
    return abortError2;
  }
  const abortError = new Error("Request aborted");
  abortError.name = "AbortError";
  return abortError;
}
__name(buildAbortError, "buildAbortError");
var keepAliveSupport;
var FetchHttpHandler;
var init_fetch_http_handler = __esm({
  "../node_modules/@smithy/fetch-http-handler/dist-es/fetch-http-handler.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_create_request();
    init_request_timeout();
    keepAliveSupport = {
      supported: void 0
    };
    FetchHttpHandler = class _FetchHttpHandler {
      static {
        __name(this, "_FetchHttpHandler");
      }
      static {
        __name2(this, "FetchHttpHandler");
      }
      config;
      configProvider;
      static create(instanceOrOptions) {
        if (typeof instanceOrOptions?.handle === "function") {
          return instanceOrOptions;
        }
        return new _FetchHttpHandler(instanceOrOptions);
      }
      constructor(options) {
        if (typeof options === "function") {
          this.configProvider = options().then((opts) => opts || {});
        } else {
          this.config = options ?? {};
          this.configProvider = Promise.resolve(this.config);
        }
        if (keepAliveSupport.supported === void 0) {
          keepAliveSupport.supported = Boolean(typeof Request !== "undefined" && "keepalive" in createRequest("https://[::1]"));
        }
      }
      destroy() {
      }
      async handle(request, { abortSignal, requestTimeout: requestTimeout2 } = {}) {
        if (!this.config) {
          this.config = await this.configProvider;
        }
        const requestTimeoutInMs = requestTimeout2 ?? this.config.requestTimeout;
        const keepAlive = this.config.keepAlive === true;
        const credentials = this.config.credentials;
        if (abortSignal?.aborted) {
          const abortError = buildAbortError(abortSignal);
          return Promise.reject(abortError);
        }
        let path = request.path;
        const queryString = buildQueryString(request.query || {});
        if (queryString) {
          path += `?${queryString}`;
        }
        if (request.fragment) {
          path += `#${request.fragment}`;
        }
        let auth = "";
        if (request.username != null || request.password != null) {
          const username = request.username ?? "";
          const password = request.password ?? "";
          auth = `${username}:${password}@`;
        }
        const { port, method } = request;
        const url = `${request.protocol}//${auth}${request.hostname}${port ? `:${port}` : ""}${path}`;
        const body = method === "GET" || method === "HEAD" ? void 0 : request.body;
        const requestOptions = {
          body,
          headers: new Headers(request.headers),
          method,
          credentials
        };
        if (this.config?.cache) {
          requestOptions.cache = this.config.cache;
        }
        if (body) {
          requestOptions.duplex = "half";
        }
        if (typeof AbortController !== "undefined") {
          requestOptions.signal = abortSignal;
        }
        if (keepAliveSupport.supported) {
          requestOptions.keepalive = keepAlive;
        }
        if (typeof this.config.requestInit === "function") {
          Object.assign(requestOptions, this.config.requestInit(request));
        }
        let removeSignalEventListener = /* @__PURE__ */ __name2(() => {
        }, "removeSignalEventListener");
        const fetchRequest = createRequest(url, requestOptions);
        const raceOfPromises = [
          fetch(fetchRequest).then((response) => {
            const fetchHeaders = response.headers;
            const transformedHeaders = {};
            for (const pair of fetchHeaders.entries()) {
              transformedHeaders[pair[0]] = pair[1];
            }
            const hasReadableStream = response.body != void 0;
            if (!hasReadableStream) {
              return response.blob().then((body2) => ({
                response: new HttpResponse({
                  headers: transformedHeaders,
                  reason: response.statusText,
                  statusCode: response.status,
                  body: body2
                })
              }));
            }
            return {
              response: new HttpResponse({
                headers: transformedHeaders,
                reason: response.statusText,
                statusCode: response.status,
                body: response.body
              })
            };
          }),
          requestTimeout(requestTimeoutInMs)
        ];
        if (abortSignal) {
          raceOfPromises.push(new Promise((resolve, reject) => {
            const onAbort = /* @__PURE__ */ __name2(() => {
              const abortError = buildAbortError(abortSignal);
              reject(abortError);
            }, "onAbort");
            if (typeof abortSignal.addEventListener === "function") {
              const signal = abortSignal;
              signal.addEventListener("abort", onAbort, { once: true });
              removeSignalEventListener = /* @__PURE__ */ __name2(() => signal.removeEventListener("abort", onAbort), "removeSignalEventListener");
            } else {
              abortSignal.onabort = onAbort;
            }
          }));
        }
        return Promise.race(raceOfPromises).finally(removeSignalEventListener);
      }
      updateHttpClientConfig(key, value) {
        this.config = void 0;
        this.configProvider = this.configProvider.then((config) => {
          config[key] = value;
          return config;
        });
      }
      httpHandlerConfigs() {
        return this.config ?? {};
      }
    };
    __name2(buildAbortError, "buildAbortError");
  }
});
async function collectBlob(blob) {
  const base64 = await readToBase64(blob);
  const arrayBuffer = fromBase64(base64);
  return new Uint8Array(arrayBuffer);
}
__name(collectBlob, "collectBlob");
async function collectStream(stream) {
  const chunks = [];
  const reader = stream.getReader();
  let isDone = false;
  let length = 0;
  while (!isDone) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value);
      length += value.length;
    }
    isDone = done;
  }
  const collected = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    collected.set(chunk, offset);
    offset += chunk.length;
  }
  return collected;
}
__name(collectStream, "collectStream");
function readToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState !== 2) {
        return reject(new Error("Reader aborted too early"));
      }
      const result = reader.result ?? "";
      const commaIndex = result.indexOf(",");
      const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
      resolve(result.substring(dataOffset));
    };
    reader.onabort = () => reject(new Error("Read aborted"));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
__name(readToBase64, "readToBase64");
var streamCollector;
var init_stream_collector = __esm({
  "../node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser2();
    streamCollector = /* @__PURE__ */ __name2(async (stream) => {
      if (typeof Blob === "function" && stream instanceof Blob || stream.constructor?.name === "Blob") {
        if (Blob.prototype.arrayBuffer !== void 0) {
          return new Uint8Array(await stream.arrayBuffer());
        }
        return collectBlob(stream);
      }
      return collectStream(stream);
    }, "streamCollector");
    __name2(collectBlob, "collectBlob");
    __name2(collectStream, "collectStream");
    __name2(readToBase64, "readToBase64");
  }
});
var init_dist_es6 = __esm({
  "../node_modules/@smithy/fetch-http-handler/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_fetch_http_handler();
    init_stream_collector();
  }
});
var ProtocolLib;
var init_ProtocolLib = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/ProtocolLib.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_schema2();
    ProtocolLib = class {
      static {
        __name(this, "ProtocolLib");
      }
      static {
        __name2(this, "ProtocolLib");
      }
      queryCompat;
      errorRegistry;
      constructor(queryCompat = false) {
        this.queryCompat = queryCompat;
      }
      resolveRestContentType(defaultContentType, inputSchema) {
        const members = inputSchema.getMemberSchemas();
        const httpPayloadMember = Object.values(members).find((m) => {
          return !!m.getMergedTraits().httpPayload;
        });
        if (httpPayloadMember) {
          const mediaType = httpPayloadMember.getMergedTraits().mediaType;
          if (mediaType) {
            return mediaType;
          } else if (httpPayloadMember.isStringSchema()) {
            return "text/plain";
          } else if (httpPayloadMember.isBlobSchema()) {
            return "application/octet-stream";
          } else {
            return defaultContentType;
          }
        } else if (!inputSchema.isUnitSchema()) {
          const hasBody = Object.values(members).find((m) => {
            const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m.getMergedTraits();
            const noPrefixHeaders = httpPrefixHeaders === void 0;
            return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && noPrefixHeaders;
          });
          if (hasBody) {
            return defaultContentType;
          }
        }
      }
      async getErrorSchemaOrThrowBaseException(errorIdentifier, defaultNamespace, response, dataObject, metadata, getErrorSchema) {
        let errorName = errorIdentifier;
        if (errorIdentifier.includes("#")) {
          [, errorName] = errorIdentifier.split("#");
        }
        const errorMetadata = {
          $metadata: metadata,
          $fault: response.statusCode < 500 ? "client" : "server"
        };
        if (!this.errorRegistry) {
          throw new Error("@aws-sdk/core/protocols - error handler not initialized.");
        }
        try {
          const errorSchema = getErrorSchema?.(this.errorRegistry, errorName) ?? this.errorRegistry.getSchema(errorIdentifier);
          return { errorSchema, errorMetadata };
        } catch (e2) {
          dataObject.message = dataObject.message ?? dataObject.Message ?? "UnknownError";
          const synthetic = this.errorRegistry;
          const baseExceptionSchema = synthetic.getBaseException();
          if (baseExceptionSchema) {
            const ErrorCtor = synthetic.getErrorCtor(baseExceptionSchema) ?? Error;
            throw this.decorateServiceException(Object.assign(new ErrorCtor({ name: errorName }), errorMetadata), dataObject);
          }
          const d2 = dataObject;
          const message = d2?.message ?? d2?.Message ?? d2?.Error?.Message ?? d2?.Error?.message;
          throw this.decorateServiceException(Object.assign(new Error(message), {
            name: errorName
          }, errorMetadata), dataObject);
        }
      }
      compose(composite, errorIdentifier, defaultNamespace) {
        let namespace = defaultNamespace;
        if (errorIdentifier.includes("#")) {
          [namespace] = errorIdentifier.split("#");
        }
        const staticRegistry = TypeRegistry.for(namespace);
        const defaultSyntheticRegistry = TypeRegistry.for("smithy.ts.sdk.synthetic." + defaultNamespace);
        composite.copyFrom(staticRegistry);
        composite.copyFrom(defaultSyntheticRegistry);
        this.errorRegistry = composite;
      }
      decorateServiceException(exception, additions = {}) {
        if (this.queryCompat) {
          const msg = exception.Message ?? additions.Message;
          const error = decorateServiceException(exception, additions);
          if (msg) {
            error.message = msg;
          }
          const errorObj = error.Error ?? {};
          errorObj.Type = error.Error?.Type;
          errorObj.Code = error.Error?.Code;
          errorObj.Message = error.Error?.message ?? error.Error?.Message ?? msg;
          error.Error = errorObj;
          const reqId = error.$metadata.requestId;
          if (reqId) {
            error.RequestId = reqId;
          }
          return error;
        }
        return decorateServiceException(exception, additions);
      }
      setQueryCompatError(output, response) {
        const queryErrorHeader = response.headers?.["x-amzn-query-error"];
        if (output !== void 0 && queryErrorHeader != null) {
          const [Code, Type] = queryErrorHeader.split(";");
          const keys = Object.keys(output);
          const Error2 = {
            Code,
            Type
          };
          output.Code = Code;
          output.Type = Type;
          for (let i2 = 0; i2 < keys.length; i2++) {
            const k2 = keys[i2];
            Error2[k2 === "message" ? "Message" : k2] = output[k2];
          }
          delete Error2.__type;
          output.Error = Error2;
        }
      }
      queryCompatOutput(queryCompatErrorData, errorData) {
        if (queryCompatErrorData.Error) {
          errorData.Error = queryCompatErrorData.Error;
        }
        if (queryCompatErrorData.Type) {
          errorData.Type = queryCompatErrorData.Type;
        }
        if (queryCompatErrorData.Code) {
          errorData.Code = queryCompatErrorData.Code;
        }
      }
      findQueryCompatibleError(registry, errorName) {
        try {
          return registry.getSchema(errorName);
        } catch (e2) {
          return registry.find((schema) => NormalizedSchema.of(schema).getMergedTraits().awsQueryError?.[0] === errorName);
        }
      }
    };
  }
});
var init_AwsSmithyRpcV2CborProtocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/cbor/AwsSmithyRpcV2CborProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_coercing_serializers = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/coercing-serializers.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var SerdeContextConfig;
var init_ConfigurableSerdeContext = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/ConfigurableSerdeContext.js"() {
    init_functionsRoutes_0_9440137819328775();
    SerdeContextConfig = class {
      static {
        __name(this, "SerdeContextConfig");
      }
      static {
        __name2(this, "SerdeContextConfig");
      }
      serdeContext;
      setSerdeContext(serdeContext) {
        this.serdeContext = serdeContext;
      }
    };
  }
});
var UnionSerde;
var init_UnionSerde = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/UnionSerde.js"() {
    init_functionsRoutes_0_9440137819328775();
    UnionSerde = class {
      static {
        __name(this, "UnionSerde");
      }
      static {
        __name2(this, "UnionSerde");
      }
      from;
      to;
      keys;
      constructor(from, to) {
        this.from = from;
        this.to = to;
        const keys = Object.keys(this.from);
        const set = new Set(keys);
        set.delete("__type");
        this.keys = set;
      }
      mark(key) {
        this.keys.delete(key);
      }
      hasUnknown() {
        return this.keys.size === 1 && Object.keys(this.to).length === 0;
      }
      writeUnknown() {
        if (this.hasUnknown()) {
          const k2 = this.keys.values().next().value;
          const v = this.from[k2];
          this.to.$unknown = [k2, v];
        }
      }
    };
  }
});
var init_parseJsonBody = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_JsonShapeDeserializer = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/JsonShapeDeserializer.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_JsonShapeSerializer = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/JsonShapeSerializer.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_JsonCodec = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/JsonCodec.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_AwsJsonRpcProtocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/AwsJsonRpcProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_AwsJson1_0Protocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/AwsJson1_0Protocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_AwsJson1_1Protocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/AwsJson1_1Protocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_AwsRestJsonProtocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/AwsRestJsonProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_awsExpectUnion = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/awsExpectUnion.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_XmlText = __esm({
  "../node_modules/@aws-sdk/xml-builder/dist-es/XmlText.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_XmlNode = __esm({
  "../node_modules/@aws-sdk/xml-builder/dist-es/XmlNode.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
function parseXML(xmlString) {
  if (!parser) {
    parser = new DOMParser();
  }
  const xmlDocument = parser.parseFromString(xmlString, "application/xml");
  if (xmlDocument.getElementsByTagName("parsererror").length > 0) {
    throw new Error("DOMParser XML parsing error.");
  }
  const xmlToObj = /* @__PURE__ */ __name2((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent?.trim()) {
        return node.textContent;
      }
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node;
      if (element.attributes.length === 0 && element.childNodes.length === 0) {
        return "";
      }
      const obj = {};
      const attributes = Array.from(element.attributes);
      for (const attr of attributes) {
        obj[`${attr.name}`] = attr.value;
      }
      const childNodes = Array.from(element.childNodes);
      for (const child of childNodes) {
        const childResult = xmlToObj(child);
        if (childResult != null) {
          const childName = child.nodeName;
          if (childNodes.length === 1 && attributes.length === 0 && childName === "#text") {
            return childResult;
          }
          if (obj[childName]) {
            if (Array.isArray(obj[childName])) {
              obj[childName].push(childResult);
            } else {
              obj[childName] = [obj[childName], childResult];
            }
          } else {
            obj[childName] = childResult;
          }
        } else if (childNodes.length === 1 && attributes.length === 0) {
          return element.textContent;
        }
      }
      return obj;
    }
    return null;
  }, "xmlToObj");
  return {
    [xmlDocument.documentElement.nodeName]: xmlToObj(xmlDocument.documentElement)
  };
}
__name(parseXML, "parseXML");
var parser;
var init_xml_parser_browser = __esm({
  "../node_modules/@aws-sdk/xml-builder/dist-es/xml-parser.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    __name2(parseXML, "parseXML");
  }
});
var init_dist_es7 = __esm({
  "../node_modules/@aws-sdk/xml-builder/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_XmlNode();
    init_XmlText();
    init_xml_parser_browser();
  }
});
var XmlShapeDeserializer;
var init_XmlShapeDeserializer = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlShapeDeserializer.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es7();
    init_client3();
    init_protocols();
    init_schema2();
    init_index_browser2();
    init_ConfigurableSerdeContext();
    init_UnionSerde();
    XmlShapeDeserializer = class extends SerdeContextConfig {
      static {
        __name(this, "XmlShapeDeserializer");
      }
      static {
        __name2(this, "XmlShapeDeserializer");
      }
      settings;
      stringDeserializer;
      constructor(settings) {
        super();
        this.settings = settings;
        this.stringDeserializer = new FromStringShapeDeserializer(settings);
      }
      setSerdeContext(serdeContext) {
        this.serdeContext = serdeContext;
        this.stringDeserializer.setSerdeContext(serdeContext);
      }
      read(schema, bytes, key) {
        const ns = NormalizedSchema.of(schema);
        const memberSchemas = ns.getMemberSchemas();
        const isEventPayload = ns.isStructSchema() && ns.isMemberSchema() && !!Object.values(memberSchemas).find((memberNs) => {
          return !!memberNs.getMemberTraits().eventPayload;
        });
        if (isEventPayload) {
          const output = {};
          const memberName = Object.keys(memberSchemas)[0];
          const eventMemberSchema = memberSchemas[memberName];
          if (eventMemberSchema.isBlobSchema()) {
            output[memberName] = bytes;
          } else {
            output[memberName] = this.read(memberSchemas[memberName], bytes);
          }
          return output;
        }
        const xmlString = (this.serdeContext?.utf8Encoder ?? toUtf8)(bytes);
        const parsedObject = this.parseXml(xmlString);
        return this.readSchema(schema, key ? parsedObject[key] : parsedObject);
      }
      readSchema(_schema, value) {
        const ns = NormalizedSchema.of(_schema);
        if (ns.isUnitSchema()) {
          return;
        }
        const traits = ns.getMergedTraits();
        if (ns.isListSchema() && !Array.isArray(value)) {
          return this.readSchema(ns, [value]);
        }
        if (value == null) {
          return value;
        }
        if (typeof value === "object") {
          const flat = !!traits.xmlFlattened;
          if (ns.isListSchema()) {
            const listValue = ns.getValueSchema();
            const buffer2 = [];
            const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
            const source = flat ? value : (value[0] ?? value)[sourceKey];
            if (source == null) {
              return buffer2;
            }
            const sourceArray = Array.isArray(source) ? source : [source];
            for (const v of sourceArray) {
              buffer2.push(this.readSchema(listValue, v));
            }
            return buffer2;
          }
          const buffer = {};
          if (ns.isMapSchema()) {
            const keyNs = ns.getKeySchema();
            const memberNs = ns.getValueSchema();
            let entries;
            if (flat) {
              entries = Array.isArray(value) ? value : [value];
            } else {
              entries = Array.isArray(value.entry) ? value.entry : [value.entry];
            }
            const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
            const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
            for (const entry of entries) {
              const key = entry[keyProperty];
              const value2 = entry[valueProperty];
              buffer[key] = this.readSchema(memberNs, value2);
            }
            return buffer;
          }
          if (ns.isStructSchema()) {
            const union = ns.isUnionSchema();
            let unionSerde;
            if (union) {
              unionSerde = new UnionSerde(value, buffer);
            }
            for (const [memberName, memberSchema] of ns.structIterator()) {
              const memberTraits = memberSchema.getMergedTraits();
              const xmlObjectKey = !memberTraits.httpPayload ? memberSchema.getMemberTraits().xmlName ?? memberName : memberTraits.xmlName ?? memberSchema.getName();
              if (union) {
                unionSerde.mark(xmlObjectKey);
              }
              if (value[xmlObjectKey] != null) {
                buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
              }
            }
            if (union) {
              unionSerde.writeUnknown();
            }
            return buffer;
          }
          if (ns.isDocumentSchema()) {
            return value;
          }
          throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
        }
        if (ns.isListSchema()) {
          return [];
        }
        if (ns.isMapSchema() || ns.isStructSchema()) {
          return {};
        }
        return this.stringDeserializer.read(ns, value);
      }
      parseXml(xml) {
        if (xml.length) {
          let parsedObj;
          try {
            parsedObj = parseXML(xml);
          } catch (e2) {
            if (e2 && typeof e2 === "object") {
              Object.defineProperty(e2, "$responseBodyText", {
                value: xml
              });
            }
            throw e2;
          }
          const textNodeName = "#text";
          const key = Object.keys(parsedObj)[0];
          const parsedObjToReturn = parsedObj[key];
          if (parsedObjToReturn[textNodeName]) {
            parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
            delete parsedObjToReturn[textNodeName];
          }
          return getValueFromTextNode(parsedObjToReturn);
        }
        return {};
      }
    };
  }
});
var QueryShapeSerializer;
var init_QueryShapeSerializer = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/query/QueryShapeSerializer.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_schema2();
    init_index_browser2();
    init_index_browser2();
    init_ConfigurableSerdeContext();
    QueryShapeSerializer = class extends SerdeContextConfig {
      static {
        __name(this, "QueryShapeSerializer");
      }
      static {
        __name2(this, "QueryShapeSerializer");
      }
      settings;
      buffer;
      constructor(settings) {
        super();
        this.settings = settings;
      }
      write(schema, value, prefix = "") {
        if (this.buffer === void 0) {
          this.buffer = "";
        }
        const ns = NormalizedSchema.of(schema);
        if (prefix && !prefix.endsWith(".")) {
          prefix += ".";
        }
        if (ns.isBlobSchema()) {
          if (typeof value === "string" || value instanceof Uint8Array) {
            this.writeKey(prefix);
            this.writeValue((this.serdeContext?.base64Encoder ?? toBase64)(value));
          }
        } else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
          if (value != null) {
            this.writeKey(prefix);
            this.writeValue(String(value));
          } else if (ns.isIdempotencyToken()) {
            this.writeKey(prefix);
            this.writeValue(generateIdempotencyToken());
          }
        } else if (ns.isBigIntegerSchema()) {
          if (value != null) {
            this.writeKey(prefix);
            this.writeValue(String(value));
          }
        } else if (ns.isBigDecimalSchema()) {
          if (value != null) {
            this.writeKey(prefix);
            this.writeValue(value instanceof NumericValue ? value.string : String(value));
          }
        } else if (ns.isTimestampSchema()) {
          if (value instanceof Date) {
            this.writeKey(prefix);
            const format2 = determineTimestampFormat(ns, this.settings);
            switch (format2) {
              case 5:
                this.writeValue(value.toISOString().replace(".000Z", "Z"));
                break;
              case 6:
                this.writeValue(dateToUtcString(value));
                break;
              case 7:
                this.writeValue(String(value.getTime() / 1e3));
                break;
            }
          }
        } else if (ns.isDocumentSchema()) {
          if (Array.isArray(value)) {
            this.write(64 | 15, value, prefix);
          } else if (value instanceof Date) {
            this.write(4, value, prefix);
          } else if (value instanceof Uint8Array) {
            this.write(21, value, prefix);
          } else if (value && typeof value === "object") {
            this.write(128 | 15, value, prefix);
          } else {
            this.writeKey(prefix);
            this.writeValue(String(value));
          }
        } else if (ns.isListSchema()) {
          if (Array.isArray(value)) {
            if (value.length === 0) {
              if (this.settings.serializeEmptyLists) {
                this.writeKey(prefix);
                this.writeValue("");
              }
            } else {
              const member2 = ns.getValueSchema();
              const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
              let i2 = 1;
              for (const item of value) {
                if (item == null) {
                  continue;
                }
                const traits = member2.getMergedTraits();
                const suffix = this.getKey("member", traits.xmlName, traits.ec2QueryName);
                const key = flat ? `${prefix}${i2}` : `${prefix}${suffix}.${i2}`;
                this.write(member2, item, key);
                ++i2;
              }
            }
          }
        } else if (ns.isMapSchema()) {
          if (value && typeof value === "object") {
            const keySchema = ns.getKeySchema();
            const memberSchema = ns.getValueSchema();
            const flat = ns.getMergedTraits().xmlFlattened;
            let i2 = 1;
            for (const k2 in value) {
              const v = value[k2];
              if (v == null) {
                continue;
              }
              const keyTraits = keySchema.getMergedTraits();
              const keySuffix = this.getKey("key", keyTraits.xmlName, keyTraits.ec2QueryName);
              const key = flat ? `${prefix}${i2}.${keySuffix}` : `${prefix}entry.${i2}.${keySuffix}`;
              const valTraits = memberSchema.getMergedTraits();
              const valueSuffix = this.getKey("value", valTraits.xmlName, valTraits.ec2QueryName);
              const valueKey = flat ? `${prefix}${i2}.${valueSuffix}` : `${prefix}entry.${i2}.${valueSuffix}`;
              this.write(keySchema, k2, key);
              this.write(memberSchema, v, valueKey);
              ++i2;
            }
          }
        } else if (ns.isStructSchema()) {
          if (value && typeof value === "object") {
            let didWriteMember = false;
            for (const [memberName, member2] of ns.structIterator()) {
              if (value[memberName] == null && !member2.isIdempotencyToken()) {
                continue;
              }
              const traits = member2.getMergedTraits();
              const suffix = this.getKey(memberName, traits.xmlName, traits.ec2QueryName, "struct");
              const key = `${prefix}${suffix}`;
              this.write(member2, value[memberName], key);
              didWriteMember = true;
            }
            if (!didWriteMember && ns.isUnionSchema()) {
              const { $unknown } = value;
              if (Array.isArray($unknown)) {
                const [k2, v] = $unknown;
                const key = `${prefix}${k2}`;
                this.write(15, v, key);
              }
            }
          }
        } else if (ns.isUnitSchema()) {
        } else {
          throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
        }
      }
      flush() {
        if (this.buffer === void 0) {
          throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
        }
        const str = this.buffer;
        delete this.buffer;
        return str;
      }
      getKey(memberName, xmlName, ec2QueryName, keySource) {
        const { ec2, capitalizeKeys } = this.settings;
        if (ec2 && ec2QueryName) {
          return ec2QueryName;
        }
        const key = xmlName ?? memberName;
        if (capitalizeKeys && keySource === "struct") {
          return key[0].toUpperCase() + key.slice(1);
        }
        return key;
      }
      writeKey(key) {
        if (key.endsWith(".")) {
          key = key.slice(0, key.length - 1);
        }
        this.buffer += `&${extendedEncodeURIComponent(key)}=`;
      }
      writeValue(value) {
        this.buffer += extendedEncodeURIComponent(value);
      }
    };
  }
});
var AwsQueryProtocol;
var init_AwsQueryProtocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/query/AwsQueryProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_protocols();
    init_schema2();
    init_ProtocolLib();
    init_XmlShapeDeserializer();
    init_QueryShapeSerializer();
    AwsQueryProtocol = class extends RpcProtocol {
      static {
        __name(this, "AwsQueryProtocol");
      }
      static {
        __name2(this, "AwsQueryProtocol");
      }
      options;
      serializer;
      deserializer;
      mixin = new ProtocolLib();
      constructor(options) {
        super({
          defaultNamespace: options.defaultNamespace,
          errorTypeRegistries: options.errorTypeRegistries
        });
        this.options = options;
        const settings = {
          timestampFormat: {
            useTrait: true,
            default: 5
          },
          httpBindings: false,
          xmlNamespace: options.xmlNamespace,
          serviceNamespace: options.defaultNamespace,
          serializeEmptyLists: true
        };
        this.serializer = new QueryShapeSerializer(settings);
        this.deserializer = new XmlShapeDeserializer(settings);
      }
      getShapeId() {
        return "aws.protocols#awsQuery";
      }
      setSerdeContext(serdeContext) {
        this.serializer.setSerdeContext(serdeContext);
        this.deserializer.setSerdeContext(serdeContext);
      }
      getPayloadCodec() {
        throw new Error("AWSQuery protocol has no payload codec.");
      }
      async serializeRequest(operationSchema, input, context) {
        const request = await super.serializeRequest(operationSchema, input, context);
        if (!request.path.endsWith("/")) {
          request.path += "/";
        }
        request.headers["content-type"] = "application/x-www-form-urlencoded";
        if (deref(operationSchema.input) === "unit" || !request.body) {
          request.body = "";
        }
        const action = operationSchema.name.split("#")[1] ?? operationSchema.name;
        request.body = `Action=${action}&Version=${this.options.version}` + request.body;
        if (request.body.endsWith("&")) {
          request.body = request.body.slice(-1);
        }
        return request;
      }
      async deserializeResponse(operationSchema, context, response) {
        const deserializer = this.deserializer;
        const ns = NormalizedSchema.of(operationSchema.output);
        const dataObject = {};
        if (response.statusCode >= 300) {
          const bytes2 = await collectBody(response.body, context);
          if (bytes2.byteLength > 0) {
            Object.assign(dataObject, await deserializer.read(15, bytes2));
          }
          await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        }
        for (const header in response.headers) {
          const value = response.headers[header];
          delete response.headers[header];
          response.headers[header.toLowerCase()] = value;
        }
        const shortName = operationSchema.name.split("#")[1] ?? operationSchema.name;
        const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? shortName + "Result" : void 0;
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
        }
        dataObject.$metadata = this.deserializeMetadata(response);
        return dataObject;
      }
      useNestedResult() {
        return true;
      }
      async handleError(operationSchema, context, response, dataObject, metadata) {
        const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
        this.mixin.compose(this.compositeErrorRegistry, errorIdentifier, this.options.defaultNamespace);
        const errorData = this.loadQueryError(dataObject) ?? {};
        const message = this.loadQueryErrorMessage(dataObject);
        errorData.message = message;
        errorData.Error = {
          Type: errorData.Type,
          Code: errorData.Code,
          Message: message
        };
        const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, errorData, metadata, this.mixin.findQueryCompatibleError);
        const ns = NormalizedSchema.of(errorSchema);
        const ErrorCtor = this.compositeErrorRegistry.getErrorCtor(errorSchema) ?? Error;
        const exception = new ErrorCtor({});
        const output = {
          Type: errorData.Error.Type,
          Code: errorData.Error.Code,
          Error: errorData.Error
        };
        for (const [name, member2] of ns.structIterator()) {
          const target = member2.getMergedTraits().xmlName ?? name;
          const value = errorData[target] ?? dataObject[target];
          output[name] = this.deserializer.readSchema(member2, value);
        }
        throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
          $fault: ns.getMergedTraits().error,
          message
        }, output), dataObject);
      }
      loadQueryErrorCode(output, data) {
        const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
        if (code !== void 0) {
          return code;
        }
        if (output.statusCode == 404) {
          return "NotFound";
        }
      }
      loadQueryError(data) {
        return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
      }
      loadQueryErrorMessage(data) {
        const errorData = this.loadQueryError(data);
        return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
      }
      getDefaultContentType() {
        return "application/x-www-form-urlencoded";
      }
    };
  }
});
var init_AwsEc2QueryProtocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/query/AwsEc2QueryProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_QuerySerializerSettings = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/query/QuerySerializerSettings.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_parseXmlBody = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/parseXmlBody.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_XmlShapeSerializer = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlShapeSerializer.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_XmlCodec = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlCodec.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_AwsRestXmlProtocol = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/AwsRestXmlProtocol.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_protocols2 = __esm({
  "../node_modules/@aws-sdk/core/dist-es/submodules/protocols/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_AwsSmithyRpcV2CborProtocol();
    init_coercing_serializers();
    init_AwsJson1_0Protocol();
    init_AwsJson1_1Protocol();
    init_AwsJsonRpcProtocol();
    init_AwsRestJsonProtocol();
    init_JsonCodec();
    init_JsonShapeDeserializer();
    init_JsonShapeSerializer();
    init_awsExpectUnion();
    init_parseJsonBody();
    init_AwsEc2QueryProtocol();
    init_AwsQueryProtocol();
    init_QuerySerializerSettings();
    init_QueryShapeSerializer();
    init_AwsRestXmlProtocol();
    init_XmlCodec();
    init_XmlShapeDeserializer();
    init_XmlShapeSerializer();
    init_parseXmlBody();
  }
});
var k;
var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var i;
var j;
var _data;
var root;
var r;
var nodes;
var bdd;
var init_bdd = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/endpoint/bdd.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser();
    k = "ref";
    a = -1;
    b = true;
    c = "isSet";
    d = "PartitionResult";
    e = "booleanEquals";
    f = "getAttr";
    g = { [k]: "Endpoint" };
    h = { [k]: d };
    i = {};
    j = [{ [k]: "Region" }];
    _data = {
      conditions: [
        [c, [g]],
        [c, j],
        ["aws.partition", j, d],
        [e, [{ [k]: "UseFIPS" }, b]],
        [e, [{ [k]: "UseDualStack" }, b]],
        [e, [{ fn: f, argv: [h, "supportsDualStack"] }, b]],
        [e, [{ fn: f, argv: [h, "supportsFIPS"] }, b]]
      ],
      results: [
        [a],
        [a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
        [a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
        [g, i],
        ["https://email-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
        [a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
        ["https://email-fips.{Region}.{PartitionResult#dnsSuffix}", i],
        [a, "FIPS is enabled but this partition does not support FIPS"],
        ["https://email.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
        [a, "DualStack is enabled but this partition does not support DualStack"],
        ["https://email.{Region}.{PartitionResult#dnsSuffix}", i],
        [a, "Invalid Configuration: Missing Region"]
      ]
    };
    root = 2;
    r = 1e8;
    nodes = new Int32Array([
      -1,
      1,
      -1,
      0,
      12,
      3,
      1,
      4,
      r + 11,
      2,
      5,
      r + 11,
      3,
      8,
      6,
      4,
      7,
      r + 10,
      5,
      r + 8,
      r + 9,
      4,
      10,
      9,
      6,
      r + 6,
      r + 7,
      5,
      11,
      r + 5,
      6,
      r + 4,
      r + 5,
      3,
      r + 1,
      13,
      4,
      r + 2,
      r + 3
    ]);
    bdd = BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
  }
});
var cache;
var defaultEndpointResolver;
var init_endpointResolver = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/endpoint/endpointResolver.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser6();
    init_index_browser();
    init_bdd();
    cache = new EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    });
    defaultEndpointResolver = /* @__PURE__ */ __name2((endpointParams, context = {}) => {
      return cache.get(endpointParams, () => decideEndpoint(bdd, {
        endpointParams,
        logger: context.logger
      }));
    }, "defaultEndpointResolver");
    customEndpointFunctions.aws = awsEndpointFunctions;
  }
});
var SESServiceException;
var init_SESServiceException = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/models/SESServiceException.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    SESServiceException = class _SESServiceException extends ServiceException {
      static {
        __name(this, "_SESServiceException");
      }
      static {
        __name2(this, "SESServiceException");
      }
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, _SESServiceException.prototype);
      }
    };
  }
});
var AccountSendingPausedException;
var AlreadyExistsException;
var CannotDeleteException;
var LimitExceededException;
var RuleSetDoesNotExistException;
var ConfigurationSetAlreadyExistsException;
var ConfigurationSetDoesNotExistException;
var ConfigurationSetSendingPausedException;
var InvalidConfigurationSetException;
var EventDestinationAlreadyExistsException;
var InvalidCloudWatchDestinationException;
var InvalidFirehoseDestinationException;
var InvalidSNSDestinationException;
var InvalidTrackingOptionsException;
var TrackingOptionsAlreadyExistsException;
var CustomVerificationEmailInvalidContentException;
var CustomVerificationEmailTemplateAlreadyExistsException;
var FromEmailAddressNotVerifiedException;
var InvalidLambdaFunctionException;
var InvalidS3ConfigurationException;
var InvalidSnsTopicException;
var RuleDoesNotExistException;
var InvalidTemplateException;
var CustomVerificationEmailTemplateDoesNotExistException;
var EventDestinationDoesNotExistException;
var TrackingOptionsDoesNotExistException;
var TemplateDoesNotExistException;
var InvalidDeliveryOptionsException;
var InvalidPolicyException;
var InvalidRenderingParameterException;
var MailFromDomainNotVerifiedException;
var MessageRejected;
var MissingRenderingAttributeException;
var ProductionAccessNotGrantedException;
var init_errors = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/models/errors.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_SESServiceException();
    AccountSendingPausedException = class _AccountSendingPausedException extends SESServiceException {
      static {
        __name(this, "_AccountSendingPausedException");
      }
      static {
        __name2(this, "AccountSendingPausedException");
      }
      name = "AccountSendingPausedException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "AccountSendingPausedException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _AccountSendingPausedException.prototype);
      }
    };
    AlreadyExistsException = class _AlreadyExistsException extends SESServiceException {
      static {
        __name(this, "_AlreadyExistsException");
      }
      static {
        __name2(this, "AlreadyExistsException");
      }
      name = "AlreadyExistsException";
      $fault = "client";
      Name;
      constructor(opts) {
        super({
          name: "AlreadyExistsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _AlreadyExistsException.prototype);
        this.Name = opts.Name;
      }
    };
    CannotDeleteException = class _CannotDeleteException extends SESServiceException {
      static {
        __name(this, "_CannotDeleteException");
      }
      static {
        __name2(this, "CannotDeleteException");
      }
      name = "CannotDeleteException";
      $fault = "client";
      Name;
      constructor(opts) {
        super({
          name: "CannotDeleteException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _CannotDeleteException.prototype);
        this.Name = opts.Name;
      }
    };
    LimitExceededException = class _LimitExceededException extends SESServiceException {
      static {
        __name(this, "_LimitExceededException");
      }
      static {
        __name2(this, "LimitExceededException");
      }
      name = "LimitExceededException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "LimitExceededException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _LimitExceededException.prototype);
      }
    };
    RuleSetDoesNotExistException = class _RuleSetDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_RuleSetDoesNotExistException");
      }
      static {
        __name2(this, "RuleSetDoesNotExistException");
      }
      name = "RuleSetDoesNotExistException";
      $fault = "client";
      Name;
      constructor(opts) {
        super({
          name: "RuleSetDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _RuleSetDoesNotExistException.prototype);
        this.Name = opts.Name;
      }
    };
    ConfigurationSetAlreadyExistsException = class _ConfigurationSetAlreadyExistsException extends SESServiceException {
      static {
        __name(this, "_ConfigurationSetAlreadyExistsException");
      }
      static {
        __name2(this, "ConfigurationSetAlreadyExistsException");
      }
      name = "ConfigurationSetAlreadyExistsException";
      $fault = "client";
      ConfigurationSetName;
      constructor(opts) {
        super({
          name: "ConfigurationSetAlreadyExistsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _ConfigurationSetAlreadyExistsException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
      }
    };
    ConfigurationSetDoesNotExistException = class _ConfigurationSetDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_ConfigurationSetDoesNotExistException");
      }
      static {
        __name2(this, "ConfigurationSetDoesNotExistException");
      }
      name = "ConfigurationSetDoesNotExistException";
      $fault = "client";
      ConfigurationSetName;
      constructor(opts) {
        super({
          name: "ConfigurationSetDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _ConfigurationSetDoesNotExistException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
      }
    };
    ConfigurationSetSendingPausedException = class _ConfigurationSetSendingPausedException extends SESServiceException {
      static {
        __name(this, "_ConfigurationSetSendingPausedException");
      }
      static {
        __name2(this, "ConfigurationSetSendingPausedException");
      }
      name = "ConfigurationSetSendingPausedException";
      $fault = "client";
      ConfigurationSetName;
      constructor(opts) {
        super({
          name: "ConfigurationSetSendingPausedException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _ConfigurationSetSendingPausedException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
      }
    };
    InvalidConfigurationSetException = class _InvalidConfigurationSetException extends SESServiceException {
      static {
        __name(this, "_InvalidConfigurationSetException");
      }
      static {
        __name2(this, "InvalidConfigurationSetException");
      }
      name = "InvalidConfigurationSetException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "InvalidConfigurationSetException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidConfigurationSetException.prototype);
      }
    };
    EventDestinationAlreadyExistsException = class _EventDestinationAlreadyExistsException extends SESServiceException {
      static {
        __name(this, "_EventDestinationAlreadyExistsException");
      }
      static {
        __name2(this, "EventDestinationAlreadyExistsException");
      }
      name = "EventDestinationAlreadyExistsException";
      $fault = "client";
      ConfigurationSetName;
      EventDestinationName;
      constructor(opts) {
        super({
          name: "EventDestinationAlreadyExistsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _EventDestinationAlreadyExistsException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
        this.EventDestinationName = opts.EventDestinationName;
      }
    };
    InvalidCloudWatchDestinationException = class _InvalidCloudWatchDestinationException extends SESServiceException {
      static {
        __name(this, "_InvalidCloudWatchDestinationException");
      }
      static {
        __name2(this, "InvalidCloudWatchDestinationException");
      }
      name = "InvalidCloudWatchDestinationException";
      $fault = "client";
      ConfigurationSetName;
      EventDestinationName;
      constructor(opts) {
        super({
          name: "InvalidCloudWatchDestinationException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidCloudWatchDestinationException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
        this.EventDestinationName = opts.EventDestinationName;
      }
    };
    InvalidFirehoseDestinationException = class _InvalidFirehoseDestinationException extends SESServiceException {
      static {
        __name(this, "_InvalidFirehoseDestinationException");
      }
      static {
        __name2(this, "InvalidFirehoseDestinationException");
      }
      name = "InvalidFirehoseDestinationException";
      $fault = "client";
      ConfigurationSetName;
      EventDestinationName;
      constructor(opts) {
        super({
          name: "InvalidFirehoseDestinationException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidFirehoseDestinationException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
        this.EventDestinationName = opts.EventDestinationName;
      }
    };
    InvalidSNSDestinationException = class _InvalidSNSDestinationException extends SESServiceException {
      static {
        __name(this, "_InvalidSNSDestinationException");
      }
      static {
        __name2(this, "InvalidSNSDestinationException");
      }
      name = "InvalidSNSDestinationException";
      $fault = "client";
      ConfigurationSetName;
      EventDestinationName;
      constructor(opts) {
        super({
          name: "InvalidSNSDestinationException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidSNSDestinationException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
        this.EventDestinationName = opts.EventDestinationName;
      }
    };
    InvalidTrackingOptionsException = class _InvalidTrackingOptionsException extends SESServiceException {
      static {
        __name(this, "_InvalidTrackingOptionsException");
      }
      static {
        __name2(this, "InvalidTrackingOptionsException");
      }
      name = "InvalidTrackingOptionsException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "InvalidTrackingOptionsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidTrackingOptionsException.prototype);
      }
    };
    TrackingOptionsAlreadyExistsException = class _TrackingOptionsAlreadyExistsException extends SESServiceException {
      static {
        __name(this, "_TrackingOptionsAlreadyExistsException");
      }
      static {
        __name2(this, "TrackingOptionsAlreadyExistsException");
      }
      name = "TrackingOptionsAlreadyExistsException";
      $fault = "client";
      ConfigurationSetName;
      constructor(opts) {
        super({
          name: "TrackingOptionsAlreadyExistsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _TrackingOptionsAlreadyExistsException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
      }
    };
    CustomVerificationEmailInvalidContentException = class _CustomVerificationEmailInvalidContentException extends SESServiceException {
      static {
        __name(this, "_CustomVerificationEmailInvalidContentException");
      }
      static {
        __name2(this, "CustomVerificationEmailInvalidContentException");
      }
      name = "CustomVerificationEmailInvalidContentException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "CustomVerificationEmailInvalidContentException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _CustomVerificationEmailInvalidContentException.prototype);
      }
    };
    CustomVerificationEmailTemplateAlreadyExistsException = class _CustomVerificationEmailTemplateAlreadyExistsException extends SESServiceException {
      static {
        __name(this, "_CustomVerificationEmailTemplateAlreadyExistsException");
      }
      static {
        __name2(this, "CustomVerificationEmailTemplateAlreadyExistsException");
      }
      name = "CustomVerificationEmailTemplateAlreadyExistsException";
      $fault = "client";
      CustomVerificationEmailTemplateName;
      constructor(opts) {
        super({
          name: "CustomVerificationEmailTemplateAlreadyExistsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _CustomVerificationEmailTemplateAlreadyExistsException.prototype);
        this.CustomVerificationEmailTemplateName = opts.CustomVerificationEmailTemplateName;
      }
    };
    FromEmailAddressNotVerifiedException = class _FromEmailAddressNotVerifiedException extends SESServiceException {
      static {
        __name(this, "_FromEmailAddressNotVerifiedException");
      }
      static {
        __name2(this, "FromEmailAddressNotVerifiedException");
      }
      name = "FromEmailAddressNotVerifiedException";
      $fault = "client";
      FromEmailAddress;
      constructor(opts) {
        super({
          name: "FromEmailAddressNotVerifiedException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _FromEmailAddressNotVerifiedException.prototype);
        this.FromEmailAddress = opts.FromEmailAddress;
      }
    };
    InvalidLambdaFunctionException = class _InvalidLambdaFunctionException extends SESServiceException {
      static {
        __name(this, "_InvalidLambdaFunctionException");
      }
      static {
        __name2(this, "InvalidLambdaFunctionException");
      }
      name = "InvalidLambdaFunctionException";
      $fault = "client";
      FunctionArn;
      constructor(opts) {
        super({
          name: "InvalidLambdaFunctionException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidLambdaFunctionException.prototype);
        this.FunctionArn = opts.FunctionArn;
      }
    };
    InvalidS3ConfigurationException = class _InvalidS3ConfigurationException extends SESServiceException {
      static {
        __name(this, "_InvalidS3ConfigurationException");
      }
      static {
        __name2(this, "InvalidS3ConfigurationException");
      }
      name = "InvalidS3ConfigurationException";
      $fault = "client";
      Bucket;
      constructor(opts) {
        super({
          name: "InvalidS3ConfigurationException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidS3ConfigurationException.prototype);
        this.Bucket = opts.Bucket;
      }
    };
    InvalidSnsTopicException = class _InvalidSnsTopicException extends SESServiceException {
      static {
        __name(this, "_InvalidSnsTopicException");
      }
      static {
        __name2(this, "InvalidSnsTopicException");
      }
      name = "InvalidSnsTopicException";
      $fault = "client";
      Topic;
      constructor(opts) {
        super({
          name: "InvalidSnsTopicException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidSnsTopicException.prototype);
        this.Topic = opts.Topic;
      }
    };
    RuleDoesNotExistException = class _RuleDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_RuleDoesNotExistException");
      }
      static {
        __name2(this, "RuleDoesNotExistException");
      }
      name = "RuleDoesNotExistException";
      $fault = "client";
      Name;
      constructor(opts) {
        super({
          name: "RuleDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _RuleDoesNotExistException.prototype);
        this.Name = opts.Name;
      }
    };
    InvalidTemplateException = class _InvalidTemplateException extends SESServiceException {
      static {
        __name(this, "_InvalidTemplateException");
      }
      static {
        __name2(this, "InvalidTemplateException");
      }
      name = "InvalidTemplateException";
      $fault = "client";
      TemplateName;
      constructor(opts) {
        super({
          name: "InvalidTemplateException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidTemplateException.prototype);
        this.TemplateName = opts.TemplateName;
      }
    };
    CustomVerificationEmailTemplateDoesNotExistException = class _CustomVerificationEmailTemplateDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_CustomVerificationEmailTemplateDoesNotExistException");
      }
      static {
        __name2(this, "CustomVerificationEmailTemplateDoesNotExistException");
      }
      name = "CustomVerificationEmailTemplateDoesNotExistException";
      $fault = "client";
      CustomVerificationEmailTemplateName;
      constructor(opts) {
        super({
          name: "CustomVerificationEmailTemplateDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _CustomVerificationEmailTemplateDoesNotExistException.prototype);
        this.CustomVerificationEmailTemplateName = opts.CustomVerificationEmailTemplateName;
      }
    };
    EventDestinationDoesNotExistException = class _EventDestinationDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_EventDestinationDoesNotExistException");
      }
      static {
        __name2(this, "EventDestinationDoesNotExistException");
      }
      name = "EventDestinationDoesNotExistException";
      $fault = "client";
      ConfigurationSetName;
      EventDestinationName;
      constructor(opts) {
        super({
          name: "EventDestinationDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _EventDestinationDoesNotExistException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
        this.EventDestinationName = opts.EventDestinationName;
      }
    };
    TrackingOptionsDoesNotExistException = class _TrackingOptionsDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_TrackingOptionsDoesNotExistException");
      }
      static {
        __name2(this, "TrackingOptionsDoesNotExistException");
      }
      name = "TrackingOptionsDoesNotExistException";
      $fault = "client";
      ConfigurationSetName;
      constructor(opts) {
        super({
          name: "TrackingOptionsDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _TrackingOptionsDoesNotExistException.prototype);
        this.ConfigurationSetName = opts.ConfigurationSetName;
      }
    };
    TemplateDoesNotExistException = class _TemplateDoesNotExistException extends SESServiceException {
      static {
        __name(this, "_TemplateDoesNotExistException");
      }
      static {
        __name2(this, "TemplateDoesNotExistException");
      }
      name = "TemplateDoesNotExistException";
      $fault = "client";
      TemplateName;
      constructor(opts) {
        super({
          name: "TemplateDoesNotExistException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _TemplateDoesNotExistException.prototype);
        this.TemplateName = opts.TemplateName;
      }
    };
    InvalidDeliveryOptionsException = class _InvalidDeliveryOptionsException extends SESServiceException {
      static {
        __name(this, "_InvalidDeliveryOptionsException");
      }
      static {
        __name2(this, "InvalidDeliveryOptionsException");
      }
      name = "InvalidDeliveryOptionsException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "InvalidDeliveryOptionsException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidDeliveryOptionsException.prototype);
      }
    };
    InvalidPolicyException = class _InvalidPolicyException extends SESServiceException {
      static {
        __name(this, "_InvalidPolicyException");
      }
      static {
        __name2(this, "InvalidPolicyException");
      }
      name = "InvalidPolicyException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "InvalidPolicyException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidPolicyException.prototype);
      }
    };
    InvalidRenderingParameterException = class _InvalidRenderingParameterException extends SESServiceException {
      static {
        __name(this, "_InvalidRenderingParameterException");
      }
      static {
        __name2(this, "InvalidRenderingParameterException");
      }
      name = "InvalidRenderingParameterException";
      $fault = "client";
      TemplateName;
      constructor(opts) {
        super({
          name: "InvalidRenderingParameterException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _InvalidRenderingParameterException.prototype);
        this.TemplateName = opts.TemplateName;
      }
    };
    MailFromDomainNotVerifiedException = class _MailFromDomainNotVerifiedException extends SESServiceException {
      static {
        __name(this, "_MailFromDomainNotVerifiedException");
      }
      static {
        __name2(this, "MailFromDomainNotVerifiedException");
      }
      name = "MailFromDomainNotVerifiedException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "MailFromDomainNotVerifiedException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _MailFromDomainNotVerifiedException.prototype);
      }
    };
    MessageRejected = class _MessageRejected extends SESServiceException {
      static {
        __name(this, "_MessageRejected");
      }
      static {
        __name2(this, "MessageRejected");
      }
      name = "MessageRejected";
      $fault = "client";
      constructor(opts) {
        super({
          name: "MessageRejected",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _MessageRejected.prototype);
      }
    };
    MissingRenderingAttributeException = class _MissingRenderingAttributeException extends SESServiceException {
      static {
        __name(this, "_MissingRenderingAttributeException");
      }
      static {
        __name2(this, "MissingRenderingAttributeException");
      }
      name = "MissingRenderingAttributeException";
      $fault = "client";
      TemplateName;
      constructor(opts) {
        super({
          name: "MissingRenderingAttributeException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _MissingRenderingAttributeException.prototype);
        this.TemplateName = opts.TemplateName;
      }
    };
    ProductionAccessNotGrantedException = class _ProductionAccessNotGrantedException extends SESServiceException {
      static {
        __name(this, "_ProductionAccessNotGrantedException");
      }
      static {
        __name2(this, "ProductionAccessNotGrantedException");
      }
      name = "ProductionAccessNotGrantedException";
      $fault = "client";
      constructor(opts) {
        super({
          name: "ProductionAccessNotGrantedException",
          $fault: "client",
          ...opts
        });
        Object.setPrototypeOf(this, _ProductionAccessNotGrantedException.prototype);
      }
    };
  }
});
var _A;
var _AD;
var _AEE;
var _AHA;
var _ASPE;
var _Ac;
var _Act;
var _B;
var _BA;
var _BAc;
var _BED;
var _BEDL;
var _BEDS;
var _BEDSL;
var _BN;
var _BOMXF;
var _BRI;
var _BRIL;
var _BS;
var _BSA;
var _BT;
var _BTo;
var _Bo;
var _Bou;
var _C;
var _CA;
var _CAc;
var _CCS;
var _CCSED;
var _CCSEDR;
var _CCSEDRr;
var _CCSR;
var _CCSRr;
var _CCSTO;
var _CCSTOR;
var _CCSTORr;
var _CCVET;
var _CCVETR;
var _CDE;
var _CRD;
var _CRF;
var _CRFR;
var _CRFRr;
var _CRR;
var _CRRR;
var _CRRRr;
var _CRRS;
var _CRRSR;
var _CRRSRl;
var _CRRSRr;
var _CRRSRre;
var _CRRSr;
var _CS;
var _CSAEE;
var _CSAN;
var _CSDNEE;
var _CSN;
var _CSSPE;
var _CSo;
var _CT;
var _CTR;
var _CTRr;
var _CTr;
var _CTre;
var _CVEICE;
var _CVET;
var _CVETAEE;
var _CVETDNEE;
var _CVETN;
var _CVETu;
var _CWD;
var _CWDC;
var _CWDCl;
var _Ch;
var _Ci;
var _Co;
var _D;
var _DA;
var _DARRS;
var _DARRSR;
var _DARRSRe;
var _DAe;
var _DC;
var _DCS;
var _DCSED;
var _DCSEDR;
var _DCSEDRe;
var _DCSR;
var _DCSRe;
var _DCSRes;
var _DCSResc;
var _DCSTO;
var _DCSTOR;
var _DCSTORe;
var _DCSe;
var _DCVET;
var _DCVETR;
var _DCi;
var _DDV;
var _DE;
var _DI;
var _DIP;
var _DIPR;
var _DIPRe;
var _DIR;
var _DIRe;
var _DN;
var _DO;
var _DRF;
var _DRFR;
var _DRFRe;
var _DRR;
var _DRRR;
var _DRRRe;
var _DRRRes;
var _DRRResc;
var _DRRS;
var _DRRSR;
var _DRRSRe;
var _DRRSRes;
var _DRRSResc;
var _DRRSe;
var _DRRe;
var _DSARN;
var _DT;
var _DTD;
var _DTR;
var _DTRe;
var _DTe;
var _DTef;
var _DTel;
var _DVEA;
var _DVEAR;
var _DVS;
var _DVSk;
var _Da;
var _De;
var _Do;
var _E;
var _EA;
var _ED;
var _EDAEE;
var _EDDNEE;
var _EDN;
var _EDv;
var _EF;
var _EFL;
var _EFx;
var _En;
var _Enc;
var _Ex;
var _F;
var _FA;
var _FAr;
var _FE;
var _FEA;
var _FEANVE;
var _FN;
var _FR;
var _FRURL;
var _Fi;
var _GASE;
var _GASER;
var _GCVET;
var _GCVETR;
var _GCVETRe;
var _GIDA;
var _GIDAR;
var _GIDARe;
var _GIMFDA;
var _GIMFDAR;
var _GIMFDARe;
var _GINA;
var _GINAR;
var _GINARe;
var _GIP;
var _GIPR;
var _GIPRe;
var _GIVA;
var _GIVAR;
var _GIVARe;
var _GSQ;
var _GSQR;
var _GSS;
var _GSSR;
var _GT;
var _GTR;
var _GTRe;
var _H;
var _HIBNE;
var _HICNE;
var _HIDNE;
var _HN;
var _HP;
var _HV;
var _I;
var _IAMRARN;
var _IARN;
var _ICSE;
var _ICWDE;
var _IDA;
var _IDOE;
var _IF;
var _IFDE;
var _ILFE;
var _IMFDA;
var _INA;
var _IPE;
var _IRA;
var _IRPE;
var _ISCE;
var _ISNSDE;
var _ISTE;
var _IT;
var _ITE;
var _ITOE;
var _ITd;
var _IVA;
var _Id;
var _KFD;
var _KKA;
var _LA;
var _LAD;
var _LCS;
var _LCSR;
var _LCSRi;
var _LCVET;
var _LCVETR;
var _LCVETRi;
var _LEE;
var _LFS;
var _LI;
var _LIP;
var _LIPR;
var _LIPRi;
var _LIR;
var _LIRi;
var _LRF;
var _LRFR;
var _LRFRi;
var _LRRS;
var _LRRSR;
var _LRRSRi;
var _LT;
var _LTR;
var _LTRi;
var _LVEA;
var _LVEAR;
var _M;
var _MD;
var _MET;
var _MFD;
var _MFDA;
var _MFDNVE;
var _MFDS;
var _MHS;
var _MI;
var _MIa;
var _MR;
var _MRAE;
var _MRa;
var _MSR;
var _MT;
var _MTL;
var _Me;
var _N;
var _NA;
var _NT;
var _NTo;
var _OA;
var _OKP;
var _OMI;
var _ORSN;
var _P;
var _PANGE;
var _PCSDO;
var _PCSDOR;
var _PCSDORu;
var _PIP;
var _PIPR;
var _PIPRu;
var _PN;
var _PNo;
var _Po;
var _R;
var _RA;
var _RAL;
var _RAe;
var _RDF;
var _RDNEE;
var _RF;
var _RFL;
var _RIF;
var _RM;
var _RME;
var _RMa;
var _RMe;
var _RN;
var _RNu;
var _RO;
var _RP;
var _RPA;
var _RR;
var _RRL;
var _RRRS;
var _RRRSR;
var _RRRSRe;
var _RRSL;
var _RRSM;
var _RS;
var _RSDNEE;
var _RSN;
var _RT;
var _RTA;
var _RTD;
var _RTe;
var _Re;
var _Rej;
var _Ru;
var _Rul;
var _S;
var _SA;
var _SARRS;
var _SARRSR;
var _SARRSRe;
var _SAo;
var _SAt;
var _SB;
var _SBR;
var _SBRe;
var _SBTE;
var _SBTER;
var _SBTERe;
var _SC;
var _SCVE;
var _SCVER;
var _SCVERe;
var _SDP;
var _SDPL;
var _SDPe;
var _SE;
var _SER;
var _SERe;
var _SEe;
var _SEen;
var _SIDE;
var _SIDER;
var _SIDERe;
var _SIFFE;
var _SIFFER;
var _SIFFERe;
var _SIHINE;
var _SIHINER;
var _SIHINERe;
var _SIMFD;
var _SIMFDR;
var _SIMFDRe;
var _SINT;
var _SINTR;
var _SINTRe;
var _SLH;
var _SNSA;
var _SNSD;
var _SP;
var _SRC;
var _SRE;
var _SRER;
var _SRERe;
var _SRRP;
var _SRRPR;
var _SRRPRe;
var _SRURL;
var _ST;
var _STE;
var _STER;
var _STERe;
var _Sc;
var _So;
var _St;
var _Su;
var _T;
var _TA;
var _TARN;
var _TAe;
var _TAo;
var _TC;
var _TD;
var _TDNEE;
var _TM;
var _TML;
var _TMe;
var _TN;
var _TO;
var _TOAEE;
var _TODNEE;
var _TP;
var _TPe;
var _TRT;
var _TRTR;
var _TRTRe;
var _TS;
var _Ta;
var _Te;
var _Tem;
var _Ti;
var _UASE;
var _UASER;
var _UCSED;
var _UCSEDR;
var _UCSEDRp;
var _UCSRME;
var _UCSRMER;
var _UCSSE;
var _UCSSER;
var _UCSTO;
var _UCSTOR;
var _UCSTORp;
var _UCVET;
var _UCVETR;
var _URR;
var _URRR;
var _URRRp;
var _UT;
var _UTR;
var _UTRp;
var _V;
var _VA;
var _VDD;
var _VDDR;
var _VDDRe;
var _VDI;
var _VDIR;
var _VDIRe;
var _VEA;
var _VEAR;
var _VEAe;
var _VEI;
var _VEIR;
var _VEIRe;
var _VS;
var _VT;
var _WA;
var _aQE;
var _c;
var _e;
var _hE;
var _m;
var _s;
var n0;
var _s_registry;
var SESServiceException$;
var n0_registry;
var AccountSendingPausedException$;
var AlreadyExistsException$;
var CannotDeleteException$;
var ConfigurationSetAlreadyExistsException$;
var ConfigurationSetDoesNotExistException$;
var ConfigurationSetSendingPausedException$;
var CustomVerificationEmailInvalidContentException$;
var CustomVerificationEmailTemplateAlreadyExistsException$;
var CustomVerificationEmailTemplateDoesNotExistException$;
var EventDestinationAlreadyExistsException$;
var EventDestinationDoesNotExistException$;
var FromEmailAddressNotVerifiedException$;
var InvalidCloudWatchDestinationException$;
var InvalidConfigurationSetException$;
var InvalidDeliveryOptionsException$;
var InvalidFirehoseDestinationException$;
var InvalidLambdaFunctionException$;
var InvalidPolicyException$;
var InvalidRenderingParameterException$;
var InvalidS3ConfigurationException$;
var InvalidSNSDestinationException$;
var InvalidSnsTopicException$;
var InvalidTemplateException$;
var InvalidTrackingOptionsException$;
var LimitExceededException$;
var MailFromDomainNotVerifiedException$;
var MessageRejected$;
var MissingRenderingAttributeException$;
var ProductionAccessNotGrantedException$;
var RuleDoesNotExistException$;
var RuleSetDoesNotExistException$;
var TemplateDoesNotExistException$;
var TrackingOptionsAlreadyExistsException$;
var TrackingOptionsDoesNotExistException$;
var errorTypeRegistries;
var AddHeaderAction$;
var Body$;
var BounceAction$;
var BouncedRecipientInfo$;
var BulkEmailDestination$;
var BulkEmailDestinationStatus$;
var CloneReceiptRuleSetRequest$;
var CloneReceiptRuleSetResponse$;
var CloudWatchDestination$;
var CloudWatchDimensionConfiguration$;
var ConfigurationSet$;
var ConnectAction$;
var Content$;
var CreateConfigurationSetEventDestinationRequest$;
var CreateConfigurationSetEventDestinationResponse$;
var CreateConfigurationSetRequest$;
var CreateConfigurationSetResponse$;
var CreateConfigurationSetTrackingOptionsRequest$;
var CreateConfigurationSetTrackingOptionsResponse$;
var CreateCustomVerificationEmailTemplateRequest$;
var CreateReceiptFilterRequest$;
var CreateReceiptFilterResponse$;
var CreateReceiptRuleRequest$;
var CreateReceiptRuleResponse$;
var CreateReceiptRuleSetRequest$;
var CreateReceiptRuleSetResponse$;
var CreateTemplateRequest$;
var CreateTemplateResponse$;
var CustomVerificationEmailTemplate$;
var DeleteConfigurationSetEventDestinationRequest$;
var DeleteConfigurationSetEventDestinationResponse$;
var DeleteConfigurationSetRequest$;
var DeleteConfigurationSetResponse$;
var DeleteConfigurationSetTrackingOptionsRequest$;
var DeleteConfigurationSetTrackingOptionsResponse$;
var DeleteCustomVerificationEmailTemplateRequest$;
var DeleteIdentityPolicyRequest$;
var DeleteIdentityPolicyResponse$;
var DeleteIdentityRequest$;
var DeleteIdentityResponse$;
var DeleteReceiptFilterRequest$;
var DeleteReceiptFilterResponse$;
var DeleteReceiptRuleRequest$;
var DeleteReceiptRuleResponse$;
var DeleteReceiptRuleSetRequest$;
var DeleteReceiptRuleSetResponse$;
var DeleteTemplateRequest$;
var DeleteTemplateResponse$;
var DeleteVerifiedEmailAddressRequest$;
var DeliveryOptions$;
var DescribeActiveReceiptRuleSetRequest$;
var DescribeActiveReceiptRuleSetResponse$;
var DescribeConfigurationSetRequest$;
var DescribeConfigurationSetResponse$;
var DescribeReceiptRuleRequest$;
var DescribeReceiptRuleResponse$;
var DescribeReceiptRuleSetRequest$;
var DescribeReceiptRuleSetResponse$;
var Destination$;
var EventDestination$;
var ExtensionField$;
var GetAccountSendingEnabledResponse$;
var GetCustomVerificationEmailTemplateRequest$;
var GetCustomVerificationEmailTemplateResponse$;
var GetIdentityDkimAttributesRequest$;
var GetIdentityDkimAttributesResponse$;
var GetIdentityMailFromDomainAttributesRequest$;
var GetIdentityMailFromDomainAttributesResponse$;
var GetIdentityNotificationAttributesRequest$;
var GetIdentityNotificationAttributesResponse$;
var GetIdentityPoliciesRequest$;
var GetIdentityPoliciesResponse$;
var GetIdentityVerificationAttributesRequest$;
var GetIdentityVerificationAttributesResponse$;
var GetSendQuotaResponse$;
var GetSendStatisticsResponse$;
var GetTemplateRequest$;
var GetTemplateResponse$;
var IdentityDkimAttributes$;
var IdentityMailFromDomainAttributes$;
var IdentityNotificationAttributes$;
var IdentityVerificationAttributes$;
var KinesisFirehoseDestination$;
var LambdaAction$;
var ListConfigurationSetsRequest$;
var ListConfigurationSetsResponse$;
var ListCustomVerificationEmailTemplatesRequest$;
var ListCustomVerificationEmailTemplatesResponse$;
var ListIdentitiesRequest$;
var ListIdentitiesResponse$;
var ListIdentityPoliciesRequest$;
var ListIdentityPoliciesResponse$;
var ListReceiptFiltersRequest$;
var ListReceiptFiltersResponse$;
var ListReceiptRuleSetsRequest$;
var ListReceiptRuleSetsResponse$;
var ListTemplatesRequest$;
var ListTemplatesResponse$;
var ListVerifiedEmailAddressesResponse$;
var Message$;
var MessageDsn$;
var MessageTag$;
var PutConfigurationSetDeliveryOptionsRequest$;
var PutConfigurationSetDeliveryOptionsResponse$;
var PutIdentityPolicyRequest$;
var PutIdentityPolicyResponse$;
var RawMessage$;
var ReceiptAction$;
var ReceiptFilter$;
var ReceiptIpFilter$;
var ReceiptRule$;
var ReceiptRuleSetMetadata$;
var RecipientDsnFields$;
var ReorderReceiptRuleSetRequest$;
var ReorderReceiptRuleSetResponse$;
var ReputationOptions$;
var S3Action$;
var SendBounceRequest$;
var SendBounceResponse$;
var SendBulkTemplatedEmailRequest$;
var SendBulkTemplatedEmailResponse$;
var SendCustomVerificationEmailRequest$;
var SendCustomVerificationEmailResponse$;
var SendDataPoint$;
var SendEmailRequest$;
var SendEmailResponse$;
var SendRawEmailRequest$;
var SendRawEmailResponse$;
var SendTemplatedEmailRequest$;
var SendTemplatedEmailResponse$;
var SetActiveReceiptRuleSetRequest$;
var SetActiveReceiptRuleSetResponse$;
var SetIdentityDkimEnabledRequest$;
var SetIdentityDkimEnabledResponse$;
var SetIdentityFeedbackForwardingEnabledRequest$;
var SetIdentityFeedbackForwardingEnabledResponse$;
var SetIdentityHeadersInNotificationsEnabledRequest$;
var SetIdentityHeadersInNotificationsEnabledResponse$;
var SetIdentityMailFromDomainRequest$;
var SetIdentityMailFromDomainResponse$;
var SetIdentityNotificationTopicRequest$;
var SetIdentityNotificationTopicResponse$;
var SetReceiptRulePositionRequest$;
var SetReceiptRulePositionResponse$;
var SNSAction$;
var SNSDestination$;
var StopAction$;
var Template$;
var TemplateMetadata$;
var TestRenderTemplateRequest$;
var TestRenderTemplateResponse$;
var TrackingOptions$;
var UpdateAccountSendingEnabledRequest$;
var UpdateConfigurationSetEventDestinationRequest$;
var UpdateConfigurationSetEventDestinationResponse$;
var UpdateConfigurationSetReputationMetricsEnabledRequest$;
var UpdateConfigurationSetSendingEnabledRequest$;
var UpdateConfigurationSetTrackingOptionsRequest$;
var UpdateConfigurationSetTrackingOptionsResponse$;
var UpdateCustomVerificationEmailTemplateRequest$;
var UpdateReceiptRuleRequest$;
var UpdateReceiptRuleResponse$;
var UpdateTemplateRequest$;
var UpdateTemplateResponse$;
var VerifyDomainDkimRequest$;
var VerifyDomainDkimResponse$;
var VerifyDomainIdentityRequest$;
var VerifyDomainIdentityResponse$;
var VerifyEmailAddressRequest$;
var VerifyEmailIdentityRequest$;
var VerifyEmailIdentityResponse$;
var WorkmailAction$;
var __Unit;
var AddressList;
var BouncedRecipientInfoList;
var BulkEmailDestinationList;
var BulkEmailDestinationStatusList;
var CloudWatchDimensionConfigurations;
var ConfigurationSetAttributeList;
var ConfigurationSets;
var CustomVerificationEmailTemplates;
var EventDestinations;
var EventTypes;
var ExtensionFieldList;
var IdentityList;
var MessageTagList;
var PolicyNameList;
var ReceiptActionsList;
var ReceiptFilterList;
var ReceiptRuleNamesList;
var ReceiptRuleSetsLists;
var ReceiptRulesList;
var RecipientsList;
var SendDataPointList;
var TemplateMetadataList;
var VerificationTokenList;
var DkimAttributes;
var MailFromDomainAttributes;
var NotificationAttributes;
var PolicyMap;
var VerificationAttributes;
var CloneReceiptRuleSet$;
var CreateConfigurationSet$;
var CreateConfigurationSetEventDestination$;
var CreateConfigurationSetTrackingOptions$;
var CreateCustomVerificationEmailTemplate$;
var CreateReceiptFilter$;
var CreateReceiptRule$;
var CreateReceiptRuleSet$;
var CreateTemplate$;
var DeleteConfigurationSet$;
var DeleteConfigurationSetEventDestination$;
var DeleteConfigurationSetTrackingOptions$;
var DeleteCustomVerificationEmailTemplate$;
var DeleteIdentity$;
var DeleteIdentityPolicy$;
var DeleteReceiptFilter$;
var DeleteReceiptRule$;
var DeleteReceiptRuleSet$;
var DeleteTemplate$;
var DeleteVerifiedEmailAddress$;
var DescribeActiveReceiptRuleSet$;
var DescribeConfigurationSet$;
var DescribeReceiptRule$;
var DescribeReceiptRuleSet$;
var GetAccountSendingEnabled$;
var GetCustomVerificationEmailTemplate$;
var GetIdentityDkimAttributes$;
var GetIdentityMailFromDomainAttributes$;
var GetIdentityNotificationAttributes$;
var GetIdentityPolicies$;
var GetIdentityVerificationAttributes$;
var GetSendQuota$;
var GetSendStatistics$;
var GetTemplate$;
var ListConfigurationSets$;
var ListCustomVerificationEmailTemplates$;
var ListIdentities$;
var ListIdentityPolicies$;
var ListReceiptFilters$;
var ListReceiptRuleSets$;
var ListTemplates$;
var ListVerifiedEmailAddresses$;
var PutConfigurationSetDeliveryOptions$;
var PutIdentityPolicy$;
var ReorderReceiptRuleSet$;
var SendBounce$;
var SendBulkTemplatedEmail$;
var SendCustomVerificationEmail$;
var SendEmail$;
var SendRawEmail$;
var SendTemplatedEmail$;
var SetActiveReceiptRuleSet$;
var SetIdentityDkimEnabled$;
var SetIdentityFeedbackForwardingEnabled$;
var SetIdentityHeadersInNotificationsEnabled$;
var SetIdentityMailFromDomain$;
var SetIdentityNotificationTopic$;
var SetReceiptRulePosition$;
var TestRenderTemplate$;
var UpdateAccountSendingEnabled$;
var UpdateConfigurationSetEventDestination$;
var UpdateConfigurationSetReputationMetricsEnabled$;
var UpdateConfigurationSetSendingEnabled$;
var UpdateConfigurationSetTrackingOptions$;
var UpdateCustomVerificationEmailTemplate$;
var UpdateReceiptRule$;
var UpdateTemplate$;
var VerifyDomainDkim$;
var VerifyDomainIdentity$;
var VerifyEmailAddress$;
var VerifyEmailIdentity$;
var init_schemas_0 = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/schemas/schemas_0.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_schema2();
    init_errors();
    init_SESServiceException();
    _A = "After";
    _AD = "ArrivalDate";
    _AEE = "AlreadyExistsException";
    _AHA = "AddHeaderAction";
    _ASPE = "AccountSendingPausedException";
    _Ac = "Actions";
    _Act = "Action";
    _B = "Bucket";
    _BA = "BounceAction";
    _BAc = "BccAddresses";
    _BED = "BulkEmailDestination";
    _BEDL = "BulkEmailDestinationList";
    _BEDS = "BulkEmailDestinationStatus";
    _BEDSL = "BulkEmailDestinationStatusList";
    _BN = "BucketName";
    _BOMXF = "BehaviorOnMXFailure";
    _BRI = "BouncedRecipientInfo";
    _BRIL = "BouncedRecipientInfoList";
    _BS = "BounceSender";
    _BSA = "BounceSenderArn";
    _BT = "BounceType";
    _BTo = "BounceTopic";
    _Bo = "Body";
    _Bou = "Bounces";
    _C = "Content";
    _CA = "ConnectAction";
    _CAc = "CcAddresses";
    _CCS = "CreateConfigurationSet";
    _CCSED = "CreateConfigurationSetEventDestination";
    _CCSEDR = "CreateConfigurationSetEventDestinationRequest";
    _CCSEDRr = "CreateConfigurationSetEventDestinationResponse";
    _CCSR = "CreateConfigurationSetRequest";
    _CCSRr = "CreateConfigurationSetResponse";
    _CCSTO = "CreateConfigurationSetTrackingOptions";
    _CCSTOR = "CreateConfigurationSetTrackingOptionsRequest";
    _CCSTORr = "CreateConfigurationSetTrackingOptionsResponse";
    _CCVET = "CreateCustomVerificationEmailTemplate";
    _CCVETR = "CreateCustomVerificationEmailTemplateRequest";
    _CDE = "CannotDeleteException";
    _CRD = "CustomRedirectDomain";
    _CRF = "CreateReceiptFilter";
    _CRFR = "CreateReceiptFilterRequest";
    _CRFRr = "CreateReceiptFilterResponse";
    _CRR = "CreateReceiptRule";
    _CRRR = "CreateReceiptRuleRequest";
    _CRRRr = "CreateReceiptRuleResponse";
    _CRRS = "CloneReceiptRuleSet";
    _CRRSR = "CloneReceiptRuleSetRequest";
    _CRRSRl = "CloneReceiptRuleSetResponse";
    _CRRSRr = "CreateReceiptRuleSetRequest";
    _CRRSRre = "CreateReceiptRuleSetResponse";
    _CRRSr = "CreateReceiptRuleSet";
    _CS = "ConfigurationSet";
    _CSAEE = "ConfigurationSetAlreadyExistsException";
    _CSAN = "ConfigurationSetAttributeNames";
    _CSDNEE = "ConfigurationSetDoesNotExistException";
    _CSN = "ConfigurationSetName";
    _CSSPE = "ConfigurationSetSendingPausedException";
    _CSo = "ConfigurationSets";
    _CT = "ComplaintTopic";
    _CTR = "CreateTemplateRequest";
    _CTRr = "CreateTemplateResponse";
    _CTr = "CreatedTimestamp";
    _CTre = "CreateTemplate";
    _CVEICE = "CustomVerificationEmailInvalidContentException";
    _CVET = "CustomVerificationEmailTemplate";
    _CVETAEE = "CustomVerificationEmailTemplateAlreadyExistsException";
    _CVETDNEE = "CustomVerificationEmailTemplateDoesNotExistException";
    _CVETN = "CustomVerificationEmailTemplateName";
    _CVETu = "CustomVerificationEmailTemplates";
    _CWD = "CloudWatchDestination";
    _CWDC = "CloudWatchDimensionConfiguration";
    _CWDCl = "CloudWatchDimensionConfigurations";
    _Ch = "Charset";
    _Ci = "Cidr";
    _Co = "Complaints";
    _D = "Destination";
    _DA = "DkimAttributes";
    _DARRS = "DescribeActiveReceiptRuleSet";
    _DARRSR = "DescribeActiveReceiptRuleSetRequest";
    _DARRSRe = "DescribeActiveReceiptRuleSetResponse";
    _DAe = "DeliveryAttempts";
    _DC = "DimensionConfigurations";
    _DCS = "DeleteConfigurationSet";
    _DCSED = "DeleteConfigurationSetEventDestination";
    _DCSEDR = "DeleteConfigurationSetEventDestinationRequest";
    _DCSEDRe = "DeleteConfigurationSetEventDestinationResponse";
    _DCSR = "DeleteConfigurationSetRequest";
    _DCSRe = "DeleteConfigurationSetResponse";
    _DCSRes = "DescribeConfigurationSetRequest";
    _DCSResc = "DescribeConfigurationSetResponse";
    _DCSTO = "DeleteConfigurationSetTrackingOptions";
    _DCSTOR = "DeleteConfigurationSetTrackingOptionsRequest";
    _DCSTORe = "DeleteConfigurationSetTrackingOptionsResponse";
    _DCSe = "DescribeConfigurationSet";
    _DCVET = "DeleteCustomVerificationEmailTemplate";
    _DCVETR = "DeleteCustomVerificationEmailTemplateRequest";
    _DCi = "DiagnosticCode";
    _DDV = "DefaultDimensionValue";
    _DE = "DkimEnabled";
    _DI = "DeleteIdentity";
    _DIP = "DeleteIdentityPolicy";
    _DIPR = "DeleteIdentityPolicyRequest";
    _DIPRe = "DeleteIdentityPolicyResponse";
    _DIR = "DeleteIdentityRequest";
    _DIRe = "DeleteIdentityResponse";
    _DN = "DimensionName";
    _DO = "DeliveryOptions";
    _DRF = "DeleteReceiptFilter";
    _DRFR = "DeleteReceiptFilterRequest";
    _DRFRe = "DeleteReceiptFilterResponse";
    _DRR = "DeleteReceiptRule";
    _DRRR = "DeleteReceiptRuleRequest";
    _DRRRe = "DeleteReceiptRuleResponse";
    _DRRRes = "DescribeReceiptRuleRequest";
    _DRRResc = "DescribeReceiptRuleResponse";
    _DRRS = "DeleteReceiptRuleSet";
    _DRRSR = "DeleteReceiptRuleSetRequest";
    _DRRSRe = "DeleteReceiptRuleSetResponse";
    _DRRSRes = "DescribeReceiptRuleSetRequest";
    _DRRSResc = "DescribeReceiptRuleSetResponse";
    _DRRSe = "DescribeReceiptRuleSet";
    _DRRe = "DescribeReceiptRule";
    _DSARN = "DeliveryStreamARN";
    _DT = "DkimTokens";
    _DTD = "DefaultTemplateData";
    _DTR = "DeleteTemplateRequest";
    _DTRe = "DeleteTemplateResponse";
    _DTe = "DeliveryTopic";
    _DTef = "DefaultTags";
    _DTel = "DeleteTemplate";
    _DVEA = "DeleteVerifiedEmailAddress";
    _DVEAR = "DeleteVerifiedEmailAddressRequest";
    _DVS = "DimensionValueSource";
    _DVSk = "DkimVerificationStatus";
    _Da = "Data";
    _De = "Destinations";
    _Do = "Domain";
    _E = "Error";
    _EA = "EmailAddress";
    _ED = "EventDestination";
    _EDAEE = "EventDestinationAlreadyExistsException";
    _EDDNEE = "EventDestinationDoesNotExistException";
    _EDN = "EventDestinationName";
    _EDv = "EventDestinations";
    _EF = "ExtensionField";
    _EFL = "ExtensionFieldList";
    _EFx = "ExtensionFields";
    _En = "Enabled";
    _Enc = "Encoding";
    _Ex = "Explanation";
    _F = "Filter";
    _FA = "FunctionArn";
    _FAr = "FromArn";
    _FE = "ForwardingEnabled";
    _FEA = "FromEmailAddress";
    _FEANVE = "FromEmailAddressNotVerifiedException";
    _FN = "FilterName";
    _FR = "FinalRecipient";
    _FRURL = "FailureRedirectionURL";
    _Fi = "Filters";
    _GASE = "GetAccountSendingEnabled";
    _GASER = "GetAccountSendingEnabledResponse";
    _GCVET = "GetCustomVerificationEmailTemplate";
    _GCVETR = "GetCustomVerificationEmailTemplateRequest";
    _GCVETRe = "GetCustomVerificationEmailTemplateResponse";
    _GIDA = "GetIdentityDkimAttributes";
    _GIDAR = "GetIdentityDkimAttributesRequest";
    _GIDARe = "GetIdentityDkimAttributesResponse";
    _GIMFDA = "GetIdentityMailFromDomainAttributes";
    _GIMFDAR = "GetIdentityMailFromDomainAttributesRequest";
    _GIMFDARe = "GetIdentityMailFromDomainAttributesResponse";
    _GINA = "GetIdentityNotificationAttributes";
    _GINAR = "GetIdentityNotificationAttributesRequest";
    _GINARe = "GetIdentityNotificationAttributesResponse";
    _GIP = "GetIdentityPolicies";
    _GIPR = "GetIdentityPoliciesRequest";
    _GIPRe = "GetIdentityPoliciesResponse";
    _GIVA = "GetIdentityVerificationAttributes";
    _GIVAR = "GetIdentityVerificationAttributesRequest";
    _GIVARe = "GetIdentityVerificationAttributesResponse";
    _GSQ = "GetSendQuota";
    _GSQR = "GetSendQuotaResponse";
    _GSS = "GetSendStatistics";
    _GSSR = "GetSendStatisticsResponse";
    _GT = "GetTemplate";
    _GTR = "GetTemplateRequest";
    _GTRe = "GetTemplateResponse";
    _H = "Html";
    _HIBNE = "HeadersInBounceNotificationsEnabled";
    _HICNE = "HeadersInComplaintNotificationsEnabled";
    _HIDNE = "HeadersInDeliveryNotificationsEnabled";
    _HN = "HeaderName";
    _HP = "HtmlPart";
    _HV = "HeaderValue";
    _I = "Identity";
    _IAMRARN = "IAMRoleARN";
    _IARN = "InstanceARN";
    _ICSE = "InvalidConfigurationSetException";
    _ICWDE = "InvalidCloudWatchDestinationException";
    _IDA = "IdentityDkimAttributes";
    _IDOE = "InvalidDeliveryOptionsException";
    _IF = "IpFilter";
    _IFDE = "InvalidFirehoseDestinationException";
    _ILFE = "InvalidLambdaFunctionException";
    _IMFDA = "IdentityMailFromDomainAttributes";
    _INA = "IdentityNotificationAttributes";
    _IPE = "InvalidPolicyException";
    _IRA = "IamRoleArn";
    _IRPE = "InvalidRenderingParameterException";
    _ISCE = "InvalidS3ConfigurationException";
    _ISNSDE = "InvalidSNSDestinationException";
    _ISTE = "InvalidSnsTopicException";
    _IT = "InvocationType";
    _ITE = "InvalidTemplateException";
    _ITOE = "InvalidTrackingOptionsException";
    _ITd = "IdentityType";
    _IVA = "IdentityVerificationAttributes";
    _Id = "Identities";
    _KFD = "KinesisFirehoseDestination";
    _KKA = "KmsKeyArn";
    _LA = "LambdaAction";
    _LAD = "LastAttemptDate";
    _LCS = "ListConfigurationSets";
    _LCSR = "ListConfigurationSetsRequest";
    _LCSRi = "ListConfigurationSetsResponse";
    _LCVET = "ListCustomVerificationEmailTemplates";
    _LCVETR = "ListCustomVerificationEmailTemplatesRequest";
    _LCVETRi = "ListCustomVerificationEmailTemplatesResponse";
    _LEE = "LimitExceededException";
    _LFS = "LastFreshStart";
    _LI = "ListIdentities";
    _LIP = "ListIdentityPolicies";
    _LIPR = "ListIdentityPoliciesRequest";
    _LIPRi = "ListIdentityPoliciesResponse";
    _LIR = "ListIdentitiesRequest";
    _LIRi = "ListIdentitiesResponse";
    _LRF = "ListReceiptFilters";
    _LRFR = "ListReceiptFiltersRequest";
    _LRFRi = "ListReceiptFiltersResponse";
    _LRRS = "ListReceiptRuleSets";
    _LRRSR = "ListReceiptRuleSetsRequest";
    _LRRSRi = "ListReceiptRuleSetsResponse";
    _LT = "ListTemplates";
    _LTR = "ListTemplatesRequest";
    _LTRi = "ListTemplatesResponse";
    _LVEA = "ListVerifiedEmailAddresses";
    _LVEAR = "ListVerifiedEmailAddressesResponse";
    _M = "Message";
    _MD = "MessageDsn";
    _MET = "MatchingEventTypes";
    _MFD = "MailFromDomain";
    _MFDA = "MailFromDomainAttributes";
    _MFDNVE = "MailFromDomainNotVerifiedException";
    _MFDS = "MailFromDomainStatus";
    _MHS = "Max24HourSend";
    _MI = "MessageId";
    _MIa = "MaxItems";
    _MR = "MessageRejected";
    _MRAE = "MissingRenderingAttributeException";
    _MRa = "MaxResults";
    _MSR = "MaxSendRate";
    _MT = "MessageTag";
    _MTL = "MessageTagList";
    _Me = "Metadata";
    _N = "Name";
    _NA = "NotificationAttributes";
    _NT = "NextToken";
    _NTo = "NotificationType";
    _OA = "OrganizationArn";
    _OKP = "ObjectKeyPrefix";
    _OMI = "OriginalMessageId";
    _ORSN = "OriginalRuleSetName";
    _P = "Policies";
    _PANGE = "ProductionAccessNotGrantedException";
    _PCSDO = "PutConfigurationSetDeliveryOptions";
    _PCSDOR = "PutConfigurationSetDeliveryOptionsRequest";
    _PCSDORu = "PutConfigurationSetDeliveryOptionsResponse";
    _PIP = "PutIdentityPolicy";
    _PIPR = "PutIdentityPolicyRequest";
    _PIPRu = "PutIdentityPolicyResponse";
    _PN = "PolicyName";
    _PNo = "PolicyNames";
    _Po = "Policy";
    _R = "Recipient";
    _RA = "RecipientArn";
    _RAL = "ReceiptActionsList";
    _RAe = "ReceiptAction";
    _RDF = "RecipientDsnFields";
    _RDNEE = "RuleDoesNotExistException";
    _RF = "ReceiptFilter";
    _RFL = "ReceiptFilterList";
    _RIF = "ReceiptIpFilter";
    _RM = "ReportingMta";
    _RME = "ReputationMetricsEnabled";
    _RMa = "RawMessage";
    _RMe = "RemoteMta";
    _RN = "RuleName";
    _RNu = "RuleNames";
    _RO = "ReputationOptions";
    _RP = "ReturnPath";
    _RPA = "ReturnPathArn";
    _RR = "ReceiptRule";
    _RRL = "ReceiptRulesList";
    _RRRS = "ReorderReceiptRuleSet";
    _RRRSR = "ReorderReceiptRuleSetRequest";
    _RRRSRe = "ReorderReceiptRuleSetResponse";
    _RRSL = "ReceiptRuleSetsLists";
    _RRSM = "ReceiptRuleSetMetadata";
    _RS = "RuleSets";
    _RSDNEE = "RuleSetDoesNotExistException";
    _RSN = "RuleSetName";
    _RT = "ReplacementTags";
    _RTA = "ReplyToAddresses";
    _RTD = "ReplacementTemplateData";
    _RTe = "RenderedTemplate";
    _Re = "Recipients";
    _Rej = "Rejects";
    _Ru = "Rule";
    _Rul = "Rules";
    _S = "Sender";
    _SA = "S3Action";
    _SARRS = "SetActiveReceiptRuleSet";
    _SARRSR = "SetActiveReceiptRuleSetRequest";
    _SARRSRe = "SetActiveReceiptRuleSetResponse";
    _SAo = "SourceArn";
    _SAt = "StopAction";
    _SB = "SendBounce";
    _SBR = "SendBounceRequest";
    _SBRe = "SendBounceResponse";
    _SBTE = "SendBulkTemplatedEmail";
    _SBTER = "SendBulkTemplatedEmailRequest";
    _SBTERe = "SendBulkTemplatedEmailResponse";
    _SC = "StatusCode";
    _SCVE = "SendCustomVerificationEmail";
    _SCVER = "SendCustomVerificationEmailRequest";
    _SCVERe = "SendCustomVerificationEmailResponse";
    _SDP = "SendDataPoints";
    _SDPL = "SendDataPointList";
    _SDPe = "SendDataPoint";
    _SE = "ScanEnabled";
    _SER = "SendEmailRequest";
    _SERe = "SendEmailResponse";
    _SEe = "SendingEnabled";
    _SEen = "SendEmail";
    _SIDE = "SetIdentityDkimEnabled";
    _SIDER = "SetIdentityDkimEnabledRequest";
    _SIDERe = "SetIdentityDkimEnabledResponse";
    _SIFFE = "SetIdentityFeedbackForwardingEnabled";
    _SIFFER = "SetIdentityFeedbackForwardingEnabledRequest";
    _SIFFERe = "SetIdentityFeedbackForwardingEnabledResponse";
    _SIHINE = "SetIdentityHeadersInNotificationsEnabled";
    _SIHINER = "SetIdentityHeadersInNotificationsEnabledRequest";
    _SIHINERe = "SetIdentityHeadersInNotificationsEnabledResponse";
    _SIMFD = "SetIdentityMailFromDomain";
    _SIMFDR = "SetIdentityMailFromDomainRequest";
    _SIMFDRe = "SetIdentityMailFromDomainResponse";
    _SINT = "SetIdentityNotificationTopic";
    _SINTR = "SetIdentityNotificationTopicRequest";
    _SINTRe = "SetIdentityNotificationTopicResponse";
    _SLH = "SentLast24Hours";
    _SNSA = "SNSAction";
    _SNSD = "SNSDestination";
    _SP = "SubjectPart";
    _SRC = "SmtpReplyCode";
    _SRE = "SendRawEmail";
    _SRER = "SendRawEmailRequest";
    _SRERe = "SendRawEmailResponse";
    _SRRP = "SetReceiptRulePosition";
    _SRRPR = "SetReceiptRulePositionRequest";
    _SRRPRe = "SetReceiptRulePositionResponse";
    _SRURL = "SuccessRedirectionURL";
    _ST = "SnsTopic";
    _STE = "SendTemplatedEmail";
    _STER = "SendTemplatedEmailRequest";
    _STERe = "SendTemplatedEmailResponse";
    _Sc = "Scope";
    _So = "Source";
    _St = "Status";
    _Su = "Subject";
    _T = "Topic";
    _TA = "TopicArn";
    _TARN = "TopicARN";
    _TAe = "TemplateArn";
    _TAo = "ToAddresses";
    _TC = "TemplateContent";
    _TD = "TemplateData";
    _TDNEE = "TemplateDoesNotExistException";
    _TM = "TemplatesMetadata";
    _TML = "TemplateMetadataList";
    _TMe = "TemplateMetadata";
    _TN = "TemplateName";
    _TO = "TrackingOptions";
    _TOAEE = "TrackingOptionsAlreadyExistsException";
    _TODNEE = "TrackingOptionsDoesNotExistException";
    _TP = "TlsPolicy";
    _TPe = "TextPart";
    _TRT = "TestRenderTemplate";
    _TRTR = "TestRenderTemplateRequest";
    _TRTRe = "TestRenderTemplateResponse";
    _TS = "TemplateSubject";
    _Ta = "Tags";
    _Te = "Text";
    _Tem = "Template";
    _Ti = "Timestamp";
    _UASE = "UpdateAccountSendingEnabled";
    _UASER = "UpdateAccountSendingEnabledRequest";
    _UCSED = "UpdateConfigurationSetEventDestination";
    _UCSEDR = "UpdateConfigurationSetEventDestinationRequest";
    _UCSEDRp = "UpdateConfigurationSetEventDestinationResponse";
    _UCSRME = "UpdateConfigurationSetReputationMetricsEnabled";
    _UCSRMER = "UpdateConfigurationSetReputationMetricsEnabledRequest";
    _UCSSE = "UpdateConfigurationSetSendingEnabled";
    _UCSSER = "UpdateConfigurationSetSendingEnabledRequest";
    _UCSTO = "UpdateConfigurationSetTrackingOptions";
    _UCSTOR = "UpdateConfigurationSetTrackingOptionsRequest";
    _UCSTORp = "UpdateConfigurationSetTrackingOptionsResponse";
    _UCVET = "UpdateCustomVerificationEmailTemplate";
    _UCVETR = "UpdateCustomVerificationEmailTemplateRequest";
    _URR = "UpdateReceiptRule";
    _URRR = "UpdateReceiptRuleRequest";
    _URRRp = "UpdateReceiptRuleResponse";
    _UT = "UpdateTemplate";
    _UTR = "UpdateTemplateRequest";
    _UTRp = "UpdateTemplateResponse";
    _V = "Value";
    _VA = "VerificationAttributes";
    _VDD = "VerifyDomainDkim";
    _VDDR = "VerifyDomainDkimRequest";
    _VDDRe = "VerifyDomainDkimResponse";
    _VDI = "VerifyDomainIdentity";
    _VDIR = "VerifyDomainIdentityRequest";
    _VDIRe = "VerifyDomainIdentityResponse";
    _VEA = "VerifiedEmailAddresses";
    _VEAR = "VerifyEmailAddressRequest";
    _VEAe = "VerifyEmailAddress";
    _VEI = "VerifyEmailIdentity";
    _VEIR = "VerifyEmailIdentityRequest";
    _VEIRe = "VerifyEmailIdentityResponse";
    _VS = "VerificationStatus";
    _VT = "VerificationToken";
    _WA = "WorkmailAction";
    _aQE = "awsQueryError";
    _c = "client";
    _e = "error";
    _hE = "httpError";
    _m = "message";
    _s = "smithy.ts.sdk.synthetic.com.amazonaws.ses";
    n0 = "com.amazonaws.ses";
    _s_registry = TypeRegistry.for(_s);
    SESServiceException$ = [-3, _s, "SESServiceException", 0, [], []];
    _s_registry.registerError(SESServiceException$, SESServiceException);
    n0_registry = TypeRegistry.for(n0);
    AccountSendingPausedException$ = [
      -3,
      n0,
      _ASPE,
      { [_aQE]: [`AccountSendingPausedException`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(AccountSendingPausedException$, AccountSendingPausedException);
    AlreadyExistsException$ = [
      -3,
      n0,
      _AEE,
      { [_aQE]: [`AlreadyExists`, 400], [_e]: _c, [_hE]: 400 },
      [_N, _m],
      [0, 0]
    ];
    n0_registry.registerError(AlreadyExistsException$, AlreadyExistsException);
    CannotDeleteException$ = [
      -3,
      n0,
      _CDE,
      { [_aQE]: [`CannotDelete`, 400], [_e]: _c, [_hE]: 400 },
      [_N, _m],
      [0, 0]
    ];
    n0_registry.registerError(CannotDeleteException$, CannotDeleteException);
    ConfigurationSetAlreadyExistsException$ = [
      -3,
      n0,
      _CSAEE,
      { [_aQE]: [`ConfigurationSetAlreadyExists`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _m],
      [0, 0]
    ];
    n0_registry.registerError(ConfigurationSetAlreadyExistsException$, ConfigurationSetAlreadyExistsException);
    ConfigurationSetDoesNotExistException$ = [
      -3,
      n0,
      _CSDNEE,
      { [_aQE]: [`ConfigurationSetDoesNotExist`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _m],
      [0, 0]
    ];
    n0_registry.registerError(ConfigurationSetDoesNotExistException$, ConfigurationSetDoesNotExistException);
    ConfigurationSetSendingPausedException$ = [
      -3,
      n0,
      _CSSPE,
      { [_aQE]: [`ConfigurationSetSendingPausedException`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _m],
      [0, 0]
    ];
    n0_registry.registerError(ConfigurationSetSendingPausedException$, ConfigurationSetSendingPausedException);
    CustomVerificationEmailInvalidContentException$ = [
      -3,
      n0,
      _CVEICE,
      { [_aQE]: [`CustomVerificationEmailInvalidContent`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(CustomVerificationEmailInvalidContentException$, CustomVerificationEmailInvalidContentException);
    CustomVerificationEmailTemplateAlreadyExistsException$ = [
      -3,
      n0,
      _CVETAEE,
      { [_aQE]: [`CustomVerificationEmailTemplateAlreadyExists`, 400], [_e]: _c, [_hE]: 400 },
      [_CVETN, _m],
      [0, 0]
    ];
    n0_registry.registerError(CustomVerificationEmailTemplateAlreadyExistsException$, CustomVerificationEmailTemplateAlreadyExistsException);
    CustomVerificationEmailTemplateDoesNotExistException$ = [
      -3,
      n0,
      _CVETDNEE,
      { [_aQE]: [`CustomVerificationEmailTemplateDoesNotExist`, 400], [_e]: _c, [_hE]: 400 },
      [_CVETN, _m],
      [0, 0]
    ];
    n0_registry.registerError(CustomVerificationEmailTemplateDoesNotExistException$, CustomVerificationEmailTemplateDoesNotExistException);
    EventDestinationAlreadyExistsException$ = [
      -3,
      n0,
      _EDAEE,
      { [_aQE]: [`EventDestinationAlreadyExists`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _EDN, _m],
      [0, 0, 0]
    ];
    n0_registry.registerError(EventDestinationAlreadyExistsException$, EventDestinationAlreadyExistsException);
    EventDestinationDoesNotExistException$ = [
      -3,
      n0,
      _EDDNEE,
      { [_aQE]: [`EventDestinationDoesNotExist`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _EDN, _m],
      [0, 0, 0]
    ];
    n0_registry.registerError(EventDestinationDoesNotExistException$, EventDestinationDoesNotExistException);
    FromEmailAddressNotVerifiedException$ = [
      -3,
      n0,
      _FEANVE,
      { [_aQE]: [`FromEmailAddressNotVerified`, 400], [_e]: _c, [_hE]: 400 },
      [_FEA, _m],
      [0, 0]
    ];
    n0_registry.registerError(FromEmailAddressNotVerifiedException$, FromEmailAddressNotVerifiedException);
    InvalidCloudWatchDestinationException$ = [
      -3,
      n0,
      _ICWDE,
      { [_aQE]: [`InvalidCloudWatchDestination`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _EDN, _m],
      [0, 0, 0]
    ];
    n0_registry.registerError(InvalidCloudWatchDestinationException$, InvalidCloudWatchDestinationException);
    InvalidConfigurationSetException$ = [
      -3,
      n0,
      _ICSE,
      { [_aQE]: [`InvalidConfigurationSet`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(InvalidConfigurationSetException$, InvalidConfigurationSetException);
    InvalidDeliveryOptionsException$ = [
      -3,
      n0,
      _IDOE,
      { [_aQE]: [`InvalidDeliveryOptions`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(InvalidDeliveryOptionsException$, InvalidDeliveryOptionsException);
    InvalidFirehoseDestinationException$ = [
      -3,
      n0,
      _IFDE,
      { [_aQE]: [`InvalidFirehoseDestination`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _EDN, _m],
      [0, 0, 0]
    ];
    n0_registry.registerError(InvalidFirehoseDestinationException$, InvalidFirehoseDestinationException);
    InvalidLambdaFunctionException$ = [
      -3,
      n0,
      _ILFE,
      { [_aQE]: [`InvalidLambdaFunction`, 400], [_e]: _c, [_hE]: 400 },
      [_FA, _m],
      [0, 0]
    ];
    n0_registry.registerError(InvalidLambdaFunctionException$, InvalidLambdaFunctionException);
    InvalidPolicyException$ = [
      -3,
      n0,
      _IPE,
      { [_aQE]: [`InvalidPolicy`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(InvalidPolicyException$, InvalidPolicyException);
    InvalidRenderingParameterException$ = [
      -3,
      n0,
      _IRPE,
      { [_aQE]: [`InvalidRenderingParameter`, 400], [_e]: _c, [_hE]: 400 },
      [_TN, _m],
      [0, 0]
    ];
    n0_registry.registerError(InvalidRenderingParameterException$, InvalidRenderingParameterException);
    InvalidS3ConfigurationException$ = [
      -3,
      n0,
      _ISCE,
      { [_aQE]: [`InvalidS3Configuration`, 400], [_e]: _c, [_hE]: 400 },
      [_B, _m],
      [0, 0]
    ];
    n0_registry.registerError(InvalidS3ConfigurationException$, InvalidS3ConfigurationException);
    InvalidSNSDestinationException$ = [
      -3,
      n0,
      _ISNSDE,
      { [_aQE]: [`InvalidSNSDestination`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _EDN, _m],
      [0, 0, 0]
    ];
    n0_registry.registerError(InvalidSNSDestinationException$, InvalidSNSDestinationException);
    InvalidSnsTopicException$ = [
      -3,
      n0,
      _ISTE,
      { [_aQE]: [`InvalidSnsTopic`, 400], [_e]: _c, [_hE]: 400 },
      [_T, _m],
      [0, 0]
    ];
    n0_registry.registerError(InvalidSnsTopicException$, InvalidSnsTopicException);
    InvalidTemplateException$ = [
      -3,
      n0,
      _ITE,
      { [_aQE]: [`InvalidTemplate`, 400], [_e]: _c, [_hE]: 400 },
      [_TN, _m],
      [0, 0]
    ];
    n0_registry.registerError(InvalidTemplateException$, InvalidTemplateException);
    InvalidTrackingOptionsException$ = [
      -3,
      n0,
      _ITOE,
      { [_aQE]: [`InvalidTrackingOptions`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(InvalidTrackingOptionsException$, InvalidTrackingOptionsException);
    LimitExceededException$ = [
      -3,
      n0,
      _LEE,
      { [_aQE]: [`LimitExceeded`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(LimitExceededException$, LimitExceededException);
    MailFromDomainNotVerifiedException$ = [
      -3,
      n0,
      _MFDNVE,
      { [_aQE]: [`MailFromDomainNotVerifiedException`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(MailFromDomainNotVerifiedException$, MailFromDomainNotVerifiedException);
    MessageRejected$ = [
      -3,
      n0,
      _MR,
      { [_aQE]: [`MessageRejected`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(MessageRejected$, MessageRejected);
    MissingRenderingAttributeException$ = [
      -3,
      n0,
      _MRAE,
      { [_aQE]: [`MissingRenderingAttribute`, 400], [_e]: _c, [_hE]: 400 },
      [_TN, _m],
      [0, 0]
    ];
    n0_registry.registerError(MissingRenderingAttributeException$, MissingRenderingAttributeException);
    ProductionAccessNotGrantedException$ = [
      -3,
      n0,
      _PANGE,
      { [_aQE]: [`ProductionAccessNotGranted`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(ProductionAccessNotGrantedException$, ProductionAccessNotGrantedException);
    RuleDoesNotExistException$ = [
      -3,
      n0,
      _RDNEE,
      { [_aQE]: [`RuleDoesNotExist`, 400], [_e]: _c, [_hE]: 400 },
      [_N, _m],
      [0, 0]
    ];
    n0_registry.registerError(RuleDoesNotExistException$, RuleDoesNotExistException);
    RuleSetDoesNotExistException$ = [
      -3,
      n0,
      _RSDNEE,
      { [_aQE]: [`RuleSetDoesNotExist`, 400], [_e]: _c, [_hE]: 400 },
      [_N, _m],
      [0, 0]
    ];
    n0_registry.registerError(RuleSetDoesNotExistException$, RuleSetDoesNotExistException);
    TemplateDoesNotExistException$ = [
      -3,
      n0,
      _TDNEE,
      { [_aQE]: [`TemplateDoesNotExist`, 400], [_e]: _c, [_hE]: 400 },
      [_TN, _m],
      [0, 0]
    ];
    n0_registry.registerError(TemplateDoesNotExistException$, TemplateDoesNotExistException);
    TrackingOptionsAlreadyExistsException$ = [
      -3,
      n0,
      _TOAEE,
      { [_aQE]: [`TrackingOptionsAlreadyExistsException`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _m],
      [0, 0]
    ];
    n0_registry.registerError(TrackingOptionsAlreadyExistsException$, TrackingOptionsAlreadyExistsException);
    TrackingOptionsDoesNotExistException$ = [
      -3,
      n0,
      _TODNEE,
      { [_aQE]: [`TrackingOptionsDoesNotExistException`, 400], [_e]: _c, [_hE]: 400 },
      [_CSN, _m],
      [0, 0]
    ];
    n0_registry.registerError(TrackingOptionsDoesNotExistException$, TrackingOptionsDoesNotExistException);
    errorTypeRegistries = [
      _s_registry,
      n0_registry
    ];
    AddHeaderAction$ = [
      3,
      n0,
      _AHA,
      0,
      [_HN, _HV],
      [0, 0],
      2
    ];
    Body$ = [
      3,
      n0,
      _Bo,
      0,
      [_Te, _H],
      [() => Content$, () => Content$]
    ];
    BounceAction$ = [
      3,
      n0,
      _BA,
      0,
      [_SRC, _M, _S, _TA, _SC],
      [0, 0, 0, 0, 0],
      3
    ];
    BouncedRecipientInfo$ = [
      3,
      n0,
      _BRI,
      0,
      [_R, _RA, _BT, _RDF],
      [0, 0, 0, () => RecipientDsnFields$],
      1
    ];
    BulkEmailDestination$ = [
      3,
      n0,
      _BED,
      0,
      [_D, _RT, _RTD],
      [() => Destination$, () => MessageTagList, 0],
      1
    ];
    BulkEmailDestinationStatus$ = [
      3,
      n0,
      _BEDS,
      0,
      [_St, _E, _MI],
      [0, 0, 0]
    ];
    CloneReceiptRuleSetRequest$ = [
      3,
      n0,
      _CRRSR,
      0,
      [_RSN, _ORSN],
      [0, 0],
      2
    ];
    CloneReceiptRuleSetResponse$ = [
      3,
      n0,
      _CRRSRl,
      0,
      [],
      []
    ];
    CloudWatchDestination$ = [
      3,
      n0,
      _CWD,
      0,
      [_DC],
      [() => CloudWatchDimensionConfigurations],
      1
    ];
    CloudWatchDimensionConfiguration$ = [
      3,
      n0,
      _CWDC,
      0,
      [_DN, _DVS, _DDV],
      [0, 0, 0],
      3
    ];
    ConfigurationSet$ = [
      3,
      n0,
      _CS,
      0,
      [_N],
      [0],
      1
    ];
    ConnectAction$ = [
      3,
      n0,
      _CA,
      0,
      [_IARN, _IAMRARN],
      [0, 0],
      2
    ];
    Content$ = [
      3,
      n0,
      _C,
      0,
      [_Da, _Ch],
      [0, 0],
      1
    ];
    CreateConfigurationSetEventDestinationRequest$ = [
      3,
      n0,
      _CCSEDR,
      0,
      [_CSN, _ED],
      [0, () => EventDestination$],
      2
    ];
    CreateConfigurationSetEventDestinationResponse$ = [
      3,
      n0,
      _CCSEDRr,
      0,
      [],
      []
    ];
    CreateConfigurationSetRequest$ = [
      3,
      n0,
      _CCSR,
      0,
      [_CS],
      [() => ConfigurationSet$],
      1
    ];
    CreateConfigurationSetResponse$ = [
      3,
      n0,
      _CCSRr,
      0,
      [],
      []
    ];
    CreateConfigurationSetTrackingOptionsRequest$ = [
      3,
      n0,
      _CCSTOR,
      0,
      [_CSN, _TO],
      [0, () => TrackingOptions$],
      2
    ];
    CreateConfigurationSetTrackingOptionsResponse$ = [
      3,
      n0,
      _CCSTORr,
      0,
      [],
      []
    ];
    CreateCustomVerificationEmailTemplateRequest$ = [
      3,
      n0,
      _CCVETR,
      0,
      [_TN, _FEA, _TS, _TC, _SRURL, _FRURL],
      [0, 0, 0, 0, 0, 0],
      6
    ];
    CreateReceiptFilterRequest$ = [
      3,
      n0,
      _CRFR,
      0,
      [_F],
      [() => ReceiptFilter$],
      1
    ];
    CreateReceiptFilterResponse$ = [
      3,
      n0,
      _CRFRr,
      0,
      [],
      []
    ];
    CreateReceiptRuleRequest$ = [
      3,
      n0,
      _CRRR,
      0,
      [_RSN, _Ru, _A],
      [0, () => ReceiptRule$, 0],
      2
    ];
    CreateReceiptRuleResponse$ = [
      3,
      n0,
      _CRRRr,
      0,
      [],
      []
    ];
    CreateReceiptRuleSetRequest$ = [
      3,
      n0,
      _CRRSRr,
      0,
      [_RSN],
      [0],
      1
    ];
    CreateReceiptRuleSetResponse$ = [
      3,
      n0,
      _CRRSRre,
      0,
      [],
      []
    ];
    CreateTemplateRequest$ = [
      3,
      n0,
      _CTR,
      0,
      [_Tem],
      [() => Template$],
      1
    ];
    CreateTemplateResponse$ = [
      3,
      n0,
      _CTRr,
      0,
      [],
      []
    ];
    CustomVerificationEmailTemplate$ = [
      3,
      n0,
      _CVET,
      0,
      [_TN, _FEA, _TS, _SRURL, _FRURL],
      [0, 0, 0, 0, 0]
    ];
    DeleteConfigurationSetEventDestinationRequest$ = [
      3,
      n0,
      _DCSEDR,
      0,
      [_CSN, _EDN],
      [0, 0],
      2
    ];
    DeleteConfigurationSetEventDestinationResponse$ = [
      3,
      n0,
      _DCSEDRe,
      0,
      [],
      []
    ];
    DeleteConfigurationSetRequest$ = [
      3,
      n0,
      _DCSR,
      0,
      [_CSN],
      [0],
      1
    ];
    DeleteConfigurationSetResponse$ = [
      3,
      n0,
      _DCSRe,
      0,
      [],
      []
    ];
    DeleteConfigurationSetTrackingOptionsRequest$ = [
      3,
      n0,
      _DCSTOR,
      0,
      [_CSN],
      [0],
      1
    ];
    DeleteConfigurationSetTrackingOptionsResponse$ = [
      3,
      n0,
      _DCSTORe,
      0,
      [],
      []
    ];
    DeleteCustomVerificationEmailTemplateRequest$ = [
      3,
      n0,
      _DCVETR,
      0,
      [_TN],
      [0],
      1
    ];
    DeleteIdentityPolicyRequest$ = [
      3,
      n0,
      _DIPR,
      0,
      [_I, _PN],
      [0, 0],
      2
    ];
    DeleteIdentityPolicyResponse$ = [
      3,
      n0,
      _DIPRe,
      0,
      [],
      []
    ];
    DeleteIdentityRequest$ = [
      3,
      n0,
      _DIR,
      0,
      [_I],
      [0],
      1
    ];
    DeleteIdentityResponse$ = [
      3,
      n0,
      _DIRe,
      0,
      [],
      []
    ];
    DeleteReceiptFilterRequest$ = [
      3,
      n0,
      _DRFR,
      0,
      [_FN],
      [0],
      1
    ];
    DeleteReceiptFilterResponse$ = [
      3,
      n0,
      _DRFRe,
      0,
      [],
      []
    ];
    DeleteReceiptRuleRequest$ = [
      3,
      n0,
      _DRRR,
      0,
      [_RSN, _RN],
      [0, 0],
      2
    ];
    DeleteReceiptRuleResponse$ = [
      3,
      n0,
      _DRRRe,
      0,
      [],
      []
    ];
    DeleteReceiptRuleSetRequest$ = [
      3,
      n0,
      _DRRSR,
      0,
      [_RSN],
      [0],
      1
    ];
    DeleteReceiptRuleSetResponse$ = [
      3,
      n0,
      _DRRSRe,
      0,
      [],
      []
    ];
    DeleteTemplateRequest$ = [
      3,
      n0,
      _DTR,
      0,
      [_TN],
      [0],
      1
    ];
    DeleteTemplateResponse$ = [
      3,
      n0,
      _DTRe,
      0,
      [],
      []
    ];
    DeleteVerifiedEmailAddressRequest$ = [
      3,
      n0,
      _DVEAR,
      0,
      [_EA],
      [0],
      1
    ];
    DeliveryOptions$ = [
      3,
      n0,
      _DO,
      0,
      [_TP],
      [0]
    ];
    DescribeActiveReceiptRuleSetRequest$ = [
      3,
      n0,
      _DARRSR,
      0,
      [],
      []
    ];
    DescribeActiveReceiptRuleSetResponse$ = [
      3,
      n0,
      _DARRSRe,
      0,
      [_Me, _Rul],
      [() => ReceiptRuleSetMetadata$, () => ReceiptRulesList]
    ];
    DescribeConfigurationSetRequest$ = [
      3,
      n0,
      _DCSRes,
      0,
      [_CSN, _CSAN],
      [0, 64 | 0],
      1
    ];
    DescribeConfigurationSetResponse$ = [
      3,
      n0,
      _DCSResc,
      0,
      [_CS, _EDv, _TO, _DO, _RO],
      [() => ConfigurationSet$, () => EventDestinations, () => TrackingOptions$, () => DeliveryOptions$, () => ReputationOptions$]
    ];
    DescribeReceiptRuleRequest$ = [
      3,
      n0,
      _DRRRes,
      0,
      [_RSN, _RN],
      [0, 0],
      2
    ];
    DescribeReceiptRuleResponse$ = [
      3,
      n0,
      _DRRResc,
      0,
      [_Ru],
      [() => ReceiptRule$]
    ];
    DescribeReceiptRuleSetRequest$ = [
      3,
      n0,
      _DRRSRes,
      0,
      [_RSN],
      [0],
      1
    ];
    DescribeReceiptRuleSetResponse$ = [
      3,
      n0,
      _DRRSResc,
      0,
      [_Me, _Rul],
      [() => ReceiptRuleSetMetadata$, () => ReceiptRulesList]
    ];
    Destination$ = [
      3,
      n0,
      _D,
      0,
      [_TAo, _CAc, _BAc],
      [64 | 0, 64 | 0, 64 | 0]
    ];
    EventDestination$ = [
      3,
      n0,
      _ED,
      0,
      [_N, _MET, _En, _KFD, _CWD, _SNSD],
      [0, 64 | 0, 2, () => KinesisFirehoseDestination$, () => CloudWatchDestination$, () => SNSDestination$],
      2
    ];
    ExtensionField$ = [
      3,
      n0,
      _EF,
      0,
      [_N, _V],
      [0, 0],
      2
    ];
    GetAccountSendingEnabledResponse$ = [
      3,
      n0,
      _GASER,
      0,
      [_En],
      [2]
    ];
    GetCustomVerificationEmailTemplateRequest$ = [
      3,
      n0,
      _GCVETR,
      0,
      [_TN],
      [0],
      1
    ];
    GetCustomVerificationEmailTemplateResponse$ = [
      3,
      n0,
      _GCVETRe,
      0,
      [_TN, _FEA, _TS, _TC, _SRURL, _FRURL],
      [0, 0, 0, 0, 0, 0]
    ];
    GetIdentityDkimAttributesRequest$ = [
      3,
      n0,
      _GIDAR,
      0,
      [_Id],
      [64 | 0],
      1
    ];
    GetIdentityDkimAttributesResponse$ = [
      3,
      n0,
      _GIDARe,
      0,
      [_DA],
      [() => DkimAttributes],
      1
    ];
    GetIdentityMailFromDomainAttributesRequest$ = [
      3,
      n0,
      _GIMFDAR,
      0,
      [_Id],
      [64 | 0],
      1
    ];
    GetIdentityMailFromDomainAttributesResponse$ = [
      3,
      n0,
      _GIMFDARe,
      0,
      [_MFDA],
      [() => MailFromDomainAttributes],
      1
    ];
    GetIdentityNotificationAttributesRequest$ = [
      3,
      n0,
      _GINAR,
      0,
      [_Id],
      [64 | 0],
      1
    ];
    GetIdentityNotificationAttributesResponse$ = [
      3,
      n0,
      _GINARe,
      0,
      [_NA],
      [() => NotificationAttributes],
      1
    ];
    GetIdentityPoliciesRequest$ = [
      3,
      n0,
      _GIPR,
      0,
      [_I, _PNo],
      [0, 64 | 0],
      2
    ];
    GetIdentityPoliciesResponse$ = [
      3,
      n0,
      _GIPRe,
      0,
      [_P],
      [128 | 0],
      1
    ];
    GetIdentityVerificationAttributesRequest$ = [
      3,
      n0,
      _GIVAR,
      0,
      [_Id],
      [64 | 0],
      1
    ];
    GetIdentityVerificationAttributesResponse$ = [
      3,
      n0,
      _GIVARe,
      0,
      [_VA],
      [() => VerificationAttributes],
      1
    ];
    GetSendQuotaResponse$ = [
      3,
      n0,
      _GSQR,
      0,
      [_MHS, _MSR, _SLH],
      [1, 1, 1]
    ];
    GetSendStatisticsResponse$ = [
      3,
      n0,
      _GSSR,
      0,
      [_SDP],
      [() => SendDataPointList]
    ];
    GetTemplateRequest$ = [
      3,
      n0,
      _GTR,
      0,
      [_TN],
      [0],
      1
    ];
    GetTemplateResponse$ = [
      3,
      n0,
      _GTRe,
      0,
      [_Tem],
      [() => Template$]
    ];
    IdentityDkimAttributes$ = [
      3,
      n0,
      _IDA,
      0,
      [_DE, _DVSk, _DT],
      [2, 0, 64 | 0],
      2
    ];
    IdentityMailFromDomainAttributes$ = [
      3,
      n0,
      _IMFDA,
      0,
      [_MFD, _MFDS, _BOMXF],
      [0, 0, 0],
      3
    ];
    IdentityNotificationAttributes$ = [
      3,
      n0,
      _INA,
      0,
      [_BTo, _CT, _DTe, _FE, _HIBNE, _HICNE, _HIDNE],
      [0, 0, 0, 2, 2, 2, 2],
      4
    ];
    IdentityVerificationAttributes$ = [
      3,
      n0,
      _IVA,
      0,
      [_VS, _VT],
      [0, 0],
      1
    ];
    KinesisFirehoseDestination$ = [
      3,
      n0,
      _KFD,
      0,
      [_IAMRARN, _DSARN],
      [0, 0],
      2
    ];
    LambdaAction$ = [
      3,
      n0,
      _LA,
      0,
      [_FA, _TA, _IT],
      [0, 0, 0],
      1
    ];
    ListConfigurationSetsRequest$ = [
      3,
      n0,
      _LCSR,
      0,
      [_NT, _MIa],
      [0, 1]
    ];
    ListConfigurationSetsResponse$ = [
      3,
      n0,
      _LCSRi,
      0,
      [_CSo, _NT],
      [() => ConfigurationSets, 0]
    ];
    ListCustomVerificationEmailTemplatesRequest$ = [
      3,
      n0,
      _LCVETR,
      0,
      [_NT, _MRa],
      [0, 1]
    ];
    ListCustomVerificationEmailTemplatesResponse$ = [
      3,
      n0,
      _LCVETRi,
      0,
      [_CVETu, _NT],
      [() => CustomVerificationEmailTemplates, 0]
    ];
    ListIdentitiesRequest$ = [
      3,
      n0,
      _LIR,
      0,
      [_ITd, _NT, _MIa],
      [0, 0, 1]
    ];
    ListIdentitiesResponse$ = [
      3,
      n0,
      _LIRi,
      0,
      [_Id, _NT],
      [64 | 0, 0],
      1
    ];
    ListIdentityPoliciesRequest$ = [
      3,
      n0,
      _LIPR,
      0,
      [_I],
      [0],
      1
    ];
    ListIdentityPoliciesResponse$ = [
      3,
      n0,
      _LIPRi,
      0,
      [_PNo],
      [64 | 0],
      1
    ];
    ListReceiptFiltersRequest$ = [
      3,
      n0,
      _LRFR,
      0,
      [],
      []
    ];
    ListReceiptFiltersResponse$ = [
      3,
      n0,
      _LRFRi,
      0,
      [_Fi],
      [() => ReceiptFilterList]
    ];
    ListReceiptRuleSetsRequest$ = [
      3,
      n0,
      _LRRSR,
      0,
      [_NT],
      [0]
    ];
    ListReceiptRuleSetsResponse$ = [
      3,
      n0,
      _LRRSRi,
      0,
      [_RS, _NT],
      [() => ReceiptRuleSetsLists, 0]
    ];
    ListTemplatesRequest$ = [
      3,
      n0,
      _LTR,
      0,
      [_NT, _MIa],
      [0, 1]
    ];
    ListTemplatesResponse$ = [
      3,
      n0,
      _LTRi,
      0,
      [_TM, _NT],
      [() => TemplateMetadataList, 0]
    ];
    ListVerifiedEmailAddressesResponse$ = [
      3,
      n0,
      _LVEAR,
      0,
      [_VEA],
      [64 | 0]
    ];
    Message$ = [
      3,
      n0,
      _M,
      0,
      [_Su, _Bo],
      [() => Content$, () => Body$],
      2
    ];
    MessageDsn$ = [
      3,
      n0,
      _MD,
      0,
      [_RM, _AD, _EFx],
      [0, 4, () => ExtensionFieldList],
      1
    ];
    MessageTag$ = [
      3,
      n0,
      _MT,
      0,
      [_N, _V],
      [0, 0],
      2
    ];
    PutConfigurationSetDeliveryOptionsRequest$ = [
      3,
      n0,
      _PCSDOR,
      0,
      [_CSN, _DO],
      [0, () => DeliveryOptions$],
      1
    ];
    PutConfigurationSetDeliveryOptionsResponse$ = [
      3,
      n0,
      _PCSDORu,
      0,
      [],
      []
    ];
    PutIdentityPolicyRequest$ = [
      3,
      n0,
      _PIPR,
      0,
      [_I, _PN, _Po],
      [0, 0, 0],
      3
    ];
    PutIdentityPolicyResponse$ = [
      3,
      n0,
      _PIPRu,
      0,
      [],
      []
    ];
    RawMessage$ = [
      3,
      n0,
      _RMa,
      0,
      [_Da],
      [21],
      1
    ];
    ReceiptAction$ = [
      3,
      n0,
      _RAe,
      0,
      [_SA, _BA, _WA, _LA, _SAt, _AHA, _SNSA, _CA],
      [() => S3Action$, () => BounceAction$, () => WorkmailAction$, () => LambdaAction$, () => StopAction$, () => AddHeaderAction$, () => SNSAction$, () => ConnectAction$]
    ];
    ReceiptFilter$ = [
      3,
      n0,
      _RF,
      0,
      [_N, _IF],
      [0, () => ReceiptIpFilter$],
      2
    ];
    ReceiptIpFilter$ = [
      3,
      n0,
      _RIF,
      0,
      [_Po, _Ci],
      [0, 0],
      2
    ];
    ReceiptRule$ = [
      3,
      n0,
      _RR,
      0,
      [_N, _En, _TP, _Re, _Ac, _SE],
      [0, 2, 0, 64 | 0, () => ReceiptActionsList, 2],
      1
    ];
    ReceiptRuleSetMetadata$ = [
      3,
      n0,
      _RRSM,
      0,
      [_N, _CTr],
      [0, 4]
    ];
    RecipientDsnFields$ = [
      3,
      n0,
      _RDF,
      0,
      [_Act, _St, _FR, _RMe, _DCi, _LAD, _EFx],
      [0, 0, 0, 0, 0, 4, () => ExtensionFieldList],
      2
    ];
    ReorderReceiptRuleSetRequest$ = [
      3,
      n0,
      _RRRSR,
      0,
      [_RSN, _RNu],
      [0, 64 | 0],
      2
    ];
    ReorderReceiptRuleSetResponse$ = [
      3,
      n0,
      _RRRSRe,
      0,
      [],
      []
    ];
    ReputationOptions$ = [
      3,
      n0,
      _RO,
      0,
      [_SEe, _RME, _LFS],
      [2, 2, 4]
    ];
    S3Action$ = [
      3,
      n0,
      _SA,
      0,
      [_BN, _TA, _OKP, _KKA, _IRA],
      [0, 0, 0, 0, 0],
      1
    ];
    SendBounceRequest$ = [
      3,
      n0,
      _SBR,
      0,
      [_OMI, _BS, _BRIL, _Ex, _MD, _BSA],
      [0, 0, () => BouncedRecipientInfoList, 0, () => MessageDsn$, 0],
      3
    ];
    SendBounceResponse$ = [
      3,
      n0,
      _SBRe,
      0,
      [_MI],
      [0]
    ];
    SendBulkTemplatedEmailRequest$ = [
      3,
      n0,
      _SBTER,
      0,
      [_So, _Tem, _DTD, _De, _SAo, _RTA, _RP, _RPA, _CSN, _DTef, _TAe],
      [0, 0, 0, () => BulkEmailDestinationList, 0, 64 | 0, 0, 0, 0, () => MessageTagList, 0],
      4
    ];
    SendBulkTemplatedEmailResponse$ = [
      3,
      n0,
      _SBTERe,
      0,
      [_St],
      [() => BulkEmailDestinationStatusList],
      1
    ];
    SendCustomVerificationEmailRequest$ = [
      3,
      n0,
      _SCVER,
      0,
      [_EA, _TN, _CSN],
      [0, 0, 0],
      2
    ];
    SendCustomVerificationEmailResponse$ = [
      3,
      n0,
      _SCVERe,
      0,
      [_MI],
      [0]
    ];
    SendDataPoint$ = [
      3,
      n0,
      _SDPe,
      0,
      [_Ti, _DAe, _Bou, _Co, _Rej],
      [4, 1, 1, 1, 1]
    ];
    SendEmailRequest$ = [
      3,
      n0,
      _SER,
      0,
      [_So, _D, _M, _RTA, _RP, _SAo, _RPA, _Ta, _CSN],
      [0, () => Destination$, () => Message$, 64 | 0, 0, 0, 0, () => MessageTagList, 0],
      3
    ];
    SendEmailResponse$ = [
      3,
      n0,
      _SERe,
      0,
      [_MI],
      [0],
      1
    ];
    SendRawEmailRequest$ = [
      3,
      n0,
      _SRER,
      0,
      [_RMa, _So, _De, _FAr, _SAo, _RPA, _Ta, _CSN],
      [() => RawMessage$, 0, 64 | 0, 0, 0, 0, () => MessageTagList, 0],
      1
    ];
    SendRawEmailResponse$ = [
      3,
      n0,
      _SRERe,
      0,
      [_MI],
      [0],
      1
    ];
    SendTemplatedEmailRequest$ = [
      3,
      n0,
      _STER,
      0,
      [_So, _D, _Tem, _TD, _RTA, _RP, _SAo, _RPA, _Ta, _CSN, _TAe],
      [0, () => Destination$, 0, 0, 64 | 0, 0, 0, 0, () => MessageTagList, 0, 0],
      4
    ];
    SendTemplatedEmailResponse$ = [
      3,
      n0,
      _STERe,
      0,
      [_MI],
      [0],
      1
    ];
    SetActiveReceiptRuleSetRequest$ = [
      3,
      n0,
      _SARRSR,
      0,
      [_RSN],
      [0]
    ];
    SetActiveReceiptRuleSetResponse$ = [
      3,
      n0,
      _SARRSRe,
      0,
      [],
      []
    ];
    SetIdentityDkimEnabledRequest$ = [
      3,
      n0,
      _SIDER,
      0,
      [_I, _DE],
      [0, 2],
      2
    ];
    SetIdentityDkimEnabledResponse$ = [
      3,
      n0,
      _SIDERe,
      0,
      [],
      []
    ];
    SetIdentityFeedbackForwardingEnabledRequest$ = [
      3,
      n0,
      _SIFFER,
      0,
      [_I, _FE],
      [0, 2],
      2
    ];
    SetIdentityFeedbackForwardingEnabledResponse$ = [
      3,
      n0,
      _SIFFERe,
      0,
      [],
      []
    ];
    SetIdentityHeadersInNotificationsEnabledRequest$ = [
      3,
      n0,
      _SIHINER,
      0,
      [_I, _NTo, _En],
      [0, 0, 2],
      3
    ];
    SetIdentityHeadersInNotificationsEnabledResponse$ = [
      3,
      n0,
      _SIHINERe,
      0,
      [],
      []
    ];
    SetIdentityMailFromDomainRequest$ = [
      3,
      n0,
      _SIMFDR,
      0,
      [_I, _MFD, _BOMXF],
      [0, 0, 0],
      1
    ];
    SetIdentityMailFromDomainResponse$ = [
      3,
      n0,
      _SIMFDRe,
      0,
      [],
      []
    ];
    SetIdentityNotificationTopicRequest$ = [
      3,
      n0,
      _SINTR,
      0,
      [_I, _NTo, _ST],
      [0, 0, 0],
      2
    ];
    SetIdentityNotificationTopicResponse$ = [
      3,
      n0,
      _SINTRe,
      0,
      [],
      []
    ];
    SetReceiptRulePositionRequest$ = [
      3,
      n0,
      _SRRPR,
      0,
      [_RSN, _RN, _A],
      [0, 0, 0],
      2
    ];
    SetReceiptRulePositionResponse$ = [
      3,
      n0,
      _SRRPRe,
      0,
      [],
      []
    ];
    SNSAction$ = [
      3,
      n0,
      _SNSA,
      0,
      [_TA, _Enc],
      [0, 0],
      1
    ];
    SNSDestination$ = [
      3,
      n0,
      _SNSD,
      0,
      [_TARN],
      [0],
      1
    ];
    StopAction$ = [
      3,
      n0,
      _SAt,
      0,
      [_Sc, _TA],
      [0, 0],
      1
    ];
    Template$ = [
      3,
      n0,
      _Tem,
      0,
      [_TN, _SP, _TPe, _HP],
      [0, 0, 0, 0],
      1
    ];
    TemplateMetadata$ = [
      3,
      n0,
      _TMe,
      0,
      [_N, _CTr],
      [0, 4]
    ];
    TestRenderTemplateRequest$ = [
      3,
      n0,
      _TRTR,
      0,
      [_TN, _TD],
      [0, 0],
      2
    ];
    TestRenderTemplateResponse$ = [
      3,
      n0,
      _TRTRe,
      0,
      [_RTe],
      [0]
    ];
    TrackingOptions$ = [
      3,
      n0,
      _TO,
      0,
      [_CRD],
      [0]
    ];
    UpdateAccountSendingEnabledRequest$ = [
      3,
      n0,
      _UASER,
      0,
      [_En],
      [2]
    ];
    UpdateConfigurationSetEventDestinationRequest$ = [
      3,
      n0,
      _UCSEDR,
      0,
      [_CSN, _ED],
      [0, () => EventDestination$],
      2
    ];
    UpdateConfigurationSetEventDestinationResponse$ = [
      3,
      n0,
      _UCSEDRp,
      0,
      [],
      []
    ];
    UpdateConfigurationSetReputationMetricsEnabledRequest$ = [
      3,
      n0,
      _UCSRMER,
      0,
      [_CSN, _En],
      [0, 2],
      2
    ];
    UpdateConfigurationSetSendingEnabledRequest$ = [
      3,
      n0,
      _UCSSER,
      0,
      [_CSN, _En],
      [0, 2],
      2
    ];
    UpdateConfigurationSetTrackingOptionsRequest$ = [
      3,
      n0,
      _UCSTOR,
      0,
      [_CSN, _TO],
      [0, () => TrackingOptions$],
      2
    ];
    UpdateConfigurationSetTrackingOptionsResponse$ = [
      3,
      n0,
      _UCSTORp,
      0,
      [],
      []
    ];
    UpdateCustomVerificationEmailTemplateRequest$ = [
      3,
      n0,
      _UCVETR,
      0,
      [_TN, _FEA, _TS, _TC, _SRURL, _FRURL],
      [0, 0, 0, 0, 0, 0],
      1
    ];
    UpdateReceiptRuleRequest$ = [
      3,
      n0,
      _URRR,
      0,
      [_RSN, _Ru],
      [0, () => ReceiptRule$],
      2
    ];
    UpdateReceiptRuleResponse$ = [
      3,
      n0,
      _URRRp,
      0,
      [],
      []
    ];
    UpdateTemplateRequest$ = [
      3,
      n0,
      _UTR,
      0,
      [_Tem],
      [() => Template$],
      1
    ];
    UpdateTemplateResponse$ = [
      3,
      n0,
      _UTRp,
      0,
      [],
      []
    ];
    VerifyDomainDkimRequest$ = [
      3,
      n0,
      _VDDR,
      0,
      [_Do],
      [0],
      1
    ];
    VerifyDomainDkimResponse$ = [
      3,
      n0,
      _VDDRe,
      0,
      [_DT],
      [64 | 0],
      1
    ];
    VerifyDomainIdentityRequest$ = [
      3,
      n0,
      _VDIR,
      0,
      [_Do],
      [0],
      1
    ];
    VerifyDomainIdentityResponse$ = [
      3,
      n0,
      _VDIRe,
      0,
      [_VT],
      [0],
      1
    ];
    VerifyEmailAddressRequest$ = [
      3,
      n0,
      _VEAR,
      0,
      [_EA],
      [0],
      1
    ];
    VerifyEmailIdentityRequest$ = [
      3,
      n0,
      _VEIR,
      0,
      [_EA],
      [0],
      1
    ];
    VerifyEmailIdentityResponse$ = [
      3,
      n0,
      _VEIRe,
      0,
      [],
      []
    ];
    WorkmailAction$ = [
      3,
      n0,
      _WA,
      0,
      [_OA, _TA],
      [0, 0],
      1
    ];
    __Unit = "unit";
    AddressList = 64 | 0;
    BouncedRecipientInfoList = [
      1,
      n0,
      _BRIL,
      0,
      () => BouncedRecipientInfo$
    ];
    BulkEmailDestinationList = [
      1,
      n0,
      _BEDL,
      0,
      () => BulkEmailDestination$
    ];
    BulkEmailDestinationStatusList = [
      1,
      n0,
      _BEDSL,
      0,
      () => BulkEmailDestinationStatus$
    ];
    CloudWatchDimensionConfigurations = [
      1,
      n0,
      _CWDCl,
      0,
      () => CloudWatchDimensionConfiguration$
    ];
    ConfigurationSetAttributeList = 64 | 0;
    ConfigurationSets = [
      1,
      n0,
      _CSo,
      0,
      () => ConfigurationSet$
    ];
    CustomVerificationEmailTemplates = [
      1,
      n0,
      _CVETu,
      0,
      () => CustomVerificationEmailTemplate$
    ];
    EventDestinations = [
      1,
      n0,
      _EDv,
      0,
      () => EventDestination$
    ];
    EventTypes = 64 | 0;
    ExtensionFieldList = [
      1,
      n0,
      _EFL,
      0,
      () => ExtensionField$
    ];
    IdentityList = 64 | 0;
    MessageTagList = [
      1,
      n0,
      _MTL,
      0,
      () => MessageTag$
    ];
    PolicyNameList = 64 | 0;
    ReceiptActionsList = [
      1,
      n0,
      _RAL,
      0,
      () => ReceiptAction$
    ];
    ReceiptFilterList = [
      1,
      n0,
      _RFL,
      0,
      () => ReceiptFilter$
    ];
    ReceiptRuleNamesList = 64 | 0;
    ReceiptRuleSetsLists = [
      1,
      n0,
      _RRSL,
      0,
      () => ReceiptRuleSetMetadata$
    ];
    ReceiptRulesList = [
      1,
      n0,
      _RRL,
      0,
      () => ReceiptRule$
    ];
    RecipientsList = 64 | 0;
    SendDataPointList = [
      1,
      n0,
      _SDPL,
      0,
      () => SendDataPoint$
    ];
    TemplateMetadataList = [
      1,
      n0,
      _TML,
      0,
      () => TemplateMetadata$
    ];
    VerificationTokenList = 64 | 0;
    DkimAttributes = [
      2,
      n0,
      _DA,
      0,
      0,
      () => IdentityDkimAttributes$
    ];
    MailFromDomainAttributes = [
      2,
      n0,
      _MFDA,
      0,
      0,
      () => IdentityMailFromDomainAttributes$
    ];
    NotificationAttributes = [
      2,
      n0,
      _NA,
      0,
      0,
      () => IdentityNotificationAttributes$
    ];
    PolicyMap = 128 | 0;
    VerificationAttributes = [
      2,
      n0,
      _VA,
      0,
      0,
      () => IdentityVerificationAttributes$
    ];
    CloneReceiptRuleSet$ = [
      9,
      n0,
      _CRRS,
      0,
      () => CloneReceiptRuleSetRequest$,
      () => CloneReceiptRuleSetResponse$
    ];
    CreateConfigurationSet$ = [
      9,
      n0,
      _CCS,
      0,
      () => CreateConfigurationSetRequest$,
      () => CreateConfigurationSetResponse$
    ];
    CreateConfigurationSetEventDestination$ = [
      9,
      n0,
      _CCSED,
      0,
      () => CreateConfigurationSetEventDestinationRequest$,
      () => CreateConfigurationSetEventDestinationResponse$
    ];
    CreateConfigurationSetTrackingOptions$ = [
      9,
      n0,
      _CCSTO,
      0,
      () => CreateConfigurationSetTrackingOptionsRequest$,
      () => CreateConfigurationSetTrackingOptionsResponse$
    ];
    CreateCustomVerificationEmailTemplate$ = [
      9,
      n0,
      _CCVET,
      0,
      () => CreateCustomVerificationEmailTemplateRequest$,
      () => __Unit
    ];
    CreateReceiptFilter$ = [
      9,
      n0,
      _CRF,
      0,
      () => CreateReceiptFilterRequest$,
      () => CreateReceiptFilterResponse$
    ];
    CreateReceiptRule$ = [
      9,
      n0,
      _CRR,
      0,
      () => CreateReceiptRuleRequest$,
      () => CreateReceiptRuleResponse$
    ];
    CreateReceiptRuleSet$ = [
      9,
      n0,
      _CRRSr,
      0,
      () => CreateReceiptRuleSetRequest$,
      () => CreateReceiptRuleSetResponse$
    ];
    CreateTemplate$ = [
      9,
      n0,
      _CTre,
      0,
      () => CreateTemplateRequest$,
      () => CreateTemplateResponse$
    ];
    DeleteConfigurationSet$ = [
      9,
      n0,
      _DCS,
      0,
      () => DeleteConfigurationSetRequest$,
      () => DeleteConfigurationSetResponse$
    ];
    DeleteConfigurationSetEventDestination$ = [
      9,
      n0,
      _DCSED,
      0,
      () => DeleteConfigurationSetEventDestinationRequest$,
      () => DeleteConfigurationSetEventDestinationResponse$
    ];
    DeleteConfigurationSetTrackingOptions$ = [
      9,
      n0,
      _DCSTO,
      0,
      () => DeleteConfigurationSetTrackingOptionsRequest$,
      () => DeleteConfigurationSetTrackingOptionsResponse$
    ];
    DeleteCustomVerificationEmailTemplate$ = [
      9,
      n0,
      _DCVET,
      0,
      () => DeleteCustomVerificationEmailTemplateRequest$,
      () => __Unit
    ];
    DeleteIdentity$ = [
      9,
      n0,
      _DI,
      0,
      () => DeleteIdentityRequest$,
      () => DeleteIdentityResponse$
    ];
    DeleteIdentityPolicy$ = [
      9,
      n0,
      _DIP,
      0,
      () => DeleteIdentityPolicyRequest$,
      () => DeleteIdentityPolicyResponse$
    ];
    DeleteReceiptFilter$ = [
      9,
      n0,
      _DRF,
      0,
      () => DeleteReceiptFilterRequest$,
      () => DeleteReceiptFilterResponse$
    ];
    DeleteReceiptRule$ = [
      9,
      n0,
      _DRR,
      0,
      () => DeleteReceiptRuleRequest$,
      () => DeleteReceiptRuleResponse$
    ];
    DeleteReceiptRuleSet$ = [
      9,
      n0,
      _DRRS,
      0,
      () => DeleteReceiptRuleSetRequest$,
      () => DeleteReceiptRuleSetResponse$
    ];
    DeleteTemplate$ = [
      9,
      n0,
      _DTel,
      0,
      () => DeleteTemplateRequest$,
      () => DeleteTemplateResponse$
    ];
    DeleteVerifiedEmailAddress$ = [
      9,
      n0,
      _DVEA,
      0,
      () => DeleteVerifiedEmailAddressRequest$,
      () => __Unit
    ];
    DescribeActiveReceiptRuleSet$ = [
      9,
      n0,
      _DARRS,
      0,
      () => DescribeActiveReceiptRuleSetRequest$,
      () => DescribeActiveReceiptRuleSetResponse$
    ];
    DescribeConfigurationSet$ = [
      9,
      n0,
      _DCSe,
      0,
      () => DescribeConfigurationSetRequest$,
      () => DescribeConfigurationSetResponse$
    ];
    DescribeReceiptRule$ = [
      9,
      n0,
      _DRRe,
      0,
      () => DescribeReceiptRuleRequest$,
      () => DescribeReceiptRuleResponse$
    ];
    DescribeReceiptRuleSet$ = [
      9,
      n0,
      _DRRSe,
      0,
      () => DescribeReceiptRuleSetRequest$,
      () => DescribeReceiptRuleSetResponse$
    ];
    GetAccountSendingEnabled$ = [
      9,
      n0,
      _GASE,
      0,
      () => __Unit,
      () => GetAccountSendingEnabledResponse$
    ];
    GetCustomVerificationEmailTemplate$ = [
      9,
      n0,
      _GCVET,
      0,
      () => GetCustomVerificationEmailTemplateRequest$,
      () => GetCustomVerificationEmailTemplateResponse$
    ];
    GetIdentityDkimAttributes$ = [
      9,
      n0,
      _GIDA,
      0,
      () => GetIdentityDkimAttributesRequest$,
      () => GetIdentityDkimAttributesResponse$
    ];
    GetIdentityMailFromDomainAttributes$ = [
      9,
      n0,
      _GIMFDA,
      0,
      () => GetIdentityMailFromDomainAttributesRequest$,
      () => GetIdentityMailFromDomainAttributesResponse$
    ];
    GetIdentityNotificationAttributes$ = [
      9,
      n0,
      _GINA,
      0,
      () => GetIdentityNotificationAttributesRequest$,
      () => GetIdentityNotificationAttributesResponse$
    ];
    GetIdentityPolicies$ = [
      9,
      n0,
      _GIP,
      0,
      () => GetIdentityPoliciesRequest$,
      () => GetIdentityPoliciesResponse$
    ];
    GetIdentityVerificationAttributes$ = [
      9,
      n0,
      _GIVA,
      0,
      () => GetIdentityVerificationAttributesRequest$,
      () => GetIdentityVerificationAttributesResponse$
    ];
    GetSendQuota$ = [
      9,
      n0,
      _GSQ,
      0,
      () => __Unit,
      () => GetSendQuotaResponse$
    ];
    GetSendStatistics$ = [
      9,
      n0,
      _GSS,
      0,
      () => __Unit,
      () => GetSendStatisticsResponse$
    ];
    GetTemplate$ = [
      9,
      n0,
      _GT,
      0,
      () => GetTemplateRequest$,
      () => GetTemplateResponse$
    ];
    ListConfigurationSets$ = [
      9,
      n0,
      _LCS,
      0,
      () => ListConfigurationSetsRequest$,
      () => ListConfigurationSetsResponse$
    ];
    ListCustomVerificationEmailTemplates$ = [
      9,
      n0,
      _LCVET,
      0,
      () => ListCustomVerificationEmailTemplatesRequest$,
      () => ListCustomVerificationEmailTemplatesResponse$
    ];
    ListIdentities$ = [
      9,
      n0,
      _LI,
      0,
      () => ListIdentitiesRequest$,
      () => ListIdentitiesResponse$
    ];
    ListIdentityPolicies$ = [
      9,
      n0,
      _LIP,
      0,
      () => ListIdentityPoliciesRequest$,
      () => ListIdentityPoliciesResponse$
    ];
    ListReceiptFilters$ = [
      9,
      n0,
      _LRF,
      0,
      () => ListReceiptFiltersRequest$,
      () => ListReceiptFiltersResponse$
    ];
    ListReceiptRuleSets$ = [
      9,
      n0,
      _LRRS,
      0,
      () => ListReceiptRuleSetsRequest$,
      () => ListReceiptRuleSetsResponse$
    ];
    ListTemplates$ = [
      9,
      n0,
      _LT,
      0,
      () => ListTemplatesRequest$,
      () => ListTemplatesResponse$
    ];
    ListVerifiedEmailAddresses$ = [
      9,
      n0,
      _LVEA,
      0,
      () => __Unit,
      () => ListVerifiedEmailAddressesResponse$
    ];
    PutConfigurationSetDeliveryOptions$ = [
      9,
      n0,
      _PCSDO,
      0,
      () => PutConfigurationSetDeliveryOptionsRequest$,
      () => PutConfigurationSetDeliveryOptionsResponse$
    ];
    PutIdentityPolicy$ = [
      9,
      n0,
      _PIP,
      0,
      () => PutIdentityPolicyRequest$,
      () => PutIdentityPolicyResponse$
    ];
    ReorderReceiptRuleSet$ = [
      9,
      n0,
      _RRRS,
      0,
      () => ReorderReceiptRuleSetRequest$,
      () => ReorderReceiptRuleSetResponse$
    ];
    SendBounce$ = [
      9,
      n0,
      _SB,
      0,
      () => SendBounceRequest$,
      () => SendBounceResponse$
    ];
    SendBulkTemplatedEmail$ = [
      9,
      n0,
      _SBTE,
      0,
      () => SendBulkTemplatedEmailRequest$,
      () => SendBulkTemplatedEmailResponse$
    ];
    SendCustomVerificationEmail$ = [
      9,
      n0,
      _SCVE,
      0,
      () => SendCustomVerificationEmailRequest$,
      () => SendCustomVerificationEmailResponse$
    ];
    SendEmail$ = [
      9,
      n0,
      _SEen,
      0,
      () => SendEmailRequest$,
      () => SendEmailResponse$
    ];
    SendRawEmail$ = [
      9,
      n0,
      _SRE,
      0,
      () => SendRawEmailRequest$,
      () => SendRawEmailResponse$
    ];
    SendTemplatedEmail$ = [
      9,
      n0,
      _STE,
      0,
      () => SendTemplatedEmailRequest$,
      () => SendTemplatedEmailResponse$
    ];
    SetActiveReceiptRuleSet$ = [
      9,
      n0,
      _SARRS,
      0,
      () => SetActiveReceiptRuleSetRequest$,
      () => SetActiveReceiptRuleSetResponse$
    ];
    SetIdentityDkimEnabled$ = [
      9,
      n0,
      _SIDE,
      0,
      () => SetIdentityDkimEnabledRequest$,
      () => SetIdentityDkimEnabledResponse$
    ];
    SetIdentityFeedbackForwardingEnabled$ = [
      9,
      n0,
      _SIFFE,
      0,
      () => SetIdentityFeedbackForwardingEnabledRequest$,
      () => SetIdentityFeedbackForwardingEnabledResponse$
    ];
    SetIdentityHeadersInNotificationsEnabled$ = [
      9,
      n0,
      _SIHINE,
      0,
      () => SetIdentityHeadersInNotificationsEnabledRequest$,
      () => SetIdentityHeadersInNotificationsEnabledResponse$
    ];
    SetIdentityMailFromDomain$ = [
      9,
      n0,
      _SIMFD,
      0,
      () => SetIdentityMailFromDomainRequest$,
      () => SetIdentityMailFromDomainResponse$
    ];
    SetIdentityNotificationTopic$ = [
      9,
      n0,
      _SINT,
      0,
      () => SetIdentityNotificationTopicRequest$,
      () => SetIdentityNotificationTopicResponse$
    ];
    SetReceiptRulePosition$ = [
      9,
      n0,
      _SRRP,
      0,
      () => SetReceiptRulePositionRequest$,
      () => SetReceiptRulePositionResponse$
    ];
    TestRenderTemplate$ = [
      9,
      n0,
      _TRT,
      0,
      () => TestRenderTemplateRequest$,
      () => TestRenderTemplateResponse$
    ];
    UpdateAccountSendingEnabled$ = [
      9,
      n0,
      _UASE,
      0,
      () => UpdateAccountSendingEnabledRequest$,
      () => __Unit
    ];
    UpdateConfigurationSetEventDestination$ = [
      9,
      n0,
      _UCSED,
      0,
      () => UpdateConfigurationSetEventDestinationRequest$,
      () => UpdateConfigurationSetEventDestinationResponse$
    ];
    UpdateConfigurationSetReputationMetricsEnabled$ = [
      9,
      n0,
      _UCSRME,
      0,
      () => UpdateConfigurationSetReputationMetricsEnabledRequest$,
      () => __Unit
    ];
    UpdateConfigurationSetSendingEnabled$ = [
      9,
      n0,
      _UCSSE,
      0,
      () => UpdateConfigurationSetSendingEnabledRequest$,
      () => __Unit
    ];
    UpdateConfigurationSetTrackingOptions$ = [
      9,
      n0,
      _UCSTO,
      0,
      () => UpdateConfigurationSetTrackingOptionsRequest$,
      () => UpdateConfigurationSetTrackingOptionsResponse$
    ];
    UpdateCustomVerificationEmailTemplate$ = [
      9,
      n0,
      _UCVET,
      0,
      () => UpdateCustomVerificationEmailTemplateRequest$,
      () => __Unit
    ];
    UpdateReceiptRule$ = [
      9,
      n0,
      _URR,
      0,
      () => UpdateReceiptRuleRequest$,
      () => UpdateReceiptRuleResponse$
    ];
    UpdateTemplate$ = [
      9,
      n0,
      _UT,
      0,
      () => UpdateTemplateRequest$,
      () => UpdateTemplateResponse$
    ];
    VerifyDomainDkim$ = [
      9,
      n0,
      _VDD,
      0,
      () => VerifyDomainDkimRequest$,
      () => VerifyDomainDkimResponse$
    ];
    VerifyDomainIdentity$ = [
      9,
      n0,
      _VDI,
      0,
      () => VerifyDomainIdentityRequest$,
      () => VerifyDomainIdentityResponse$
    ];
    VerifyEmailAddress$ = [
      9,
      n0,
      _VEAe,
      0,
      () => VerifyEmailAddressRequest$,
      () => __Unit
    ];
    VerifyEmailIdentity$ = [
      9,
      n0,
      _VEI,
      0,
      () => VerifyEmailIdentityRequest$,
      () => VerifyEmailIdentityResponse$
    ];
  }
});
var getRuntimeConfig;
var init_runtimeConfig_shared = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/runtimeConfig.shared.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_httpAuthSchemes2();
    init_protocols2();
    init_client3();
    init_protocols();
    init_index_browser2();
    init_httpAuthSchemeProvider();
    init_endpointResolver();
    init_schemas_0();
    getRuntimeConfig = /* @__PURE__ */ __name2((config) => {
      return {
        apiVersion: "2010-12-01",
        base64Decoder: config?.base64Decoder ?? fromBase64,
        base64Encoder: config?.base64Encoder ?? toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSESHttpAuthSchemeProvider,
        httpAuthSchemes: config?.httpAuthSchemes ?? [
          {
            schemeId: "aws.auth#sigv4",
            identityProvider: /* @__PURE__ */ __name2((ipc) => ipc.getIdentityProvider("aws.auth#sigv4"), "identityProvider"),
            signer: new AwsSdkSigV4Signer()
          }
        ],
        logger: config?.logger ?? new NoOpLogger(),
        protocol: config?.protocol ?? AwsQueryProtocol,
        protocolSettings: config?.protocolSettings ?? {
          defaultNamespace: "com.amazonaws.ses",
          errorTypeRegistries,
          xmlNamespace: "http://ses.amazonaws.com/doc/2010-12-01/",
          version: "2010-12-01",
          serviceTarget: "SimpleEmailService"
        },
        serviceId: config?.serviceId ?? "SES",
        urlParser: config?.urlParser ?? parseUrl,
        utf8Decoder: config?.utf8Decoder ?? fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? toUtf8
      };
    }, "getRuntimeConfig");
  }
});
var getRuntimeConfig2;
var init_runtimeConfig_browser = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/runtimeConfig.browser.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_package();
    init_module5();
    init_index_browser6();
    init_client3();
    init_index_browser5();
    init_index_browser4();
    init_index_browser2();
    init_dist_es6();
    init_runtimeConfig_shared();
    getRuntimeConfig2 = /* @__PURE__ */ __name2((config) => {
      const defaultsMode = resolveDefaultsModeConfig(config);
      const defaultConfigProvider = /* @__PURE__ */ __name2(() => defaultsMode().then(loadConfigsForDefaultMode), "defaultConfigProvider");
      const clientSharedValues = getRuntimeConfig(config);
      return {
        ...clientSharedValues,
        ...config,
        runtime: "browser",
        defaultsMode,
        bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
        credentialDefaultProvider: config?.credentialDefaultProvider ?? ((_) => () => Promise.reject(new Error("Credential is missing"))),
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: package_default.version }),
        maxAttempts: config?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS,
        region: config?.region ?? invalidProvider("Region is missing"),
        requestHandler: FetchHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ?? (async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE),
        sha256: config?.sha256 ?? Sha2563,
        streamCollector: config?.streamCollector ?? streamCollector,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (() => Promise.resolve(DEFAULT_USE_DUALSTACK_ENDPOINT)),
        useFipsEndpoint: config?.useFipsEndpoint ?? (() => Promise.resolve(DEFAULT_USE_FIPS_ENDPOINT))
      };
    }, "getRuntimeConfig");
  }
});
var getHttpAuthExtensionConfiguration;
var resolveHttpAuthRuntimeConfig;
var init_httpAuthExtensionConfiguration = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/auth/httpAuthExtensionConfiguration.js"() {
    init_functionsRoutes_0_9440137819328775();
    getHttpAuthExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
      let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
      let _credentials = runtimeConfig.credentials;
      return {
        setHttpAuthScheme(httpAuthScheme) {
          const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
          if (index === -1) {
            _httpAuthSchemes.push(httpAuthScheme);
          } else {
            _httpAuthSchemes.splice(index, 1, httpAuthScheme);
          }
        },
        httpAuthSchemes() {
          return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
          _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
          return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
          _credentials = credentials;
        },
        credentials() {
          return _credentials;
        }
      };
    }, "getHttpAuthExtensionConfiguration");
    resolveHttpAuthRuntimeConfig = /* @__PURE__ */ __name2((config) => {
      return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
      };
    }, "resolveHttpAuthRuntimeConfig");
  }
});
var resolveRuntimeExtensions;
var init_runtimeExtensions = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/runtimeExtensions.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser6();
    init_client3();
    init_protocols();
    init_httpAuthExtensionConfiguration();
    resolveRuntimeExtensions = /* @__PURE__ */ __name2((runtimeConfig, extensions) => {
      const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
      extensions.forEach((extension) => extension.configure(extensionConfiguration));
      return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
    }, "resolveRuntimeExtensions");
  }
});
var SESClient;
var init_SESClient = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/SESClient.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_index_browser6();
    init_dist_es3();
    init_client3();
    init_index_browser5();
    init_index_browser();
    init_protocols();
    init_index_browser4();
    init_schema2();
    init_httpAuthSchemeProvider();
    init_EndpointParameters();
    init_runtimeConfig_browser();
    init_runtimeExtensions();
    SESClient = class extends Client {
      static {
        __name(this, "SESClient");
      }
      static {
        __name2(this, "SESClient");
      }
      config;
      constructor(...[configuration]) {
        const _config_0 = getRuntimeConfig2(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = resolveUserAgentConfig(_config_1);
        const _config_3 = resolveRetryConfig(_config_2);
        const _config_4 = resolveRegionConfig(_config_3);
        const _config_5 = resolveHostHeaderConfig(_config_4);
        const _config_6 = resolveEndpointConfig(_config_5);
        const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use(getSchemaSerdePlugin(this.config));
        this.middlewareStack.use(getUserAgentPlugin(this.config));
        this.middlewareStack.use(getRetryPlugin(this.config));
        this.middlewareStack.use(getContentLengthPlugin(this.config));
        this.middlewareStack.use(getHostHeaderPlugin(this.config));
        this.middlewareStack.use(getLoggerPlugin(this.config));
        this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
        this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: defaultSESHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: /* @__PURE__ */ __name2(async (config) => new DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials
          }), "identityProviderConfigProvider")
        }));
        this.middlewareStack.use(getHttpSigningPlugin(this.config));
      }
      destroy() {
        super.destroy();
      }
    };
  }
});
var CloneReceiptRuleSetCommand;
var init_CloneReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CloneReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CloneReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CloneReceiptRuleSet", {}).n("SESClient", "CloneReceiptRuleSetCommand").sc(CloneReceiptRuleSet$).build() {
      static {
        __name(this, "CloneReceiptRuleSetCommand");
      }
      static {
        __name2(this, "CloneReceiptRuleSetCommand");
      }
    };
  }
});
var CreateConfigurationSetCommand;
var init_CreateConfigurationSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateConfigurationSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateConfigurationSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateConfigurationSet", {}).n("SESClient", "CreateConfigurationSetCommand").sc(CreateConfigurationSet$).build() {
      static {
        __name(this, "CreateConfigurationSetCommand");
      }
      static {
        __name2(this, "CreateConfigurationSetCommand");
      }
    };
  }
});
var CreateConfigurationSetEventDestinationCommand;
var init_CreateConfigurationSetEventDestinationCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateConfigurationSetEventDestinationCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateConfigurationSetEventDestinationCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateConfigurationSetEventDestination", {}).n("SESClient", "CreateConfigurationSetEventDestinationCommand").sc(CreateConfigurationSetEventDestination$).build() {
      static {
        __name(this, "CreateConfigurationSetEventDestinationCommand");
      }
      static {
        __name2(this, "CreateConfigurationSetEventDestinationCommand");
      }
    };
  }
});
var CreateConfigurationSetTrackingOptionsCommand;
var init_CreateConfigurationSetTrackingOptionsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateConfigurationSetTrackingOptionsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateConfigurationSetTrackingOptionsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateConfigurationSetTrackingOptions", {}).n("SESClient", "CreateConfigurationSetTrackingOptionsCommand").sc(CreateConfigurationSetTrackingOptions$).build() {
      static {
        __name(this, "CreateConfigurationSetTrackingOptionsCommand");
      }
      static {
        __name2(this, "CreateConfigurationSetTrackingOptionsCommand");
      }
    };
  }
});
var CreateCustomVerificationEmailTemplateCommand;
var init_CreateCustomVerificationEmailTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateCustomVerificationEmailTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateCustomVerificationEmailTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateCustomVerificationEmailTemplate", {}).n("SESClient", "CreateCustomVerificationEmailTemplateCommand").sc(CreateCustomVerificationEmailTemplate$).build() {
      static {
        __name(this, "CreateCustomVerificationEmailTemplateCommand");
      }
      static {
        __name2(this, "CreateCustomVerificationEmailTemplateCommand");
      }
    };
  }
});
var CreateReceiptFilterCommand;
var init_CreateReceiptFilterCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateReceiptFilterCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateReceiptFilterCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateReceiptFilter", {}).n("SESClient", "CreateReceiptFilterCommand").sc(CreateReceiptFilter$).build() {
      static {
        __name(this, "CreateReceiptFilterCommand");
      }
      static {
        __name2(this, "CreateReceiptFilterCommand");
      }
    };
  }
});
var CreateReceiptRuleCommand;
var init_CreateReceiptRuleCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateReceiptRuleCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateReceiptRuleCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateReceiptRule", {}).n("SESClient", "CreateReceiptRuleCommand").sc(CreateReceiptRule$).build() {
      static {
        __name(this, "CreateReceiptRuleCommand");
      }
      static {
        __name2(this, "CreateReceiptRuleCommand");
      }
    };
  }
});
var CreateReceiptRuleSetCommand;
var init_CreateReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateReceiptRuleSet", {}).n("SESClient", "CreateReceiptRuleSetCommand").sc(CreateReceiptRuleSet$).build() {
      static {
        __name(this, "CreateReceiptRuleSetCommand");
      }
      static {
        __name2(this, "CreateReceiptRuleSetCommand");
      }
    };
  }
});
var CreateTemplateCommand;
var init_CreateTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/CreateTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    CreateTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "CreateTemplate", {}).n("SESClient", "CreateTemplateCommand").sc(CreateTemplate$).build() {
      static {
        __name(this, "CreateTemplateCommand");
      }
      static {
        __name2(this, "CreateTemplateCommand");
      }
    };
  }
});
var DeleteConfigurationSetCommand;
var init_DeleteConfigurationSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteConfigurationSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteConfigurationSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteConfigurationSet", {}).n("SESClient", "DeleteConfigurationSetCommand").sc(DeleteConfigurationSet$).build() {
      static {
        __name(this, "DeleteConfigurationSetCommand");
      }
      static {
        __name2(this, "DeleteConfigurationSetCommand");
      }
    };
  }
});
var DeleteConfigurationSetEventDestinationCommand;
var init_DeleteConfigurationSetEventDestinationCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteConfigurationSetEventDestinationCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteConfigurationSetEventDestinationCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteConfigurationSetEventDestination", {}).n("SESClient", "DeleteConfigurationSetEventDestinationCommand").sc(DeleteConfigurationSetEventDestination$).build() {
      static {
        __name(this, "DeleteConfigurationSetEventDestinationCommand");
      }
      static {
        __name2(this, "DeleteConfigurationSetEventDestinationCommand");
      }
    };
  }
});
var DeleteConfigurationSetTrackingOptionsCommand;
var init_DeleteConfigurationSetTrackingOptionsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteConfigurationSetTrackingOptionsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteConfigurationSetTrackingOptionsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteConfigurationSetTrackingOptions", {}).n("SESClient", "DeleteConfigurationSetTrackingOptionsCommand").sc(DeleteConfigurationSetTrackingOptions$).build() {
      static {
        __name(this, "DeleteConfigurationSetTrackingOptionsCommand");
      }
      static {
        __name2(this, "DeleteConfigurationSetTrackingOptionsCommand");
      }
    };
  }
});
var DeleteCustomVerificationEmailTemplateCommand;
var init_DeleteCustomVerificationEmailTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteCustomVerificationEmailTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteCustomVerificationEmailTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteCustomVerificationEmailTemplate", {}).n("SESClient", "DeleteCustomVerificationEmailTemplateCommand").sc(DeleteCustomVerificationEmailTemplate$).build() {
      static {
        __name(this, "DeleteCustomVerificationEmailTemplateCommand");
      }
      static {
        __name2(this, "DeleteCustomVerificationEmailTemplateCommand");
      }
    };
  }
});
var DeleteIdentityCommand;
var init_DeleteIdentityCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteIdentityCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteIdentity", {}).n("SESClient", "DeleteIdentityCommand").sc(DeleteIdentity$).build() {
      static {
        __name(this, "DeleteIdentityCommand");
      }
      static {
        __name2(this, "DeleteIdentityCommand");
      }
    };
  }
});
var DeleteIdentityPolicyCommand;
var init_DeleteIdentityPolicyCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteIdentityPolicyCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteIdentityPolicyCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteIdentityPolicy", {}).n("SESClient", "DeleteIdentityPolicyCommand").sc(DeleteIdentityPolicy$).build() {
      static {
        __name(this, "DeleteIdentityPolicyCommand");
      }
      static {
        __name2(this, "DeleteIdentityPolicyCommand");
      }
    };
  }
});
var DeleteReceiptFilterCommand;
var init_DeleteReceiptFilterCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteReceiptFilterCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteReceiptFilterCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteReceiptFilter", {}).n("SESClient", "DeleteReceiptFilterCommand").sc(DeleteReceiptFilter$).build() {
      static {
        __name(this, "DeleteReceiptFilterCommand");
      }
      static {
        __name2(this, "DeleteReceiptFilterCommand");
      }
    };
  }
});
var DeleteReceiptRuleCommand;
var init_DeleteReceiptRuleCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteReceiptRuleCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteReceiptRuleCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteReceiptRule", {}).n("SESClient", "DeleteReceiptRuleCommand").sc(DeleteReceiptRule$).build() {
      static {
        __name(this, "DeleteReceiptRuleCommand");
      }
      static {
        __name2(this, "DeleteReceiptRuleCommand");
      }
    };
  }
});
var DeleteReceiptRuleSetCommand;
var init_DeleteReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteReceiptRuleSet", {}).n("SESClient", "DeleteReceiptRuleSetCommand").sc(DeleteReceiptRuleSet$).build() {
      static {
        __name(this, "DeleteReceiptRuleSetCommand");
      }
      static {
        __name2(this, "DeleteReceiptRuleSetCommand");
      }
    };
  }
});
var DeleteTemplateCommand;
var init_DeleteTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteTemplate", {}).n("SESClient", "DeleteTemplateCommand").sc(DeleteTemplate$).build() {
      static {
        __name(this, "DeleteTemplateCommand");
      }
      static {
        __name2(this, "DeleteTemplateCommand");
      }
    };
  }
});
var DeleteVerifiedEmailAddressCommand;
var init_DeleteVerifiedEmailAddressCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DeleteVerifiedEmailAddressCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DeleteVerifiedEmailAddressCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DeleteVerifiedEmailAddress", {}).n("SESClient", "DeleteVerifiedEmailAddressCommand").sc(DeleteVerifiedEmailAddress$).build() {
      static {
        __name(this, "DeleteVerifiedEmailAddressCommand");
      }
      static {
        __name2(this, "DeleteVerifiedEmailAddressCommand");
      }
    };
  }
});
var DescribeActiveReceiptRuleSetCommand;
var init_DescribeActiveReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DescribeActiveReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DescribeActiveReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DescribeActiveReceiptRuleSet", {}).n("SESClient", "DescribeActiveReceiptRuleSetCommand").sc(DescribeActiveReceiptRuleSet$).build() {
      static {
        __name(this, "DescribeActiveReceiptRuleSetCommand");
      }
      static {
        __name2(this, "DescribeActiveReceiptRuleSetCommand");
      }
    };
  }
});
var DescribeConfigurationSetCommand;
var init_DescribeConfigurationSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DescribeConfigurationSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DescribeConfigurationSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DescribeConfigurationSet", {}).n("SESClient", "DescribeConfigurationSetCommand").sc(DescribeConfigurationSet$).build() {
      static {
        __name(this, "DescribeConfigurationSetCommand");
      }
      static {
        __name2(this, "DescribeConfigurationSetCommand");
      }
    };
  }
});
var DescribeReceiptRuleCommand;
var init_DescribeReceiptRuleCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DescribeReceiptRuleCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DescribeReceiptRuleCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DescribeReceiptRule", {}).n("SESClient", "DescribeReceiptRuleCommand").sc(DescribeReceiptRule$).build() {
      static {
        __name(this, "DescribeReceiptRuleCommand");
      }
      static {
        __name2(this, "DescribeReceiptRuleCommand");
      }
    };
  }
});
var DescribeReceiptRuleSetCommand;
var init_DescribeReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/DescribeReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    DescribeReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "DescribeReceiptRuleSet", {}).n("SESClient", "DescribeReceiptRuleSetCommand").sc(DescribeReceiptRuleSet$).build() {
      static {
        __name(this, "DescribeReceiptRuleSetCommand");
      }
      static {
        __name2(this, "DescribeReceiptRuleSetCommand");
      }
    };
  }
});
var GetAccountSendingEnabledCommand;
var init_GetAccountSendingEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetAccountSendingEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetAccountSendingEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetAccountSendingEnabled", {}).n("SESClient", "GetAccountSendingEnabledCommand").sc(GetAccountSendingEnabled$).build() {
      static {
        __name(this, "GetAccountSendingEnabledCommand");
      }
      static {
        __name2(this, "GetAccountSendingEnabledCommand");
      }
    };
  }
});
var GetCustomVerificationEmailTemplateCommand;
var init_GetCustomVerificationEmailTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetCustomVerificationEmailTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetCustomVerificationEmailTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetCustomVerificationEmailTemplate", {}).n("SESClient", "GetCustomVerificationEmailTemplateCommand").sc(GetCustomVerificationEmailTemplate$).build() {
      static {
        __name(this, "GetCustomVerificationEmailTemplateCommand");
      }
      static {
        __name2(this, "GetCustomVerificationEmailTemplateCommand");
      }
    };
  }
});
var GetIdentityDkimAttributesCommand;
var init_GetIdentityDkimAttributesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetIdentityDkimAttributesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetIdentityDkimAttributesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetIdentityDkimAttributes", {}).n("SESClient", "GetIdentityDkimAttributesCommand").sc(GetIdentityDkimAttributes$).build() {
      static {
        __name(this, "GetIdentityDkimAttributesCommand");
      }
      static {
        __name2(this, "GetIdentityDkimAttributesCommand");
      }
    };
  }
});
var GetIdentityMailFromDomainAttributesCommand;
var init_GetIdentityMailFromDomainAttributesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetIdentityMailFromDomainAttributesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetIdentityMailFromDomainAttributesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetIdentityMailFromDomainAttributes", {}).n("SESClient", "GetIdentityMailFromDomainAttributesCommand").sc(GetIdentityMailFromDomainAttributes$).build() {
      static {
        __name(this, "GetIdentityMailFromDomainAttributesCommand");
      }
      static {
        __name2(this, "GetIdentityMailFromDomainAttributesCommand");
      }
    };
  }
});
var GetIdentityNotificationAttributesCommand;
var init_GetIdentityNotificationAttributesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetIdentityNotificationAttributesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetIdentityNotificationAttributesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetIdentityNotificationAttributes", {}).n("SESClient", "GetIdentityNotificationAttributesCommand").sc(GetIdentityNotificationAttributes$).build() {
      static {
        __name(this, "GetIdentityNotificationAttributesCommand");
      }
      static {
        __name2(this, "GetIdentityNotificationAttributesCommand");
      }
    };
  }
});
var GetIdentityPoliciesCommand;
var init_GetIdentityPoliciesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetIdentityPoliciesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetIdentityPoliciesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetIdentityPolicies", {}).n("SESClient", "GetIdentityPoliciesCommand").sc(GetIdentityPolicies$).build() {
      static {
        __name(this, "GetIdentityPoliciesCommand");
      }
      static {
        __name2(this, "GetIdentityPoliciesCommand");
      }
    };
  }
});
var GetIdentityVerificationAttributesCommand;
var init_GetIdentityVerificationAttributesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetIdentityVerificationAttributesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetIdentityVerificationAttributesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetIdentityVerificationAttributes", {}).n("SESClient", "GetIdentityVerificationAttributesCommand").sc(GetIdentityVerificationAttributes$).build() {
      static {
        __name(this, "GetIdentityVerificationAttributesCommand");
      }
      static {
        __name2(this, "GetIdentityVerificationAttributesCommand");
      }
    };
  }
});
var GetSendQuotaCommand;
var init_GetSendQuotaCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetSendQuotaCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetSendQuotaCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetSendQuota", {}).n("SESClient", "GetSendQuotaCommand").sc(GetSendQuota$).build() {
      static {
        __name(this, "GetSendQuotaCommand");
      }
      static {
        __name2(this, "GetSendQuotaCommand");
      }
    };
  }
});
var GetSendStatisticsCommand;
var init_GetSendStatisticsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetSendStatisticsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetSendStatisticsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetSendStatistics", {}).n("SESClient", "GetSendStatisticsCommand").sc(GetSendStatistics$).build() {
      static {
        __name(this, "GetSendStatisticsCommand");
      }
      static {
        __name2(this, "GetSendStatisticsCommand");
      }
    };
  }
});
var GetTemplateCommand;
var init_GetTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/GetTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    GetTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "GetTemplate", {}).n("SESClient", "GetTemplateCommand").sc(GetTemplate$).build() {
      static {
        __name(this, "GetTemplateCommand");
      }
      static {
        __name2(this, "GetTemplateCommand");
      }
    };
  }
});
var ListConfigurationSetsCommand;
var init_ListConfigurationSetsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListConfigurationSetsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListConfigurationSetsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListConfigurationSets", {}).n("SESClient", "ListConfigurationSetsCommand").sc(ListConfigurationSets$).build() {
      static {
        __name(this, "ListConfigurationSetsCommand");
      }
      static {
        __name2(this, "ListConfigurationSetsCommand");
      }
    };
  }
});
var ListCustomVerificationEmailTemplatesCommand;
var init_ListCustomVerificationEmailTemplatesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListCustomVerificationEmailTemplatesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListCustomVerificationEmailTemplatesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListCustomVerificationEmailTemplates", {}).n("SESClient", "ListCustomVerificationEmailTemplatesCommand").sc(ListCustomVerificationEmailTemplates$).build() {
      static {
        __name(this, "ListCustomVerificationEmailTemplatesCommand");
      }
      static {
        __name2(this, "ListCustomVerificationEmailTemplatesCommand");
      }
    };
  }
});
var ListIdentitiesCommand;
var init_ListIdentitiesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListIdentitiesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListIdentitiesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListIdentities", {}).n("SESClient", "ListIdentitiesCommand").sc(ListIdentities$).build() {
      static {
        __name(this, "ListIdentitiesCommand");
      }
      static {
        __name2(this, "ListIdentitiesCommand");
      }
    };
  }
});
var ListIdentityPoliciesCommand;
var init_ListIdentityPoliciesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListIdentityPoliciesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListIdentityPoliciesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListIdentityPolicies", {}).n("SESClient", "ListIdentityPoliciesCommand").sc(ListIdentityPolicies$).build() {
      static {
        __name(this, "ListIdentityPoliciesCommand");
      }
      static {
        __name2(this, "ListIdentityPoliciesCommand");
      }
    };
  }
});
var ListReceiptFiltersCommand;
var init_ListReceiptFiltersCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListReceiptFiltersCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListReceiptFiltersCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListReceiptFilters", {}).n("SESClient", "ListReceiptFiltersCommand").sc(ListReceiptFilters$).build() {
      static {
        __name(this, "ListReceiptFiltersCommand");
      }
      static {
        __name2(this, "ListReceiptFiltersCommand");
      }
    };
  }
});
var ListReceiptRuleSetsCommand;
var init_ListReceiptRuleSetsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListReceiptRuleSetsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListReceiptRuleSetsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListReceiptRuleSets", {}).n("SESClient", "ListReceiptRuleSetsCommand").sc(ListReceiptRuleSets$).build() {
      static {
        __name(this, "ListReceiptRuleSetsCommand");
      }
      static {
        __name2(this, "ListReceiptRuleSetsCommand");
      }
    };
  }
});
var ListTemplatesCommand;
var init_ListTemplatesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListTemplatesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListTemplatesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListTemplates", {}).n("SESClient", "ListTemplatesCommand").sc(ListTemplates$).build() {
      static {
        __name(this, "ListTemplatesCommand");
      }
      static {
        __name2(this, "ListTemplatesCommand");
      }
    };
  }
});
var ListVerifiedEmailAddressesCommand;
var init_ListVerifiedEmailAddressesCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ListVerifiedEmailAddressesCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ListVerifiedEmailAddressesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ListVerifiedEmailAddresses", {}).n("SESClient", "ListVerifiedEmailAddressesCommand").sc(ListVerifiedEmailAddresses$).build() {
      static {
        __name(this, "ListVerifiedEmailAddressesCommand");
      }
      static {
        __name2(this, "ListVerifiedEmailAddressesCommand");
      }
    };
  }
});
var PutConfigurationSetDeliveryOptionsCommand;
var init_PutConfigurationSetDeliveryOptionsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/PutConfigurationSetDeliveryOptionsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    PutConfigurationSetDeliveryOptionsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "PutConfigurationSetDeliveryOptions", {}).n("SESClient", "PutConfigurationSetDeliveryOptionsCommand").sc(PutConfigurationSetDeliveryOptions$).build() {
      static {
        __name(this, "PutConfigurationSetDeliveryOptionsCommand");
      }
      static {
        __name2(this, "PutConfigurationSetDeliveryOptionsCommand");
      }
    };
  }
});
var PutIdentityPolicyCommand;
var init_PutIdentityPolicyCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/PutIdentityPolicyCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    PutIdentityPolicyCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "PutIdentityPolicy", {}).n("SESClient", "PutIdentityPolicyCommand").sc(PutIdentityPolicy$).build() {
      static {
        __name(this, "PutIdentityPolicyCommand");
      }
      static {
        __name2(this, "PutIdentityPolicyCommand");
      }
    };
  }
});
var ReorderReceiptRuleSetCommand;
var init_ReorderReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/ReorderReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    ReorderReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "ReorderReceiptRuleSet", {}).n("SESClient", "ReorderReceiptRuleSetCommand").sc(ReorderReceiptRuleSet$).build() {
      static {
        __name(this, "ReorderReceiptRuleSetCommand");
      }
      static {
        __name2(this, "ReorderReceiptRuleSetCommand");
      }
    };
  }
});
var SendBounceCommand;
var init_SendBounceCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SendBounceCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SendBounceCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SendBounce", {}).n("SESClient", "SendBounceCommand").sc(SendBounce$).build() {
      static {
        __name(this, "SendBounceCommand");
      }
      static {
        __name2(this, "SendBounceCommand");
      }
    };
  }
});
var SendBulkTemplatedEmailCommand;
var init_SendBulkTemplatedEmailCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SendBulkTemplatedEmailCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SendBulkTemplatedEmailCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SendBulkTemplatedEmail", {}).n("SESClient", "SendBulkTemplatedEmailCommand").sc(SendBulkTemplatedEmail$).build() {
      static {
        __name(this, "SendBulkTemplatedEmailCommand");
      }
      static {
        __name2(this, "SendBulkTemplatedEmailCommand");
      }
    };
  }
});
var SendCustomVerificationEmailCommand;
var init_SendCustomVerificationEmailCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SendCustomVerificationEmailCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SendCustomVerificationEmailCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SendCustomVerificationEmail", {}).n("SESClient", "SendCustomVerificationEmailCommand").sc(SendCustomVerificationEmail$).build() {
      static {
        __name(this, "SendCustomVerificationEmailCommand");
      }
      static {
        __name2(this, "SendCustomVerificationEmailCommand");
      }
    };
  }
});
var SendEmailCommand;
var init_SendEmailCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SendEmailCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SendEmailCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SendEmail", {}).n("SESClient", "SendEmailCommand").sc(SendEmail$).build() {
      static {
        __name(this, "SendEmailCommand");
      }
      static {
        __name2(this, "SendEmailCommand");
      }
    };
  }
});
var SendRawEmailCommand;
var init_SendRawEmailCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SendRawEmailCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SendRawEmailCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SendRawEmail", {}).n("SESClient", "SendRawEmailCommand").sc(SendRawEmail$).build() {
      static {
        __name(this, "SendRawEmailCommand");
      }
      static {
        __name2(this, "SendRawEmailCommand");
      }
    };
  }
});
var SendTemplatedEmailCommand;
var init_SendTemplatedEmailCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SendTemplatedEmailCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SendTemplatedEmailCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SendTemplatedEmail", {}).n("SESClient", "SendTemplatedEmailCommand").sc(SendTemplatedEmail$).build() {
      static {
        __name(this, "SendTemplatedEmailCommand");
      }
      static {
        __name2(this, "SendTemplatedEmailCommand");
      }
    };
  }
});
var SetActiveReceiptRuleSetCommand;
var init_SetActiveReceiptRuleSetCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetActiveReceiptRuleSetCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetActiveReceiptRuleSetCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetActiveReceiptRuleSet", {}).n("SESClient", "SetActiveReceiptRuleSetCommand").sc(SetActiveReceiptRuleSet$).build() {
      static {
        __name(this, "SetActiveReceiptRuleSetCommand");
      }
      static {
        __name2(this, "SetActiveReceiptRuleSetCommand");
      }
    };
  }
});
var SetIdentityDkimEnabledCommand;
var init_SetIdentityDkimEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetIdentityDkimEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetIdentityDkimEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetIdentityDkimEnabled", {}).n("SESClient", "SetIdentityDkimEnabledCommand").sc(SetIdentityDkimEnabled$).build() {
      static {
        __name(this, "SetIdentityDkimEnabledCommand");
      }
      static {
        __name2(this, "SetIdentityDkimEnabledCommand");
      }
    };
  }
});
var SetIdentityFeedbackForwardingEnabledCommand;
var init_SetIdentityFeedbackForwardingEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetIdentityFeedbackForwardingEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetIdentityFeedbackForwardingEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetIdentityFeedbackForwardingEnabled", {}).n("SESClient", "SetIdentityFeedbackForwardingEnabledCommand").sc(SetIdentityFeedbackForwardingEnabled$).build() {
      static {
        __name(this, "SetIdentityFeedbackForwardingEnabledCommand");
      }
      static {
        __name2(this, "SetIdentityFeedbackForwardingEnabledCommand");
      }
    };
  }
});
var SetIdentityHeadersInNotificationsEnabledCommand;
var init_SetIdentityHeadersInNotificationsEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetIdentityHeadersInNotificationsEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetIdentityHeadersInNotificationsEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetIdentityHeadersInNotificationsEnabled", {}).n("SESClient", "SetIdentityHeadersInNotificationsEnabledCommand").sc(SetIdentityHeadersInNotificationsEnabled$).build() {
      static {
        __name(this, "SetIdentityHeadersInNotificationsEnabledCommand");
      }
      static {
        __name2(this, "SetIdentityHeadersInNotificationsEnabledCommand");
      }
    };
  }
});
var SetIdentityMailFromDomainCommand;
var init_SetIdentityMailFromDomainCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetIdentityMailFromDomainCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetIdentityMailFromDomainCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetIdentityMailFromDomain", {}).n("SESClient", "SetIdentityMailFromDomainCommand").sc(SetIdentityMailFromDomain$).build() {
      static {
        __name(this, "SetIdentityMailFromDomainCommand");
      }
      static {
        __name2(this, "SetIdentityMailFromDomainCommand");
      }
    };
  }
});
var SetIdentityNotificationTopicCommand;
var init_SetIdentityNotificationTopicCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetIdentityNotificationTopicCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetIdentityNotificationTopicCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetIdentityNotificationTopic", {}).n("SESClient", "SetIdentityNotificationTopicCommand").sc(SetIdentityNotificationTopic$).build() {
      static {
        __name(this, "SetIdentityNotificationTopicCommand");
      }
      static {
        __name2(this, "SetIdentityNotificationTopicCommand");
      }
    };
  }
});
var SetReceiptRulePositionCommand;
var init_SetReceiptRulePositionCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/SetReceiptRulePositionCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    SetReceiptRulePositionCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "SetReceiptRulePosition", {}).n("SESClient", "SetReceiptRulePositionCommand").sc(SetReceiptRulePosition$).build() {
      static {
        __name(this, "SetReceiptRulePositionCommand");
      }
      static {
        __name2(this, "SetReceiptRulePositionCommand");
      }
    };
  }
});
var TestRenderTemplateCommand;
var init_TestRenderTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/TestRenderTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    TestRenderTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "TestRenderTemplate", {}).n("SESClient", "TestRenderTemplateCommand").sc(TestRenderTemplate$).build() {
      static {
        __name(this, "TestRenderTemplateCommand");
      }
      static {
        __name2(this, "TestRenderTemplateCommand");
      }
    };
  }
});
var UpdateAccountSendingEnabledCommand;
var init_UpdateAccountSendingEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateAccountSendingEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateAccountSendingEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateAccountSendingEnabled", {}).n("SESClient", "UpdateAccountSendingEnabledCommand").sc(UpdateAccountSendingEnabled$).build() {
      static {
        __name(this, "UpdateAccountSendingEnabledCommand");
      }
      static {
        __name2(this, "UpdateAccountSendingEnabledCommand");
      }
    };
  }
});
var UpdateConfigurationSetEventDestinationCommand;
var init_UpdateConfigurationSetEventDestinationCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateConfigurationSetEventDestinationCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateConfigurationSetEventDestinationCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateConfigurationSetEventDestination", {}).n("SESClient", "UpdateConfigurationSetEventDestinationCommand").sc(UpdateConfigurationSetEventDestination$).build() {
      static {
        __name(this, "UpdateConfigurationSetEventDestinationCommand");
      }
      static {
        __name2(this, "UpdateConfigurationSetEventDestinationCommand");
      }
    };
  }
});
var UpdateConfigurationSetReputationMetricsEnabledCommand;
var init_UpdateConfigurationSetReputationMetricsEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateConfigurationSetReputationMetricsEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateConfigurationSetReputationMetricsEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateConfigurationSetReputationMetricsEnabled", {}).n("SESClient", "UpdateConfigurationSetReputationMetricsEnabledCommand").sc(UpdateConfigurationSetReputationMetricsEnabled$).build() {
      static {
        __name(this, "UpdateConfigurationSetReputationMetricsEnabledCommand");
      }
      static {
        __name2(this, "UpdateConfigurationSetReputationMetricsEnabledCommand");
      }
    };
  }
});
var UpdateConfigurationSetSendingEnabledCommand;
var init_UpdateConfigurationSetSendingEnabledCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateConfigurationSetSendingEnabledCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateConfigurationSetSendingEnabledCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateConfigurationSetSendingEnabled", {}).n("SESClient", "UpdateConfigurationSetSendingEnabledCommand").sc(UpdateConfigurationSetSendingEnabled$).build() {
      static {
        __name(this, "UpdateConfigurationSetSendingEnabledCommand");
      }
      static {
        __name2(this, "UpdateConfigurationSetSendingEnabledCommand");
      }
    };
  }
});
var UpdateConfigurationSetTrackingOptionsCommand;
var init_UpdateConfigurationSetTrackingOptionsCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateConfigurationSetTrackingOptionsCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateConfigurationSetTrackingOptionsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateConfigurationSetTrackingOptions", {}).n("SESClient", "UpdateConfigurationSetTrackingOptionsCommand").sc(UpdateConfigurationSetTrackingOptions$).build() {
      static {
        __name(this, "UpdateConfigurationSetTrackingOptionsCommand");
      }
      static {
        __name2(this, "UpdateConfigurationSetTrackingOptionsCommand");
      }
    };
  }
});
var UpdateCustomVerificationEmailTemplateCommand;
var init_UpdateCustomVerificationEmailTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateCustomVerificationEmailTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateCustomVerificationEmailTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateCustomVerificationEmailTemplate", {}).n("SESClient", "UpdateCustomVerificationEmailTemplateCommand").sc(UpdateCustomVerificationEmailTemplate$).build() {
      static {
        __name(this, "UpdateCustomVerificationEmailTemplateCommand");
      }
      static {
        __name2(this, "UpdateCustomVerificationEmailTemplateCommand");
      }
    };
  }
});
var UpdateReceiptRuleCommand;
var init_UpdateReceiptRuleCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateReceiptRuleCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateReceiptRuleCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateReceiptRule", {}).n("SESClient", "UpdateReceiptRuleCommand").sc(UpdateReceiptRule$).build() {
      static {
        __name(this, "UpdateReceiptRuleCommand");
      }
      static {
        __name2(this, "UpdateReceiptRuleCommand");
      }
    };
  }
});
var UpdateTemplateCommand;
var init_UpdateTemplateCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/UpdateTemplateCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    UpdateTemplateCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "UpdateTemplate", {}).n("SESClient", "UpdateTemplateCommand").sc(UpdateTemplate$).build() {
      static {
        __name(this, "UpdateTemplateCommand");
      }
      static {
        __name2(this, "UpdateTemplateCommand");
      }
    };
  }
});
var VerifyDomainDkimCommand;
var init_VerifyDomainDkimCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/VerifyDomainDkimCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    VerifyDomainDkimCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "VerifyDomainDkim", {}).n("SESClient", "VerifyDomainDkimCommand").sc(VerifyDomainDkim$).build() {
      static {
        __name(this, "VerifyDomainDkimCommand");
      }
      static {
        __name2(this, "VerifyDomainDkimCommand");
      }
    };
  }
});
var VerifyDomainIdentityCommand;
var init_VerifyDomainIdentityCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/VerifyDomainIdentityCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    VerifyDomainIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "VerifyDomainIdentity", {}).n("SESClient", "VerifyDomainIdentityCommand").sc(VerifyDomainIdentity$).build() {
      static {
        __name(this, "VerifyDomainIdentityCommand");
      }
      static {
        __name2(this, "VerifyDomainIdentityCommand");
      }
    };
  }
});
var VerifyEmailAddressCommand;
var init_VerifyEmailAddressCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/VerifyEmailAddressCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    VerifyEmailAddressCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "VerifyEmailAddress", {}).n("SESClient", "VerifyEmailAddressCommand").sc(VerifyEmailAddress$).build() {
      static {
        __name(this, "VerifyEmailAddressCommand");
      }
      static {
        __name2(this, "VerifyEmailAddressCommand");
      }
    };
  }
});
var VerifyEmailIdentityCommand;
var init_VerifyEmailIdentityCommand = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/VerifyEmailIdentityCommand.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_index_browser();
    init_EndpointParameters();
    init_schemas_0();
    VerifyEmailIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o) {
      return [getEndpointPlugin(config, Command2.getEndpointParameterInstructions())];
    }).s("SimpleEmailService", "VerifyEmailIdentity", {}).n("SESClient", "VerifyEmailIdentityCommand").sc(VerifyEmailIdentity$).build() {
      static {
        __name(this, "VerifyEmailIdentityCommand");
      }
      static {
        __name2(this, "VerifyEmailIdentityCommand");
      }
    };
  }
});
var paginateListCustomVerificationEmailTemplates;
var init_ListCustomVerificationEmailTemplatesPaginator = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/pagination/ListCustomVerificationEmailTemplatesPaginator.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es3();
    init_ListCustomVerificationEmailTemplatesCommand();
    init_SESClient();
    paginateListCustomVerificationEmailTemplates = createPaginator(SESClient, ListCustomVerificationEmailTemplatesCommand, "NextToken", "NextToken", "MaxResults");
  }
});
var paginateListIdentities;
var init_ListIdentitiesPaginator = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/pagination/ListIdentitiesPaginator.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es3();
    init_ListIdentitiesCommand();
    init_SESClient();
    paginateListIdentities = createPaginator(SESClient, ListIdentitiesCommand, "NextToken", "NextToken", "MaxItems");
  }
});
var checkState;
var waitUntilIdentityExists;
var init_waitForIdentityExists = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/waiters/waitForIdentityExists.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_GetIdentityVerificationAttributesCommand();
    checkState = /* @__PURE__ */ __name2(async (client, input) => {
      let reason;
      try {
        let result = await client.send(new GetIdentityVerificationAttributesCommand(input));
        reason = result;
        try {
          const returnComparator = /* @__PURE__ */ __name2(() => {
            let objectProjection_2 = Object.values(result.VerificationAttributes).map((element_1) => {
              return element_1.VerificationStatus;
            });
            return objectProjection_2;
          }, "returnComparator");
          let allStringEq_4 = returnComparator().length > 0;
          for (let element_3 of returnComparator()) {
            allStringEq_4 = allStringEq_4 && element_3 == "Success";
          }
          if (allStringEq_4) {
            return { state: WaiterState.SUCCESS, reason };
          }
        } catch (e2) {
        }
      } catch (exception) {
        reason = exception;
      }
      return { state: WaiterState.RETRY, reason };
    }, "checkState");
    waitUntilIdentityExists = /* @__PURE__ */ __name2(async (params, input) => {
      const serviceDefaults = { minDelay: 3, maxDelay: 120 };
      const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
      return checkExceptions(result);
    }, "waitUntilIdentityExists");
  }
});
var commands;
var paginators;
var waiters;
var SES;
var init_SES = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/SES.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_client3();
    init_CloneReceiptRuleSetCommand();
    init_CreateConfigurationSetCommand();
    init_CreateConfigurationSetEventDestinationCommand();
    init_CreateConfigurationSetTrackingOptionsCommand();
    init_CreateCustomVerificationEmailTemplateCommand();
    init_CreateReceiptFilterCommand();
    init_CreateReceiptRuleCommand();
    init_CreateReceiptRuleSetCommand();
    init_CreateTemplateCommand();
    init_DeleteConfigurationSetCommand();
    init_DeleteConfigurationSetEventDestinationCommand();
    init_DeleteConfigurationSetTrackingOptionsCommand();
    init_DeleteCustomVerificationEmailTemplateCommand();
    init_DeleteIdentityCommand();
    init_DeleteIdentityPolicyCommand();
    init_DeleteReceiptFilterCommand();
    init_DeleteReceiptRuleCommand();
    init_DeleteReceiptRuleSetCommand();
    init_DeleteTemplateCommand();
    init_DeleteVerifiedEmailAddressCommand();
    init_DescribeActiveReceiptRuleSetCommand();
    init_DescribeConfigurationSetCommand();
    init_DescribeReceiptRuleCommand();
    init_DescribeReceiptRuleSetCommand();
    init_GetAccountSendingEnabledCommand();
    init_GetCustomVerificationEmailTemplateCommand();
    init_GetIdentityDkimAttributesCommand();
    init_GetIdentityMailFromDomainAttributesCommand();
    init_GetIdentityNotificationAttributesCommand();
    init_GetIdentityPoliciesCommand();
    init_GetIdentityVerificationAttributesCommand();
    init_GetSendQuotaCommand();
    init_GetSendStatisticsCommand();
    init_GetTemplateCommand();
    init_ListConfigurationSetsCommand();
    init_ListCustomVerificationEmailTemplatesCommand();
    init_ListIdentitiesCommand();
    init_ListIdentityPoliciesCommand();
    init_ListReceiptFiltersCommand();
    init_ListReceiptRuleSetsCommand();
    init_ListTemplatesCommand();
    init_ListVerifiedEmailAddressesCommand();
    init_PutConfigurationSetDeliveryOptionsCommand();
    init_PutIdentityPolicyCommand();
    init_ReorderReceiptRuleSetCommand();
    init_SendBounceCommand();
    init_SendBulkTemplatedEmailCommand();
    init_SendCustomVerificationEmailCommand();
    init_SendEmailCommand();
    init_SendRawEmailCommand();
    init_SendTemplatedEmailCommand();
    init_SetActiveReceiptRuleSetCommand();
    init_SetIdentityDkimEnabledCommand();
    init_SetIdentityFeedbackForwardingEnabledCommand();
    init_SetIdentityHeadersInNotificationsEnabledCommand();
    init_SetIdentityMailFromDomainCommand();
    init_SetIdentityNotificationTopicCommand();
    init_SetReceiptRulePositionCommand();
    init_TestRenderTemplateCommand();
    init_UpdateAccountSendingEnabledCommand();
    init_UpdateConfigurationSetEventDestinationCommand();
    init_UpdateConfigurationSetReputationMetricsEnabledCommand();
    init_UpdateConfigurationSetSendingEnabledCommand();
    init_UpdateConfigurationSetTrackingOptionsCommand();
    init_UpdateCustomVerificationEmailTemplateCommand();
    init_UpdateReceiptRuleCommand();
    init_UpdateTemplateCommand();
    init_VerifyDomainDkimCommand();
    init_VerifyDomainIdentityCommand();
    init_VerifyEmailAddressCommand();
    init_VerifyEmailIdentityCommand();
    init_ListCustomVerificationEmailTemplatesPaginator();
    init_ListIdentitiesPaginator();
    init_SESClient();
    init_waitForIdentityExists();
    commands = {
      CloneReceiptRuleSetCommand,
      CreateConfigurationSetCommand,
      CreateConfigurationSetEventDestinationCommand,
      CreateConfigurationSetTrackingOptionsCommand,
      CreateCustomVerificationEmailTemplateCommand,
      CreateReceiptFilterCommand,
      CreateReceiptRuleCommand,
      CreateReceiptRuleSetCommand,
      CreateTemplateCommand,
      DeleteConfigurationSetCommand,
      DeleteConfigurationSetEventDestinationCommand,
      DeleteConfigurationSetTrackingOptionsCommand,
      DeleteCustomVerificationEmailTemplateCommand,
      DeleteIdentityCommand,
      DeleteIdentityPolicyCommand,
      DeleteReceiptFilterCommand,
      DeleteReceiptRuleCommand,
      DeleteReceiptRuleSetCommand,
      DeleteTemplateCommand,
      DeleteVerifiedEmailAddressCommand,
      DescribeActiveReceiptRuleSetCommand,
      DescribeConfigurationSetCommand,
      DescribeReceiptRuleCommand,
      DescribeReceiptRuleSetCommand,
      GetAccountSendingEnabledCommand,
      GetCustomVerificationEmailTemplateCommand,
      GetIdentityDkimAttributesCommand,
      GetIdentityMailFromDomainAttributesCommand,
      GetIdentityNotificationAttributesCommand,
      GetIdentityPoliciesCommand,
      GetIdentityVerificationAttributesCommand,
      GetSendQuotaCommand,
      GetSendStatisticsCommand,
      GetTemplateCommand,
      ListConfigurationSetsCommand,
      ListCustomVerificationEmailTemplatesCommand,
      ListIdentitiesCommand,
      ListIdentityPoliciesCommand,
      ListReceiptFiltersCommand,
      ListReceiptRuleSetsCommand,
      ListTemplatesCommand,
      ListVerifiedEmailAddressesCommand,
      PutConfigurationSetDeliveryOptionsCommand,
      PutIdentityPolicyCommand,
      ReorderReceiptRuleSetCommand,
      SendBounceCommand,
      SendBulkTemplatedEmailCommand,
      SendCustomVerificationEmailCommand,
      SendEmailCommand,
      SendRawEmailCommand,
      SendTemplatedEmailCommand,
      SetActiveReceiptRuleSetCommand,
      SetIdentityDkimEnabledCommand,
      SetIdentityFeedbackForwardingEnabledCommand,
      SetIdentityHeadersInNotificationsEnabledCommand,
      SetIdentityMailFromDomainCommand,
      SetIdentityNotificationTopicCommand,
      SetReceiptRulePositionCommand,
      TestRenderTemplateCommand,
      UpdateAccountSendingEnabledCommand,
      UpdateConfigurationSetEventDestinationCommand,
      UpdateConfigurationSetReputationMetricsEnabledCommand,
      UpdateConfigurationSetSendingEnabledCommand,
      UpdateConfigurationSetTrackingOptionsCommand,
      UpdateCustomVerificationEmailTemplateCommand,
      UpdateReceiptRuleCommand,
      UpdateTemplateCommand,
      VerifyDomainDkimCommand,
      VerifyDomainIdentityCommand,
      VerifyEmailAddressCommand,
      VerifyEmailIdentityCommand
    };
    paginators = {
      paginateListCustomVerificationEmailTemplates,
      paginateListIdentities
    };
    waiters = {
      waitUntilIdentityExists
    };
    SES = class extends SESClient {
      static {
        __name(this, "SES");
      }
      static {
        __name2(this, "SES");
      }
    };
    createAggregatedClient(commands, SES, { paginators, waiters });
  }
});
var init_commands = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/commands/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_CloneReceiptRuleSetCommand();
    init_CreateConfigurationSetCommand();
    init_CreateConfigurationSetEventDestinationCommand();
    init_CreateConfigurationSetTrackingOptionsCommand();
    init_CreateCustomVerificationEmailTemplateCommand();
    init_CreateReceiptFilterCommand();
    init_CreateReceiptRuleCommand();
    init_CreateReceiptRuleSetCommand();
    init_CreateTemplateCommand();
    init_DeleteConfigurationSetCommand();
    init_DeleteConfigurationSetEventDestinationCommand();
    init_DeleteConfigurationSetTrackingOptionsCommand();
    init_DeleteCustomVerificationEmailTemplateCommand();
    init_DeleteIdentityCommand();
    init_DeleteIdentityPolicyCommand();
    init_DeleteReceiptFilterCommand();
    init_DeleteReceiptRuleCommand();
    init_DeleteReceiptRuleSetCommand();
    init_DeleteTemplateCommand();
    init_DeleteVerifiedEmailAddressCommand();
    init_DescribeActiveReceiptRuleSetCommand();
    init_DescribeConfigurationSetCommand();
    init_DescribeReceiptRuleCommand();
    init_DescribeReceiptRuleSetCommand();
    init_GetAccountSendingEnabledCommand();
    init_GetCustomVerificationEmailTemplateCommand();
    init_GetIdentityDkimAttributesCommand();
    init_GetIdentityMailFromDomainAttributesCommand();
    init_GetIdentityNotificationAttributesCommand();
    init_GetIdentityPoliciesCommand();
    init_GetIdentityVerificationAttributesCommand();
    init_GetSendQuotaCommand();
    init_GetSendStatisticsCommand();
    init_GetTemplateCommand();
    init_ListConfigurationSetsCommand();
    init_ListCustomVerificationEmailTemplatesCommand();
    init_ListIdentitiesCommand();
    init_ListIdentityPoliciesCommand();
    init_ListReceiptFiltersCommand();
    init_ListReceiptRuleSetsCommand();
    init_ListTemplatesCommand();
    init_ListVerifiedEmailAddressesCommand();
    init_PutConfigurationSetDeliveryOptionsCommand();
    init_PutIdentityPolicyCommand();
    init_ReorderReceiptRuleSetCommand();
    init_SendBounceCommand();
    init_SendBulkTemplatedEmailCommand();
    init_SendCustomVerificationEmailCommand();
    init_SendEmailCommand();
    init_SendRawEmailCommand();
    init_SendTemplatedEmailCommand();
    init_SetActiveReceiptRuleSetCommand();
    init_SetIdentityDkimEnabledCommand();
    init_SetIdentityFeedbackForwardingEnabledCommand();
    init_SetIdentityHeadersInNotificationsEnabledCommand();
    init_SetIdentityMailFromDomainCommand();
    init_SetIdentityNotificationTopicCommand();
    init_SetReceiptRulePositionCommand();
    init_TestRenderTemplateCommand();
    init_UpdateAccountSendingEnabledCommand();
    init_UpdateConfigurationSetEventDestinationCommand();
    init_UpdateConfigurationSetReputationMetricsEnabledCommand();
    init_UpdateConfigurationSetSendingEnabledCommand();
    init_UpdateConfigurationSetTrackingOptionsCommand();
    init_UpdateCustomVerificationEmailTemplateCommand();
    init_UpdateReceiptRuleCommand();
    init_UpdateTemplateCommand();
    init_VerifyDomainDkimCommand();
    init_VerifyDomainIdentityCommand();
    init_VerifyEmailAddressCommand();
    init_VerifyEmailIdentityCommand();
  }
});
var init_Interfaces = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/pagination/Interfaces.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_pagination2 = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/pagination/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_Interfaces();
    init_ListCustomVerificationEmailTemplatesPaginator();
    init_ListIdentitiesPaginator();
  }
});
var init_waiters = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/waiters/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_waitForIdentityExists();
  }
});
var init_enums = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/models/enums.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_models_0 = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/models/models_0.js"() {
    init_functionsRoutes_0_9440137819328775();
  }
});
var init_dist_es8 = __esm({
  "../node_modules/@aws-sdk/client-ses/dist-es/index.js"() {
    init_functionsRoutes_0_9440137819328775();
    init_SESClient();
    init_SES();
    init_commands();
    init_schemas_0();
    init_pagination2();
    init_waiters();
    init_enums();
    init_errors();
    init_models_0();
  }
});
var onRequestPost;
var init_waitlist = __esm({
  "api/waitlist.ts"() {
    init_functionsRoutes_0_9440137819328775();
    init_dist_es8();
    onRequestPost = /* @__PURE__ */ __name2(async (context) => {
      try {
        const request = context.request;
        const body = await request.json();
        if (!body.name || !body.email) {
          return new Response(JSON.stringify({ error: "Name and email are required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
        const { name, email } = body;
        const region = context.env.SES_AWS_REGION;
        const accessKeyId = context.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = context.env.AWS_SECRET_ACCESS_KEY;
        const fromEmail = context.env.SES_FROM_EMAIL;
        if (!region || !accessKeyId || !secretAccessKey || !fromEmail) {
          console.error("Missing SES environment variables");
          return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
        }
        const sesClient = new SESClient({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey
          }
        });
        const notifyCommand = new SendEmailCommand({
          Source: fromEmail,
          Destination: {
            ToAddresses: ["hello@xapproach.com"],
            CcAddresses: ["rizwanrko77@gmail.com"]
          },
          Message: {
            Subject: { Data: `New Waitlist Signup: ${name}` },
            Body: {
              Text: { Data: `You have a new waitlist signup!

Name: ${name}
Email: ${email}` }
            }
          }
        });
        const confirmCommand = new SendEmailCommand({
          Source: fromEmail,
          ReplyToAddresses: ["hello@xapproach.com"],
          Destination: {
            ToAddresses: [email]
          },
          Message: {
            Subject: { Data: "Welcome to the Xapproach Waitlist!" },
            Body: {
              Text: { Data: `Hi ${name},

Thanks for joining the Xapproach waitlist. I'm Rizwan, building Xapproach as AI-as-a-Service, where you can train, brand, and monetize your own AI. Works for schools, clinics, consultants, startups, and a lot more use cases beyond that.

Early access is going out in batches. I'll personally make sure you get in as soon as possible.

This email went out automatically, but I read every reply myself. Write back if you want, I'll see it.

Rizwan
Team, Xapproach` },
              Html: { Data: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <p>Hi ${name},</p>
              <p>Thanks for joining the Xapproach waitlist. I'm Rizwan, building Xapproach as AI-as-a-Service, where you can train, brand, and monetize your own AI. Works for schools, clinics, consultants, startups, and a lot more use cases beyond that.</p>
              <p>Early access is going out in batches. I'll personally make sure you get in as soon as possible.</p>
              <p>This email went out automatically, but I read every reply myself. Write back if you want, I'll see it.</p>
              <br/>
              <p>Rizwan<br/>Team, Xapproach</p>
            </div>
          ` }
            }
          }
        });
        await Promise.all([
          sesClient.send(notifyCommand),
          sesClient.send(confirmCommand)
        ]);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        if (error && error.$metadata && error.$metadata.httpStatusCode === 200) {
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }
        console.error("SES Email Error:", error);
        return new Response(JSON.stringify({ error: "Failed to send email. Please try again later." }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }, "onRequestPost");
  }
});
var routes;
var init_functionsRoutes_0_9440137819328775 = __esm({
  "../.wrangler/tmp/pages-dlEzgq/functionsRoutes-0.9440137819328775.mjs"() {
    init_waitlist();
    routes = [
      {
        routePath: "/api/waitlist",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      }
    ];
  }
});
init_functionsRoutes_0_9440137819328775();
init_functionsRoutes_0_9440137819328775();
init_functionsRoutes_0_9440137819328775();
init_functionsRoutes_0_9440137819328775();
function lexer(str) {
  var tokens = [];
  var i2 = 0;
  while (i2 < str.length) {
    var char = str[i2];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i2++, value: str[i2++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i2, value: str[i2++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j2 = i2 + 1;
      while (j2 < str.length) {
        var code = str.charCodeAt(j2);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j2++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i2));
      tokens.push({ type: "NAME", index: i2, value: name });
      i2 = j2;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j2 = i2 + 1;
      if (str[j2] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j2));
      }
      while (j2 < str.length) {
        if (str[j2] === "\\") {
          pattern += str[j2++] + str[j2++];
          continue;
        }
        if (str[j2] === ")") {
          count--;
          if (count === 0) {
            j2++;
            break;
          }
        } else if (str[j2] === "(") {
          count++;
          if (str[j2 + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j2));
          }
        }
        pattern += str[j2++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i2));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i2));
      tokens.push({ type: "PATTERN", index: i2, value: pattern });
      i2 = j2;
      continue;
    }
    tokens.push({ type: "CHAR", index: i2, value: str[i2++] });
  }
  tokens.push({ type: "END", index: i2, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i2 = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i2 < tokens.length && tokens[i2].type === type)
      return tokens[i2++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i2], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i2 < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i3) {
      if (m[i3] === void 0)
        return "continue";
      var key = keys[i3 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i3].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i3], key);
      }
    }, "_loop_1");
    for (var i2 = 1; i2 < m.length; i2++) {
      _loop_1(i2);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c2 = options.end, end = _c2 === void 0 ? true : _c2, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e2 = options.delimiter, delimiter = _e2 === void 0 ? "/#?" : _e2, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_9440137819328775();
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_9440137819328775();
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_9440137819328775();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError2(e2.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError2(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-vL4yaX/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-vL4yaX/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.9520639092819183.js.map
