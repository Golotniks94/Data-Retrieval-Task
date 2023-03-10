## Описание тестового задания

Нужно реализовать следующие функции:

1. Получение данных

2. Отображение данных (таблица, график)

3. Манипуляция данными - агрегация и фильтрация

4. Работа с разметкой и стилями - с помощью готовых библиотек CSS или библиотек

виджетов или авторским дизайном сделать эстетичный облик приложения

Получение данных

Приложение должно загружать статистические данные из открытого API по данному URL

https://opendata.ecdc.europa.eu/covid19/casedistribution/json/

Отображение данных

Приложение должно иметь базовый интерфейс

🤓

Колонки “количество случаев/смертей” должны показывать данные за выбранный период. Количество “Всего” должно игнорировать фильтр по датам и отображать данные за все время

## Функционал

1. Фильтр по датам

a. Можно выбрать период отображения данных используя datepicker (всплывающее

меню с календарем, где можно выбрать дату).

b. По умолчанию выбран весь период (минимальная и максимальная дата из

статистики).

c. Данные в таблице и графике должны обновляться автоматически сразу после

выбора иного периода.

2. Данные должны отображаться в одном из двух режимов, указанном ## пользователем,

переключая с помощью вкладок (tabs) Таблица и График.

a. По желанию переключение режима отображения можно и с помощью

выпадающего списка (dropdown list).

3. В режиме таблицы должна отображаться таблица с 7 колонками данных как указано на

схеме.

a. Данные в таблице должны быть отсортированы (по умолчанию в алфавитном

порядке по названиям стран).

b. Можно добавить возможность сортировать данные по индивидуальным столбцам

c. Можно добавить разделение по страницам до 20 строк данных в таблице на

каждой странице.

4. Над таблицей расположены 2 фильтра для - поиск по стране и по значению

определенного поля.

a. По умолчанию поля фильтров пустые.

b. Фильтрация по значениям поля должна осуществляться выбором названия поля из

выпадающего списка и указанием значений в полях ОТ и ДО.

c. Данные в таблице должны обновляться сразу при смене значений фильтра.

5. Также над таблицей должна быть расположена кнопка для сброса фильтров таблицы, при нажатии которой оба фильтра сбрасываются на значения по умолчанию.

6. Если при фильтрации не нашлось подходящих данных, то в таблице вместо строк отображать сообщение “Ничего не найдено”

7. При переключении режима отображения на График вместо таблицы и ее фильтров отображается график с двумя кривыми (см. легенду графика). Ось X отображает выбранный период, ось Y отображает количество случаем.
