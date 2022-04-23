
import 'dart:developer' show log;
import 'package:system_tray/system_tray.dart' show AppWindow;

import '../menu/menu_events.dart';

final AppWindow appWindow = AppWindow();

Future<void> initAppEvents() async {
  showAppEvent.subscribe((args) {
    log("showAppEvent broadcast to _appWindow.show",
        name: 'menu.systray.showApp');
    appWindow.show();
  });
  hideAppEvent.subscribe((args) {
    log("hideAppEvent broadcast to _appWindow.hide",
        name: 'menu.systray.hideApp');
    appWindow.hide();
  });
}
