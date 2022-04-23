import 'dart:async';
import 'dart:developer';
import 'dart:math' show Random;
import 'dart:io';
import 'package:english_words/english_words.dart';
import 'package:system_tray/system_tray.dart';

import '../app/desktop_app_events.dart' show appWindow;

import '../menu/systray_menu_factory.dart';

final sysTrayMenu = SystrayMenuFactory();

// _appWindow is a wrapper around macOS SDK calls to manipulate the main
// window of the desktop application.

final SystemTray _systemTray = SystemTray();

Timer? _timer;
bool _toogleTrayIcon = true;

Future<void> initSystemTray() async {
  String path = Platform.isWindows
      ? 'assets/Tomatotorrent.ico'
      : 'assets/Tomatotorrent-256.png';

  List<String> iconList = ['darts_icon', 'gift_icon'];

  final List<MenuItemBase> menu = [
    sysTrayMenu.showMainWindow(),
    sysTrayMenu.hideMainWindow(),
    MenuItem(
      label: 'Start flash tray icon',
      onClicked: () {
        log("Start flash tray icon", name: 'menu.system_tray.click');

        _timer ??= Timer.periodic(
          const Duration(milliseconds: 500),
              (timer) {
            _toogleTrayIcon = !_toogleTrayIcon;
            _systemTray.setImage(_toogleTrayIcon ? "" : path);
          },
        );
      },
    ),
    MenuItem(
      label: 'Stop flash tray icon',
      onClicked: () {
        log("Stop flash tray icon", name: 'menu.system_tray.click');

        _timer?.cancel();
        _timer = null;

        _systemTray.setImage(path);
      },
    ),
    MenuSeparator(),
    SubMenu(
      label: "Test API",
      children: [
        SubMenu(
          label: "setSystemTrayInfo",
          children: [
            MenuItem(
              label: 'setTitle',
              onClicked: () {
                final String text = WordPair.random().asPascalCase;
                log("click 'setTitle' : $text", name: 'menu.system_tray.click');
                _systemTray.setTitle(text);
              },
            ),
            MenuItem(
              label: 'setImage',
              onClicked: () {
                String iconName = iconList[Random().nextInt(iconList.length)];
                String path = Platform.isWindows
                    ? 'assets/$iconName.ico'
                    : 'assets/$iconName.png';

                log("click 'setImage' : $path", name: 'menu.system_tray.click');
                _systemTray.setImage(path);
              },
            ),
            MenuItem(
              label: 'setToolTip',
              onClicked: () {
                final String text = WordPair.random().asPascalCase;
                log("click 'setToolTip' : $text", name: 'menu.system_tray.click');
                _systemTray.setToolTip(text);
              },
            ),
            MenuItem(
              label: 'getTitle [macOS]',
              onClicked: () async {
                String title = await _systemTray.getTitle();
                log("click 'getTitle' : $title", name: 'menu.system_tray.click');
              },
            ),
          ],
        ),
        MenuItem(label: 'disabled Item', enabled: false),
      ],
    ),
    MenuSeparator(),
    MenuItem(
      label: 'Exit',
      onClicked: appWindow.close,
    ),
  ];

  // We first init the systray menu and then add the menu entries
  await _systemTray.initSystemTray(
    title: "system tray",
    iconPath: path,
    toolTip: "How to use system tray with Flutter",
  );

  await _systemTray.setContextMenu(menu);

  // handle system tray event
  _systemTray.registerSystemTrayEventHandler((eventName) {
    log("eventName: $eventName", name: 'menu.system_tray.click');
    if (eventName == "leftMouseDown") {
    } else if (eventName == "leftMouseUp") {
      appWindow.show();
    } else if (eventName == "rightMouseDown") {
    } else if (eventName == "rightMouseUp") {
      _systemTray.popUpContextMenu();
    }
  });
}
