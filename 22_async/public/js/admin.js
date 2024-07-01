const deleteProduct = btn => {
  const prodId = btn.parentNode.query('[name=productId]').value;
  const csrf = btn.parentNode.query('[name=_csrf]').value;
};
