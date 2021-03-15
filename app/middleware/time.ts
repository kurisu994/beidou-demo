/**
 * 不需要
 * @param {Object} viewCtx - view context
 * @param {String} viewCtx.filepath - rendering file path
 * @param {Class} viewCtx.Component - sub class of React.Component
 * @param {Object} viewCtx.props - rendering props
 * @param {String} viewCtx.html - rendering html string
 * @param {Object} viewCtx.config - app.config, access to all config
 * @param {Object} viewCtx.options - app.config.react
 * @param {Function} next - middleware next function
 */
export default (_: any) => {
  return async function (ctx, next) {
    const startTime = Date.now();
    await next(); // Execute other middlewares
    ctx.logger.info(`Rendering time: ${Date.now() - startTime}`);
  };
};
