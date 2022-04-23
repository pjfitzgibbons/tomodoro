
import 'package:my_flutter_app/src/menu/menu_builder_base.dart';
import 'package:system_tray/system_tray.dart';
import 'menu_events.dart';

class SystrayMenuFactory implements MenuBuilderBase {
  SystrayMenuFactory(): super();

  @override
  MenuItem showMainWindow() {
    return MenuItem(label: 'Show', onClicked: () => showAppEvent.broadcast());
  }

  @override
  MenuItem hideMainWindow() {
    return MenuItem(label: 'Hide', onClicked: () => hideAppEvent.broadcast());
  }
}


