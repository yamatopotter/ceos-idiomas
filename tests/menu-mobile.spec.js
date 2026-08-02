const { test, expect } = require('@playwright/test');

// Valida o alinhamento vertical do menu mobile (nav-links) ao abrir.
test('menu mobile fica centralizado verticalmente', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

  // Abre o menu
  await page.locator('#navToggle').click();
  const nav = page.locator('#navLinks');
  await expect(nav).toHaveClass(/open/);
  await page.waitForTimeout(500); // aguarda a transição de slide

  // Screenshot para inspeção visual
  await page.screenshot({ path: 'tests/screenshots/menu-mobile.png' });

  // Mede a caixa do overlay e o grupo de itens visíveis (exclui o botão fechar, que é absoluto)
  const navBox = await nav.boundingBox();

  const items = page.locator('#navLinks > li:not(.nav-close-item)');
  const count = await items.count();
  const boxes = [];
  for (let i = 0; i < count; i++) {
    boxes.push(await items.nth(i).boundingBox());
  }

  const groupTop = Math.min(...boxes.map((b) => b.y));
  const groupBottom = Math.max(...boxes.map((b) => b.y + b.height));
  const groupCenter = (groupTop + groupBottom) / 2;
  const navCenter = navBox.y + navBox.height / 2;

  const spaceAbove = groupTop - navBox.y;
  const spaceBelow = navBox.y + navBox.height - groupBottom;

  console.log('viewport: 390x844');
  console.log('navBox:', JSON.stringify(navBox));
  console.log('itens:', count);
  console.log('grupo topo/base/centro:', groupTop.toFixed(1), groupBottom.toFixed(1), groupCenter.toFixed(1));
  console.log('overlay centro:', navCenter.toFixed(1));
  console.log('espaco acima:', spaceAbove.toFixed(1), '| espaco abaixo:', spaceBelow.toFixed(1));
  console.log('desvio do centro:', Math.abs(groupCenter - navCenter).toFixed(1), 'px');

  // Centralizado: o centro do grupo deve estar próximo do centro do overlay (tolerância 40px)
  expect(Math.abs(groupCenter - navCenter)).toBeLessThan(40);
  // E o espaço acima/abaixo deve ser aproximadamente simétrico
  expect(Math.abs(spaceAbove - spaceBelow)).toBeLessThan(60);
});
