import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ListIcon from '@material-ui/icons/List';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import TocIcon from '@material-ui/icons/Toc';
import orcamentoActions from 'actions/orcamentoActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { ApplicationState } from 'store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(5),
        }
    }),
);

interface OrcamentoTabs {
    name: string;
    value: number;
    icon: any;
    to: string;
}

export const DadosGerais: OrcamentoTabs = {
    name: "Dados Gerais",
    value: 0,
    icon: InfoTwoToneIcon,
    to: '/orcamento/editar/:id/dados'
}

export const ItensAplicacao: OrcamentoTabs = {
    name: "Itens da Aplicação",
    value: 1,
    icon: ListIcon,
    to: '/orcamento/editar/:id/itens-aplicacao'
}

export const ItensOrcamento: OrcamentoTabs = {
    name: "Itens do Orçamento",
    value: 2,
    icon: TocIcon,
    to: '/orcamento/editar/:id/itens-orcamento'
}

export const Valores: OrcamentoTabs = {
    name: "Valores",
    value: 3,
    icon: AttachMoneyIcon,
    to: '/orcamento/editar/:id/valores'
}

export const Usuarios: OrcamentoTabs = {
    name: "Usuários",
    value: 4,
    icon: PeopleAltTwoToneIcon,
    to: '/orcamento/editar/:id/usuarios'
}

const OrcamentoTabsList: OrcamentoTabs[] = [DadosGerais, ItensAplicacao, ItensOrcamento, Valores, Usuarios];

type Props = any & {
    tab?: OrcamentoTabs
}

const OrcamentoTabsComponent = (props: Props) => {
    const classes = useStyles();

    const id = props.match.params.id;

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const dispatch = useDispatch();

    const { editarTabPrev } = orcamentoStore;

    const [value, setValue] = useState(editarTabPrev);

    const setTab = (prevTab: number, actTab: number) => {
        dispatch(orcamentoActions.setTab(prevTab, actTab));
        setValue(actTab);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(props.tab.value, newValue);
    };

    useEffect(() => {
        if (props.tab && editarTabPrev !== props.tab.value)
            setTab(editarTabPrev, props.tab.value);
    }, []);

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="primary"
                aria-label="icon label tabs example"
            >
                {OrcamentoTabsList.map((el, index) => (
                    <Tab icon={<el.icon />} label={el.name} key={index} component={Link} to={el.to.replace(":id", id)} />
                ))}
            </Tabs>
        </Paper>
    );
}

export default withRouter(OrcamentoTabsComponent);