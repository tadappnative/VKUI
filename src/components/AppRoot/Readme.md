Обязательный компонент-обёртка над приложением. В нём инкапсулирована логика [режимов подкючения](#/Modes).

## Режимы скролла

Навигационные компоненты VKUI — `Root, View, Panel, Epic` — запоминают скролл экрана и восстанавливают его при возвращении. embedded-приложения поддерживают два режима скролла:
- `global` (по умолчанию) — VKUI-приложение скроллится вместе со страницей.
- `contain` — VKUI-приложние живет в отдельной зоне и скроллится независимо внутри `AppRoot` (например, в модалке).
Режимы переключают через `<AppRoot scroll="...">`.
