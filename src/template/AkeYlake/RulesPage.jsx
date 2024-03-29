// import './css/rules.css';
import rules from './css/rules.module.css';
/*
    Note/Example/Exceptions
    {
        "type": "Note",
        "content": "В нике/клан-теге реклама считается тогда, когда там присутствует домен в любом виде."
    }
    
    1.12. Запрещена реклама в любом виде.
    Примечание: В нике/клан-теге реклама считается тогда, когда там присутствует домен в любом виде.
    Например: "telegram.org" - реклама. "Telegram" - нет.
    Исключение: Ники содержащих рекламу ютуба, вк, твича, других игровых проектов запрещены.
    Исключение: Аватарки с рекламой разрешены.
    Исключения: Разрешена реклама сервисов, которые находятся в google таблице по ссылке
    https://docs.google.com/spreadsheets/d/1GJ3UcAap8ZhaIhcKVPUF8O4JVh2KOW_6vJze_SebDW0/edit?usp=sharing
    Наказание: Предупреждение, Бан до 1 года


    <RulesPoint Number="1.1" title="Запрещена реклама в любом виде." NoteList={/>
    [
        {
            "type": "Note",
            "content": "В нике/клан-теге реклама считается тогда, когда там присутствует домен в любом виде."
        },
        {
            "type": "Example",
            "content": "'telegram.org' - реклама. 'Telegram' - нет."
        },
        {
            "type": "Exceptions",
            "content": "Ники содержащих рекламу ютуба, вк, твича, других игровых проектов запрещены."
        },
        {
            "type": "Exceptions",
            "content": "Аватарки с рекламой разрешены."
        },
        {
            "type": "Exceptions",
            "content": "Разрешена реклама сервисов, которые находятся в google таблице по ссылке \n https://docs.google.com/spreadsheets/d/1GJ3UcAap8ZhaIhcKVPUF8O4JVh2KOW_6vJze_SebDW0/edit?usp=sharing"
        }
    ]} PunishmentsList= {[
        {
            "type": "Other",
            "content": "Предупреждение, Бан до 1 года"
        }
    ]} />
*/

/*
    Mute/Other // Тип наказания. В одиночных наказаниях не учитывается.
    {
        "type": "Other",
        "content": "Бан на 1 год."
    }
*/

function Note({ content }) {
    return (
        <span className={rules.rules_point}><span className={rules.note}>Примечание: </span> {content}<br /><br /></span>
    );
}

function Exceptions({ content }) {
    return (
        <span className={rules.rules_point}><span className={rules.exception}>Исключение:</span> {content}<br /><br /></span>
    );
}

function Example({ content }) {
    return (
        <span className={rules.rules_point}><span className={rules.note}>Например:</span> {content}<br /><br /></span>
    );
}

function PunishmentTitle() {
    return (
        <span className={rules.rules_point}><span className={rules.punishment}>Наказание: </span><br /></span>
    );
}

function PunishmentOther({ content }) {
    return (
        <span className={rules.rules_point}><span className={rules.punishment_other}>Если нарушение вне чата(Префикс, Имя клана, Имя оружия, ник, аватарка и т.д. и т.п.): </span>{content}<br /><br /></span>
    );
}

function PunishmentChat({ content }) {
    return (
        <span className={rules.rules_point}><span className={rules.punishment_chat}>Если нарушение в чате: </span>{content}<br /><br /></span>
    );
}

function PunishmentSingle({ content }) {
    return (
        <span className={rules.rules_point}><span className={rules.punishment}>Наказание: </span>{content}</span>
    );
}

function RulesPoint({ Number, title, NoteList, PunishmentsList }) {
    let NoteListElements = [];
    console.log("test0");
    if (NoteList != null && NoteList.length > 0) {
        console.log("test1");
        NoteList.forEach(element => {
            console.log("test2");
            switch (element.type) {
                case 'Note':
                    {
                        console.log("test3");
                        NoteListElements.push(<Note content={element.content} />)
                        break;
                    }
                case 'Example':
                    {
                        NoteListElements.push(<Example content={element.content} />)
                        break;
                    }
                case 'Exceptions':
                    {
                        NoteListElements.push(<Exceptions content={element.content} />)
                        break;
                    }
            }
        });
    }
    let PunishmentsListElements = [];
    if (PunishmentsList != null && PunishmentsList.length > 0) {
        if (PunishmentsList.length == 1) {
            PunishmentsListElements.push(<PunishmentSingle content={PunishmentsList[0].content} />)
        }
        else {
            PunishmentsListElements.push(<PunishmentTitle />)

            PunishmentsList.forEach(element => {
                if (element.type == 'Other') {
                    PunishmentsListElements.push(<PunishmentOther content={element.content} />)
                }
                else {
                    PunishmentsListElements.push(<PunishmentChat content={element.content} />)
                }
            });
        }
    }
    return (
        <p className={rules.p_rules}>
            <span className={rules.rules_point}><span className={rules.main_rules}><span className={rules.number}>{Number}</span> {title}</span><br /><br /></span>
            {NoteListElements}
            {PunishmentsListElements}
        </p>
    );
}

function RulesPage() {
    return (
        <div className={rules.second}>
            <div className={rules.container}>
                <div className={rules.rules}>
                    <h1 className={rules.rulesTitle}>Правила проекта</h1>
                    <h2 className={rules.rulesTitle}>Основное</h2>
                    < >
                        <RulesPoint Number="1.1" title="Публичные оскорбления запрещены в любой форме." NoteList={null} PunishmentsList={[
                            {
                                "type": "Mute",
                                "content": "Мут до 2 часов, мут до 4 часов, мут до 1 дня. При получении более 5 наказаний за этот пункт правил мут на 7 дней."
                            },
                            {
                                "type": "Other",
                                "content": "бан до 2 часов, бан до 4 часов, бан до 1 дня. \n При получении более 5 наказаний за этот пункт правил бан на 7 дней."
                            }
                        ]} />


                        <RulesPoint Number="1.2" title="Запрещено использование: программ, моделей, скриптов, и иные средства, дающие преимущество над другими игроками." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан на 1 год."
                                }
                            ]} />

                        <RulesPoint Number="1.2.1" title="Запрещено хранение: программ, моделей, скриптов, и иные средства, дающие преимущество над другими игроками." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан до 1 дня, бан до 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="1.3" title="Запрещены любые попытки вызвать игровые баги." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан до 1 дня, бан до 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="1.4" title="Запрещен заход за текстуры." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан до 1 дня, бан до 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="1.4.1" title="Запрещено залазить на невидимые текстуры." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан до 12 часов, бан до 3 дней."
                                }
                            ]} />
                        <RulesPoint Number="1.5" title="Запрещено отказываться от проверки, если вас подозревают в читерстве." NoteList={[
                            {
                                "type": "Note",
                                "content": "Если вы отказываетесь что-то открывать что вас просит администрация - это считается за отказ от проверки"
                            },
                            {
                                "type": "Exceptions", 
                                "content": "Можно отказаться от показа: содержимое личных сообщений с людьми, сайт знакомств, сайты для взрослых, менеджер паролей, электронный дневник."
                            },
                            {
                                "type": "Note",
                                "content": "Если вы отказываетесь скачивать и открывать программы, который вам кидает администратор - это считается за отказ от проверки."
                            },
                            {
                                "type": "Exceptions", 
                                "content": "Можно отказаться от скачивания программ, если антивирус(virustotal) считает их за вирус."
                            },
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан на 1 год."
                                }
                            ]} />
                        <RulesPoint Number="1.6" title="Запрещены любые проявления искусственной прокачки." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан на 1 день, бан до 7 дней"
                                }
                            ]} />
                        <RulesPoint Number="1.7" title="Запрещены любые проявления политических и религиозных взглядов." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Если нарушение в чате: мут до 12 часов, мут на 1 день. При получении более 4 наказаний за этот пункт правил мут на 7 дней."
                                },
                                {
                                    "type": "Other", 
                                    "content": "Если нарушение вне чата(Префикс, Имя клана, Имя оружия, ник, аватарка и т.д. и т.п.): бан на 4 часа, бан до 1 дня. При получении более 4 наказаний за этот пункт правил бан на 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="1.8" title="Запрещено мониторить, то есть передавать в мёртвом состоянии местоположение живых игроков или какую-то важную информацию." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут до 1 часа / за мониторинг вне игры - бан на 3 часа, бан до 6 часов, бан до 1 дня, бан до 3-х дней."
                                }
                            ]} />
                        <RulesPoint Number="1.9" title="Запрещено любыми способами мешать игровому процессу. (Затягивание раунда, не убивать врага когда видишь его, препятствовать игре и т.д. и т.п.)" NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Килл - Кик, Бан до 2-х часов, бан до 4-х часов. Бан до 1 дня."
                                }
                            ]} />
                        <RulesPoint Number="1.10" title="Запрещено игнорирование и не выполнение требований или просьб старшей администрации." NoteList={[
                            {
                                "type": "Note",
                                "content": "Старшей администрацией считаются администраторы с ролью Curator и выше."
                            },
                            {
                                "type": "Note",
                                "content": "Это правило расчитанно на контроль людей во время тестов. Использование данного правила в личных целях - нарушение правила 3.5"
                            },
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан до 1 дня."
                                }
                            ]} />
                        <RulesPoint Number="1.11" title="Запрещен обход бана и мута любым способом." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан на 1 год. "
                                }
                            ]} />
                        <RulesPoint Number="1.12" title="Запрещена реклама в любом виде." NoteList={[
                            {
                                "type": "Note",
                                "content": "В нике/клан-теге реклама считается тогда, когда там присутствует домен в любом виде."
                            },
                            {
                                "type": "Example",
                                "content": "'telegram.org' - реклама. 'Telegram' - нет."
                            },
                            {
                                "type": "Exceptions",
                                "content": "Ники содержащих рекламу ютуба, вк, твича, других игровых проектов запрещены."
                            },
                            {
                                "type": "Exceptions",
                                "content": "Аватарки с рекламой разрешены."
                            },
                            {
                                "type": "Exceptions",
                                // "content": "Разрешена реклама сервисов, которые находятся в google таблице по ссылке \n https://docs.google.com/spreadsheets/d/1GJ3UcAap8ZhaIhcKVPUF8O4JVh2KOW_6vJze_SebDW0/edit?usp=sharing"
                                "content": "Разрешена реклама сервисов, которые находятся в google таблице по ссылке"
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other",
                                    "content": "Предупреждение, Бан до 1 года"
                                }
                            ]} />
                        <RulesPoint Number="1.13" title="Запрещен плагиат текущего никнейма Администраторов сервера." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Предупреждение, бан до 2-х часов, бан на 1 день."
                                }
                            ]} />






                        <h2 className={rules.rulesTitle}>Общение</h2>
                        <RulesPoint Number="2.1" title="Запрещено использование микрофона игрокам не достигшим 14 лет." NoteList={[
                            {
                                "type": "Exceptions", 
                                "content": "Адекватное молодое поколение."
                            },
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут голосового чата не более 2-х часов, При получении более 7 наказаний за этот пункт правил мут до 3-х дней."
                                }
                            ]} />
                        <RulesPoint Number="2.2" title="Запрещены флуд, спам, сообщения капсом, воспроизведение музыки/звуков." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут до 2-х часов."
                                }
                            ]} />
                        <RulesPoint Number="2.3" title="Запрещается использовать не качественные микрофоны с помехами, с мешающим задним фоном." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут голосового чата до 2-х часов."
                                }
                            ]} />
                        <RulesPoint Number="2.4" title="Программы для изменения голоса запрещены." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут голосового чата до 2-х часов, мут до 12 часов, мут до 1 дня."
                                }
                            ]} />
                        <RulesPoint Number="2.5" title="Запрещено обсуждать действия администрации. Для претензий любого вида имеется Discord-канал с жалобами." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "мут до 2-х часов, мут до 4-х часов, мут до 12 часов, мут до 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="2.6" title="Запрещено оскорблять сервера проекта или же сам проект." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан на 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="2.7" title="Запрещен обман и ввод в заблуждение игроков или администрации." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "Бан на 1 день"
                                }
                            ]} />
                        <RulesPoint Number="2.8" title="Запрещено оскорбление родственников." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут до 2-х дней, при повторных нарушениях бан на 7 дней."
                                },
                                {
                                    "type": "Other", 
                                    "content": "Если нарушение вне чата(Префикс, Имя клана, Имя оружия, ник, аватарка и т.д. и т.п.): Бан до 2-х дней, при повторных нарушениях бан на 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="2.9" title="Запрещены все формы расизма, а так же слепые намеки." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "Мут до 1 дня, при повторных нарушениях бан на 7 дней."
                                },
                                {
                                    "type": "Other", 
                                    "content": "Если нарушение вне чата(Префикс, Имя клана, Имя оружия, ник, аватарка и т.д. и т.п.): Бан до 1 дней, при повторных нарушениях бан на 7 дней."
                                }
                            ]} />
                        <RulesPoint Number="2.10" title="Запрещена чрезмерная токсичность." NoteList={[
                            {
                                "type": "Example", //пример
                                "content": "Агрессивные высказывания - бот, лоу скилл. \n Высказывания принижающие человека - Ez, easy, домой."
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Mute", 
                                    "content": "мут до 2-х часов, мут до 4-х часов, мут до 12 часов, мут до 1 дня. При получении более 5 наказаний за этот пункт правил мут на 7 дней."
                                }
                            ]} />

                        <h2>Правила для администрации</h2>
                        <RulesPoint Number="3.1" title="Администраторам запрещено публично оскорблять, провоцировать, унижать игроков проекта." NoteList={[
                            {
                                "type": "Note",
                                "content": "Правило распространяется на способы публичного общения с игроками вне сервера (беседа VK, беседа Telegram, сервер Discord(Голосовые каналы в том числе), Сайт и т.д.)"
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "2 балла предупреждение."
                                }
                            ]} />
                        <RulesPoint Number="3.2" title="Администрации запрещено публично развязывать/поддерживать/участвовать в конфликтах между администрацией и игроками." NoteList={[
                            {
                                "type": "Note",
                                "content": "Правило распространяется на способы публичного общения вне сервера (беседа VK, беседа Telegram, сервер Discord(Голосовые каналы в том числе), Сайт и т.д.)"
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждение."
                                }
                            ]} />
                        <RulesPoint Number="3.3" title="Администратор обязан соблюдать профессиональную этику; уважительный, официальный тон общения; использовать строго официальную лексику в общении с не привилегированными участниками проекта." NoteList={[
                            {
                                "type": "Note",
                                "content": "Правило распространяется только на случаи официального текстового взаимодействия администрации и обычных участников проекта (рассмотрение и обсуждение жалоб/апелляций, общение в тикетах)"
                            },
                            {
                                "type": "Exceptions", 
                                "content": "СЕО"
                            },
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждение."
                                }
                            ]} />
                        <RulesPoint Number="3.4" title="Администратор обязан следить за порядком на сервере, то есть за соблюдением правил." NoteList={[
                            {
                                "type": "Note",
                                "content": "Если администратора просят проверить игрока на стороннее ПО, то администратору запрещено выходить с сервера/бездействовать."
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.5" title="Запрещено злоупотреблять своими правами." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.6" title="Администраторам запрещено банить, мутить, кикать, слеить, перемещать и.т.д. без причины. (Причина может быть одна - нарушение правил)" NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения или снятие. В зависимости от ситуации."
                                }
                            ]} />
                        <RulesPoint Number="3.7" title="Запрещено менять карты без голосования." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.8" title="Администратор обязан объяснить причину бана, кика, мута, слея, перевода и т.п., если его спрашивают об этом." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.9" title="Администратор обязан корректно вводить/выбирать причину бана." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.10" title="Администратор может устроить голосование для смены карты, если с момента прошлой смены карты прошло более 10 минут." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.11" title="Запрещена любая провокация людей на нарушения правил." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "2 баллa предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.12" title="Администратору запрещено выдавать наказание не по правилам." NoteList={[
                            {
                                "type": "Example", //пример
                                "content": "Неправильное время, бан вместо мута и т.д."
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.13" title="Администраторам запрещено снимать бан/мут." NoteList={[
                            {
                                "type": "Exceptions", 
                                "content": "Бан/мут был выдан некорректно или по ошибке."
                            }
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.14" title="Запрещено материться в командах msay, hsay, csay и прочих." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "2 баллa предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.15" title="Команду msay можно прописывать только после окончания раунда!" NoteList={[
                            {
                                "type": "Exceptions", 
                                "content": " Информация о рестарте сервера(Если рестарт сервера запланирован через несколько минут)."
                            },
                        ]}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.16" title="Администратор имеет право кикать спектаторов, если сервер полон." NoteList={null}
                            PunishmentsList={null} />
                        <RulesPoint Number="3.17" title="Запрещено пытаться положить сервер или создавать лаги при помощи панели администратора(Флуд перезапуском списка админов, кик бота GOTV и т.п.)" NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "В зависимости от ситуации Снятие прав/Бан навсегда."
                                }
                            ]} />
                        <RulesPoint Number="3.18" title="Запрещено уходить в hide если вы остались последний в команде! А так же запрещено использовать любые баги" NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "2 баллa предупреждения."
                                }
                            ]} />
                        <RulesPoint Number="3.19" title="Запрещено возрождаться за наблюдателей." NoteList={null}
                            PunishmentsList={[
                                {
                                    "type": "Other", 
                                    "content": "1 балл предупреждения."
                                }
                            ]} />


                        <h2>Примечания к правиалам</h2>
                        <RulesPoint Number="4.1" title="Данные правила могут быть изменены в любой момент, без вашего ведома!" NoteList={null}
                            PunishmentsList={null} />
                        <RulesPoint Number="4.2" title="Игрок будет наказан, даже если не ознакомлен с правилами!" NoteList={null}
                            PunishmentsList={null} />
                        <RulesPoint Number="4.3" title="Деньги при снятие прав не возвращаются." NoteList={null}
                            PunishmentsList={null} />
                        <RulesPoint Number="4.4" title="После получения 3 баллов предупреждения у администратора снимаются привилегии." NoteList={null}
                            PunishmentsList={null} />
                        <RulesPoint Number="4.5" title="Оставить жалобу на администратора или игрока, можно только в течении 24 часов после его предполагаемого нарушения." NoteList={[
                            {
                                "type": "Exceptions", 
                                "content": "Подать жалобу на администратора если вас забанили за нарушение правила 1.2 и 1.5 можно только в течении 20 минут после бана."
                            }
                        ]}
                            PunishmentsList={null} />
                        <RulesPoint Number="4.6" title="В случае если Администратор нарушает правила из категории 'Основное' и 'Общение', наказанием для него является 1 балл предупреждения." NoteList={[
                            {
                                "type": "Note",
                                "content": "По усмотрению старшей администрации может быть вынесено решение о проведении разъяснительной беседы без выдачи баллов предупреждения."
                            }
                        ]}
                            PunishmentsList={null} />
                        <RulesPoint Number="4.7" title="В наказаниях связанных с мутом, подразумевается мут двух чатов(Голосового и Текстового), если в правилах не написано иного." NoteList={null}
                            PunishmentsList={null} />
                    </>
                </div>
            </div>
        </div>
    );
}

export default RulesPage;